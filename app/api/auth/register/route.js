import { NextResponse } from 'next/server'
import connectMongo from '@/app/dbConnect/connectMongo'
import User from '@/app/models/User'
import bcrypt from 'bcryptjs'
import { sendWelcomeEmail } from '@/app/lib/email'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, password, passwordConfirm, mobile, userType, shopName } = body

    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json(
        { error: 'Name, email and password are required.' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
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

    const type = userType === 'shopOwner' ? 'shopOwner' : 'customer'
    const finalShopName = type === 'shopOwner' && shopName ? String(shopName).trim() : ''

    await connectMongo()

    const existing = await User.findOne({ email: email.trim().toLowerCase() })
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      mobile: mobile ? String(mobile).trim() : '',
      userType: type,
      shopName: finalShopName,
      provider: 'credentials',
    })

    try {
      await sendWelcomeEmail({ to: user.email, name: user.name })
    } catch (emailErr) {
      console.error('Welcome email error:', emailErr)
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        userType: user.userType,
      },
    })
  } catch (err) {
    console.error('Register error:', err)
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    )
  }
}
