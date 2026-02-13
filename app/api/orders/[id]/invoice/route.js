import { NextResponse } from 'next/server'
import connectMongo from '@/app/dbConnect/connectMongo'
import Order from '@/app/models/Order'
import User from '@/app/models/User'
import { getAccessTokenFromRequest, verifyAccessToken } from '@/app/lib/tokens'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/lib/auth'

async function getCurrentUser(request) {
  const accessToken = getAccessTokenFromRequest(request)
  if (accessToken) {
    const payload = await verifyAccessToken(accessToken)
    if (payload?.sub) return { id: payload.sub }
  }
  const session = await getServerSession(authOptions)
  if (session?.user) return { id: session.user.id }
  return null
}

function formatPrice(n) {
  const num = Number(n) || 0
  // ASCII-only digits & separators to avoid PDF font/encoding issues
  const formatted = num.toLocaleString('en-US')
  return `BDT ${formatted}`
}

function formatDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export async function GET(request, { params }) {
  try {
    const currentUser = await getCurrentUser(request)
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    const id = params.id
    await connectMongo()
    const order = await Order.findOne({ _id: id, user: currentUser.id }).lean()
    if (!order) {
      return NextResponse.json({ error: 'Order not found.' }, { status: 404 })
    }

    const user = await User.findById(currentUser.id).select('name email').lean()
    const customerName = user?.name || 'Customer'
    const customerEmail = user?.email || ''

    const orderNumber = `#GB-${order._id.toString().slice(-8).toUpperCase()}`
    const items = order.items || []
    const addr = order.shippingAddress || {}

    let PDFDocument
    try {
      PDFDocument = (await import('pdfkit')).default
    } catch (e) {
      console.error('pdfkit not installed:', e)
      return NextResponse.json(
        { error: 'PDF generation unavailable. Install pdfkit.' },
        { status: 503 }
      )
    }

    const buffers = []
    const doc = new PDFDocument({ size: 'A4', margin: 50 })

    doc.on('data', buffers.push.bind(buffers))

    await new Promise((resolve, reject) => {
      doc.on('end', resolve)
      doc.on('error', reject)

      // Company information
      doc.fontSize(20).font('Helvetica-Bold').text('Gadgets BD', 50, 50)
      doc.fontSize(9).font('Helvetica')
      doc.text('Premium Tech Marketplace', 50, 72)
      doc.text('Dhaka, Bangladesh', 50, 84)
      doc.text('support@gadgetsbd.com', 50, 96)
      doc.moveDown(2)

      // Order information
      doc.fontSize(14).font('Helvetica-Bold').text('INVOICE', 50, 130)
      doc.fontSize(10).font('Helvetica')
      doc.text(`Order Number: ${orderNumber}`, 50, 155)
      doc.text(`Date: ${formatDate(order.createdAt)}`, 50, 168)
      doc.moveDown(2)

      // Customer information
      doc.fontSize(11).font('Helvetica-Bold').text('Bill To / Ship To', 50, 200)
      doc.fontSize(10).font('Helvetica')
      doc.text(addr.name || customerName, 50, 218)
      if (addr.street) doc.text(addr.street, 50, 231)
      if (addr.city) doc.text(addr.city, 50, 244)
      if (addr.country) doc.text(addr.country, 50, 257)
      if (addr.phone) doc.text(`Phone: ${addr.phone}`, 50, 270)
      if (customerEmail) doc.text(`Email: ${customerEmail}`, 50, 283)
      doc.moveDown(2)

      // Itemized table
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
      doc.text(formatPrice(order.itemsSubtotal || 0), 450, y)
      y += 18
      doc.text('Delivery:', 350, y)
      doc.text(order.deliveryFee === 0 ? 'FREE' : formatPrice(order.deliveryFee), 450, y)
      y += 18
      doc.text('Service Fee:', 350, y)
      doc.text(formatPrice(order.serviceFee || 0), 450, y)
      y += 22
      doc.font('Helvetica-Bold').fontSize(11)
      doc.text('Total:', 350, y)
      doc.text(formatPrice(order.orderTotal || 0), 450, y)

      doc.fontSize(9).font('Helvetica').text(
        'Thank you for your order.',
        50,
        doc.page.height - 80
      )
      doc.end()
    })

    const pdfBuffer = Buffer.concat(buffers)
    const filename = `invoice-${orderNumber.replace('#', '')}.pdf`

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': String(pdfBuffer.length),
      },
    })
  } catch (err) {
    console.error('Invoice PDF error:', err)
    return NextResponse.json({ error: 'Failed to generate invoice.' }, { status: 500 })
  }
}
