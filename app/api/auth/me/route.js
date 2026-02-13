import { NextResponse } from 'next/server'
import connectMongo from '@/app/dbConnect/connectMongo'

export const dynamic = 'force-dynamic'
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
        const user = await User.findById(payload.sub).select(
          'name email userType mobile shopName shopDescription shopLocation shopAddress shopSpecialization shopBannerImage yearEstablished employees brandPartnerships website'
        )
        if (user) {
          const userJson = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            userType: user.userType,
            mobile: user.mobile || '',
          }
          if (user.userType === 'shopOwner') {
            userJson.shopName = user.shopName || ''
            userJson.shopDescription = user.shopDescription || ''
            userJson.shopLocation = user.shopLocation || ''
            userJson.shopAddress = user.shopAddress || ''
            userJson.shopSpecialization = user.shopSpecialization || ''
            userJson.shopBannerImage = user.shopBannerImage || ''
            userJson.yearEstablished = user.yearEstablished ?? ''
            userJson.employees = user.employees ?? ''
            userJson.brandPartnerships = user.brandPartnerships || ''
            userJson.website = user.website || ''
          }
          return NextResponse.json({ user: userJson })
        }
      }
    }

    const session = await getServerSession(authOptions)
    if (session?.user) {
      await connectMongo()
      const user = await User.findById(session.user.id).select(
        'name email userType mobile shopName shopDescription shopLocation shopAddress shopSpecialization shopBannerImage yearEstablished employees brandPartnerships website'
      )
      if (user) {
        const userJson = {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          userType: user.userType || 'customer',
          mobile: user.mobile || '',
        }
        if (user.userType === 'shopOwner') {
          userJson.shopName = user.shopName || ''
          userJson.shopDescription = user.shopDescription || ''
          userJson.shopLocation = user.shopLocation || ''
          userJson.shopAddress = user.shopAddress || ''
          userJson.shopSpecialization = user.shopSpecialization || ''
          userJson.shopBannerImage = user.shopBannerImage || ''
          userJson.yearEstablished = user.yearEstablished ?? ''
          userJson.employees = user.employees ?? ''
          userJson.brandPartnerships = user.brandPartnerships || ''
          userJson.website = user.website || ''
        }
        return NextResponse.json({ user: userJson })
      }
      return NextResponse.json({
        user: {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          userType: session.user.userType || 'customer',
        },
      })
    }

    return NextResponse.json({ user: null })
  } catch (err) {
    console.error('Auth me error:', err)
    return NextResponse.json({ user: null })
  }
}
