/**
 * Generates invoice PDF buffer from order-like data.
 * Used by GET /api/orders/[id]/invoice and sendInvoiceEmail.
 */
function formatPrice(n) {
  const num = Number(n) || 0
  const formatted = num.toLocaleString('en-US')
  return `BDT ${formatted}`
}

function formatDate(d) {
  if (!d) return '—'
  const date = d instanceof Date ? d : new Date(d)
  return date.toLocaleDateString('en-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * @param {{
 *   orderNumber: string
 *   date?: Date | string
 *   customerName?: string
 *   customerEmail?: string
 *   address?: { name?: string; street?: string; city?: string; country?: string; phone?: string }
 *   items: Array<{ productName?: string; quantity?: number; pricePerUnit?: number }>
 *   itemsSubtotal: number
 *   deliveryFee: number
 *   serviceFee: number
 *   orderTotal: number
 * }} options
 * @returns {Promise<Buffer>}
 */
export async function generateInvoicePdfBuffer(options) {
  const {
    orderNumber,
    date = new Date(),
    customerName = 'Customer',
    customerEmail = '',
    address = {},
    items = [],
    itemsSubtotal = 0,
    deliveryFee = 0,
    serviceFee = 0,
    orderTotal = 0,
  } = options

  let PDFDocument
  try {
    PDFDocument = (await import('pdfkit')).default
  } catch (e) {
    throw new Error('pdfkit not available')
  }

  const buffers = []
  const doc = new PDFDocument({ size: 'A4', margin: 50 })
  doc.on('data', buffers.push.bind(buffers))

  await new Promise((resolve, reject) => {
    doc.on('end', resolve)
    doc.on('error', reject)

    const addr = address
    doc.fontSize(20).font('Helvetica-Bold').text('Gadget Hub', 50, 50)
    doc.fontSize(9).font('Helvetica')
    doc.text('Premium Tech Marketplace', 50, 72)
    doc.text('Dhaka, Bangladesh', 50, 84)
    doc.text('support@GadgetHub.com', 50, 96)
    doc.moveDown(2)

    doc.fontSize(14).font('Helvetica-Bold').text('INVOICE', 50, 130)
    doc.fontSize(10).font('Helvetica')
    doc.text(`Order Number: ${orderNumber}`, 50, 155)
    doc.text(`Date: ${formatDate(date)}`, 50, 168)
    doc.moveDown(2)

    doc.fontSize(11).font('Helvetica-Bold').text('Bill To / Ship To', 50, 200)
    doc.fontSize(10).font('Helvetica')
    doc.text(addr.name || customerName, 50, 218)
    if (addr.street) doc.text(addr.street, 50, 231)
    if (addr.city) doc.text(addr.city, 50, 244)
    if (addr.country) doc.text(addr.country, 50, 257)
    if (addr.phone) doc.text(`Phone: ${addr.phone}`, 50, 270)
    if (customerEmail) doc.text(`Email: ${customerEmail}`, 50, 283)
    doc.moveDown(2)

    const tableTop = 320
    doc.fontSize(10).font('Helvetica-Bold')
    doc.text('Item', 50, tableTop)
    doc.text('Qty', 320, tableTop)
    doc.text('Unit Price', 380, tableTop)
    doc.text('Total', 450, tableTop)
    doc.moveTo(50, tableTop + 12).lineTo(530, tableTop + 12).stroke()
    doc.font('Helvetica')

    let y = tableTop + 25
    items.forEach((i) => {
      const name = (i.productName || 'Item').slice(0, 45)
      const qty = i.quantity || 1
      const unit = i.pricePerUnit || 0
      const lineTotal = unit * qty
      doc.fontSize(9).text(name, 50, y, { width: 260 })
      doc.text(String(qty), 320, y)
      doc.text(formatPrice(unit), 380, y)
      doc.text(formatPrice(lineTotal), 450, y)
      y += 22
    })

    y += 15
    doc.moveTo(50, y).lineTo(530, y).stroke()
    y += 20

    doc.font('Helvetica')
    doc.text('Subtotal:', 350, y)
    doc.text(formatPrice(itemsSubtotal), 450, y)
    y += 18
    doc.text('Delivery:', 350, y)
    doc.text(deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee), 450, y)
    y += 18
    doc.text('Service Fee:', 350, y)
    doc.text(formatPrice(serviceFee), 450, y)
    y += 22
    doc.font('Helvetica-Bold').fontSize(11)
    doc.text('Total:', 350, y)
    doc.text(formatPrice(orderTotal), 450, y)

    doc.fontSize(9).font('Helvetica').text(
      'Thank you for your order.',
      50,
      doc.page.height - 80
    )
    doc.end()
  })

  return Buffer.concat(buffers)
}
