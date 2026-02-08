import { NextResponse } from 'next/server'
import connectMongo from '@/app/dbConnect/connectMongo'
import User from '@/app/models/User'
import PasswordResetToken, { hashToken } from '@/app/models/PasswordResetToken'
import { sendPasswordResetEmail } from '@/app/lib/email'
import crypto from 'crypto'

const TOKEN_EXPIRY_HOURS = 1
const BASE_URL = process.env.NEXTAUTH_URL || process.env.APP_URL || 'http://localhost:3000'

export async function POST(request) {
  try {
    const body = await request.json()
    const email = body.email?.trim()?.toLowerCase()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required.' },
        { status: 400 }
      )
    }

    await connectMongo()

    const user = await User.findOne({ email })
    const canReset = user && user.provider === 'credentials'

    if (canReset) {
      const rawToken = crypto.randomBytes(32).toString('hex')
      const tokenHash = hashToken(rawToken)
      const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000)

      await PasswordResetToken.deleteMany({ user: user._id })
      await PasswordResetToken.create({
        user: user._id,
        tokenHash,
        expiresAt,
      })

      const resetLink = `${BASE_URL}/auth/reset-password?token=${rawToken}`

      await sendPasswordResetEmail({
        to: user.email,
        resetLink,
      })
    }
  } catch (err) {
    if (err.message?.includes('SMTP')) {
      console.error('Email config error:', err.message)
      return NextResponse.json(
        { error: 'Email service is not configured. Please try again later.' },
        { status: 503 }
      )
    }
    console.error('Forgot password error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }

  return NextResponse.json({
    success: true,
    message: "If an account exists with this email, we've sent a password reset link.",
  })
}
