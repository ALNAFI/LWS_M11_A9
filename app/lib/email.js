import nodemailer from 'nodemailer'

function getTransport() {
  const user = process.env.SMTP_USER || process.env.GMAIL_USER
  const pass = process.env.SMTP_PASS || process.env.GMAIL_PASS
  const host = process.env.SMTP_HOST || 'smtp.gmail.com'
  const port = Number(process.env.SMTP_PORT) || 587

  if (!user || !pass) {
    throw new Error('Missing SMTP credentials. Set SMTP_USER/SMTP_PASS or GMAIL_USER/GMAIL_PASS in .env')
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
}

export async function sendPasswordResetEmail({ to, resetLink }) {
  const baseUrl = process.env.NEXTAUTH_URL || process.env.APP_URL || 'http://localhost:3000'
  const from = process.env.SMTP_FROM || process.env.GMAIL_USER || 'noreply@gadgetsbd.com'
  const appName = 'Gadgets BD'

  const html = `
    <p>You requested a password reset for your ${appName} account.</p>
    <p>Click the link below to set a new password (valid for 1 hour):</p>
    <p><a href="${resetLink}" style="color:#C45500;text-decoration:underline;">Reset password</a></p>
    <p>If you didn't request this, you can ignore this email.</p>
    <p>— ${appName}</p>
  `

  const transport = getTransport()
  await transport.sendMail({
    from: `"${appName}" <${from}>`,
    to,
    subject: `Reset your ${appName} password`,
    html,
    text: `Reset your password: ${resetLink}\n\nIf you didn't request this, ignore this email.`,
  })
}

export async function sendInvoiceEmail({ to, orderId, orderNumber, address, items, itemsSubtotal, deliveryFee, serviceFee, orderTotal }) {
  const from = process.env.SMTP_FROM || process.env.GMAIL_USER || 'noreply@gadgetsbd.com'
  const appName = 'Gadgets BD'

  const rows = (items || []).map(
    (i) =>
      `<tr><td>${escapeHtml(i.productName || 'Item')}</td><td>${i.quantity}</td><td>৳${Number(i.pricePerUnit || 0).toLocaleString('en-BD')}</td><td>৳${Number((i.pricePerUnit || 0) * (i.quantity || 1)).toLocaleString('en-BD')}</td></tr>`
  ).join('')
  const addr = address || {}
  const addressBlock = [addr.name, addr.street, addr.city, addr.country, addr.phone].filter(Boolean).join('<br/>') || '—'

  const html = `
    <div style="font-family:sans-serif;max-width:600px;">
      <h2 style="color:#232f3e;">${appName} – Order Confirmation</h2>
      <p>Thank you for your order. Your invoice is below.</p>
      <p><strong>Order Number:</strong> ${escapeHtml(orderNumber)}</p>
      <p><strong>Shipping address:</strong><br/>${addressBlock}</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;" border="1" cellpadding="8">
        <thead><tr><th>Item</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <p><strong>Subtotal:</strong> ৳${Number(itemsSubtotal || 0).toLocaleString('en-BD')}</p>
      <p><strong>Delivery:</strong> ${deliveryFee === 0 ? 'FREE' : '৳' + Number(deliveryFee).toLocaleString('en-BD')}</p>
      <p><strong>Service fee:</strong> ৳${Number(serviceFee || 0).toLocaleString('en-BD')}</p>
      <p><strong>Total:</strong> ৳${Number(orderTotal || 0).toLocaleString('en-BD')}</p>
      <p style="margin-top:24px;color:#666;">— ${appName}</p>
    </div>
  `
  const transport = getTransport()
  await transport.sendMail({
    from: `"${appName}" <${from}>`,
    to,
    subject: `Your ${appName} order ${orderNumber}`,
    html,
    text: `Order ${orderNumber}. Total: ৳${Number(orderTotal || 0).toLocaleString('en-BD')}. View details in your account.`,
  })
}

function escapeHtml(s) {
  if (typeof s !== 'string') return ''
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
