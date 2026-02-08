import { NextResponse } from 'next/server'
import connectMongo from '@/app/dbConnect/connectMongo'
import User from '@/app/models/User'
import RefreshToken from '@/app/models/RefreshToken'
import bcrypt from 'bcryptjs'
import {
  signAccessToken,
  setTokenCookies,
  getRefreshTokenMaxAge,
} from '@/app/lib/tokens'
import crypto from 'crypto'

export async function POST(request) {
  try {
    const body = await request.json()
    const email = body.email?.trim()?.toLowerCase()
    const password = body.password

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      )
    }

    await connectMongo()

    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return NextResponse.json(
        { error: 'No account found with this email. Please register first.' },
        { status: 401 }
      )
    }

    if (user.provider !== 'credentials' || !user.password) {
      return NextResponse.json(
        { error: 'This account uses Google sign-in. Please use "Continue with Google" to log in.' },
        { status: 401 }
      )
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return NextResponse.json(
        { error: 'Wrong password. Please try again.' },
        { status: 401 }
      )
    }

    const accessToken = await signAccessToken({
      sub: user._id.toString(),
      email: user.email,
      userType: user.userType,
    })

    const refreshTokenValue = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + getRefreshTokenMaxAge() * 1000)
    await RefreshToken.create({
      user: user._id,
      token: refreshTokenValue,
      expiresAt,
    })

    const userPayload = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      userType: user.userType,
    }

    const response = NextResponse.json({ success: true, user: userPayload })
    const isProd = process.env.NODE_ENV === 'production'
    const cookiesConfig = setTokenCookies(accessToken, refreshTokenValue)
    for (const c of cookiesConfig) {
      response.cookies.set(c.name, c.value, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        path: '/',
        maxAge: c.maxAge,
      })
    }

    return response
  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    )
  }
}
