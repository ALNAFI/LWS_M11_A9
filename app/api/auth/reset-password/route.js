import { NextResponse } from 'next/server'
import connectMongo from '@/app/dbConnect/connectMongo'
import User from '@/app/models/User'
import PasswordResetToken, { hashToken } from '@/app/models/PasswordResetToken'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    const body = await request.json()
    const { token, password, passwordConfirm } = body

    if (!token?.trim()) {
      return NextResponse.json(
        { error: 'Reset token is required.' },
        { status: 400 }
      )
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters.' },
        { status: 400 }
      )
    }

    if (password !== passwordConfirm) {
      return NextResponse.json(
        { error: 'Passwords do not match.' },
        { status: 400 }
      )
    }

    await connectMongo()

    const tokenHash = hashToken(token.trim())
    const resetRecord = await PasswordResetToken.findOne({
      tokenHash,
      expiresAt: { $gt: new Date() },
    })

    if (!resetRecord) {
      return NextResponse.json(
        { error: 'Invalid or expired reset link. Please request a new password reset.' },
        { status: 400 }
      )
    }

    const user = await User.findById(resetRecord.user).select('+password')
    if (!user) {
      await PasswordResetToken.deleteOne({ _id: resetRecord._id })
      return NextResponse.json(
        { error: 'User not found. Please request a new password reset.' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    user.password = hashedPassword
    await user.save()

    await PasswordResetToken.deleteMany({ user: user._id })

    return NextResponse.json({
      success: true,
      message: 'Your password has been reset. You can now sign in.',
    })
  } catch (err) {
    console.error('Reset password error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
