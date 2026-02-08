import { NextResponse } from 'next/server'
import connectMongo from '@/app/dbConnect/connectMongo'
import RefreshToken from '@/app/models/RefreshToken'
import {
  getRefreshTokenFromRequest,
  clearTokenCookies,
} from '@/app/lib/tokens'

export async function POST(request) {
  try {
    const refreshTokenValue = getRefreshTokenFromRequest(request)
    if (refreshTokenValue) {
      await connectMongo()
      await RefreshToken.deleteOne({ token: refreshTokenValue })
    }

    const response = NextResponse.json({ success: true })
    const cookiesToClear = clearTokenCookies()
    for (const c of cookiesToClear) {
      response.cookies.set(c.name, c.value, {
        path: '/',
        maxAge: 0,
      })
    }
    return response
  } catch (err) {
    console.error('Logout error:', err)
    const response = NextResponse.json({ success: true })
    const cookiesToClear = clearTokenCookies()
    for (const c of cookiesToClear) {
      response.cookies.set(c.name, c.value, { path: '/', maxAge: 0 })
    }
    return response
  }
}
