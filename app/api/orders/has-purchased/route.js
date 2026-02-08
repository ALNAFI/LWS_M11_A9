import { NextResponse } from 'next/server'
import connectMongo from '@/app/dbConnect/connectMongo'
import Order from '@/app/models/Order'
import { getAccessTokenFromRequest, verifyAccessToken } from '@/app/lib/tokens'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/lib/auth'

async function getCurrentUser(request) {
  const accessToken = getAccessTokenFromRequest(request)
  if (accessToken) {
    const payload = await verifyAccessToken(accessToken)
    if (payload?.sub) return { id: payload.sub }
  }
  const session = await getServerSession(request, authOptions)
  if (session?.user) return { id: session.user.id }
  return null
}

export async function GET(request) {
  try {
    const currentUser = await getCurrentUser(request)
    if (!currentUser) {
      return NextResponse.json({ hasPurchased: false })
    }

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')
    if (!productId) {
      return NextResponse.json({ error: 'productId required.' }, { status: 400 })
    }

    await connectMongo()
    const mongoose = await import('mongoose')
    const productObjId = mongoose.default.Types.ObjectId.isValid(productId)
      ? new mongoose.default.Types.ObjectId(productId)
      : null
    if (!productObjId) {
      return NextResponse.json({ hasPurchased: false })
    }

    const order = await Order.findOne({
      user: currentUser.id,
      'items.productId': productObjId,
    }).lean()

    return NextResponse.json({ hasPurchased: !!order })
  } catch (err) {
    console.error('Has purchased check error:', err)
    return NextResponse.json({ error: 'Failed to check.' }, { status: 500 })
  }
}
