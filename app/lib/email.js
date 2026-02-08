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
