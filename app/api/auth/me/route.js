import { NextResponse } from 'next/server'
import connectMongo from '@/app/dbConnect/connectMongo'
import User from '@/app/models/User'
import { getAccessTokenFromRequest, verifyAccessToken } from '@/app/lib/tokens'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/lib/auth'

export async function GET(request) {
  try {
    const accessToken = getAccessTokenFromRequest(request)
    if (accessToken) {
      const payload = await verifyAccessToken(accessToken)
      if (payload?.sub) {
        await connectMongo()
        const user = await User.findById(payload.sub).select('name email userType')
        if (user) {
          return NextResponse.json({
            user: {
              id: user._id.toString(),
              name: user.name,
              email: user.email,
              userType: user.userType,
            },
          })
        }
      }
    }

    const session = await getServerSession(request, authOptions)
    if (session?.user) {
      return NextResponse.json({
        user: {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          userType: session.user.userType || 'customer',
        },
      })
    }

    return NextResponse.json({ user: null }, { status: 401 })
  } catch (err) {
    console.error('Auth me error:', err)
    return NextResponse.json({ user: null }, { status: 401 })
  }
}
