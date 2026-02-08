import { NextResponse } from 'next/server'
import connectMongo from '@/app/dbConnect/connectMongo'
import User from '@/app/models/User'
import { getAccessTokenFromRequest, verifyAccessToken } from '@/app/lib/tokens'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/lib/auth'

async function getCurrentUserId(request) {
  const accessToken = getAccessTokenFromRequest(request)
  if (accessToken) {
    const payload = await verifyAccessToken(accessToken)
    if (payload?.sub) return payload.sub
  }
  const session = await getServerSession(request, authOptions)
  return session?.user?.id ?? null
}

export async function PATCH(request) {
  try {
    const userId = await getCurrentUserId(request)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    const body = await request.json()
    await connectMongo()

    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 })
    }

    const allowed = ['name', 'mobile']
    const shopAllowed = [
      'shopName',
      'shopDescription',
      'shopLocation',
      'shopAddress',
      'shopSpecialization',
      'shopBannerImage',
      'yearEstablished',
      'employees',
      'brandPartnerships',
      'website',
    ]

    for (const key of allowed) {
      if (body[key] !== undefined) {
        if (key === 'name') user.name = String(body.name).trim() || user.name
        if (key === 'mobile') user.mobile = String(body.mobile ?? '').trim()
      }
    }

    if (user.userType === 'shopOwner') {
      for (const key of shopAllowed) {
        if (body[key] === undefined) continue
        if (key === 'yearEstablished' || key === 'employees') {
          const v = body[key]
          user[key] = v === '' || v === null ? null : Number(v)
        } else {
          user[key] = String(body[key] ?? '').trim()
        }
      }
    }

    await user.save()

    const updated = await User.findById(userId).select(
      'name email userType mobile shopName shopDescription shopLocation shopAddress shopSpecialization shopBannerImage yearEstablished employees brandPartnerships website'
    )
    const userJson = {
      id: updated._id.toString(),
      name: updated.name,
      email: updated.email,
      userType: updated.userType,
      mobile: updated.mobile || '',
    }
    if (updated.userType === 'shopOwner') {
      userJson.shopName = updated.shopName || ''
      userJson.shopDescription = updated.shopDescription || ''
      userJson.shopLocation = updated.shopLocation || ''
      userJson.shopAddress = updated.shopAddress || ''
      userJson.shopSpecialization = updated.shopSpecialization || ''
      userJson.shopBannerImage = updated.shopBannerImage || ''
      userJson.yearEstablished = updated.yearEstablished ?? ''
      userJson.employees = updated.employees ?? ''
      userJson.brandPartnerships = updated.brandPartnerships || ''
      userJson.website = updated.website || ''
    }

    return NextResponse.json({ success: true, user: userJson })
  } catch (err) {
    console.error('Profile update error:', err)
    return NextResponse.json(
      { error: 'Failed to update profile.' },
      { status: 500 }
    )
  }
}
