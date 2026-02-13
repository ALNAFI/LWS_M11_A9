import { NextResponse } from 'next/server'
import connectMongo from '@/app/dbConnect/connectMongo'
import Cart from '@/app/models/Cart'

export const dynamic = 'force-dynamic'
import User from '@/app/models/User'
import { getAccessTokenFromRequest, verifyAccessToken } from '@/app/lib/tokens'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/lib/auth'
import mongoose from 'mongoose'

async function getCurrentUser(request) {
  const accessToken = getAccessTokenFromRequest(request)
  if (accessToken) {
    const payload = await verifyAccessToken(accessToken)
    if (payload?.sub) return { id: payload.sub, userType: payload.userType }
  }
  const session = await getServerSession(authOptions)
  if (session?.user) return { id: session.user.id, userType: session.user.userType }
  return null
}

function toApiItem(doc) {
  const id = doc.productId?.toString?.() ?? doc.productId
  const price = Number(doc.pricePerUnit) || 0
  return {
    id,
    title: doc.productName || '',
    image: doc.image || '',
    price,
    priceDisplay: `৳${price.toLocaleString('en-BD')}`,
    seller: doc.seller || '',
    href: `/details?productId=${id}`,
    quantity: Number(doc.quantity) || 1,
    selected: doc.selected !== false,
  }
}

export async function GET(request) {
  try {
    const currentUser = await getCurrentUser(request)
    if (!currentUser) {
      return NextResponse.json({ items: [] })
    }

    await connectMongo()
    const userDoc = await User.findById(currentUser.id).select('userType').lean()
    const userType = userDoc?.userType || 'customer'
    if (userType !== 'customer') {
      return NextResponse.json({ items: [] })
    }

    const cart = await Cart.findOne({ user: currentUser.id }).lean()
    const items = (cart?.items || []).map(toApiItem)
    return NextResponse.json({ items })
  } catch (err) {
    console.error('Cart GET error:', err)
    return NextResponse.json({ error: 'Failed to load cart', items: [] }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const currentUser = await getCurrentUser(request)
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectMongo()
    const userDoc = await User.findById(currentUser.id).select('userType').lean()
    const userType = userDoc?.userType || 'customer'
    if (userType !== 'customer') {
      return NextResponse.json({ error: 'Only customers can update cart' }, { status: 403 })
    }

    const body = await request.json()
    const rawItems = Array.isArray(body?.items) ? body.items : []

    const items = rawItems
      .filter((i) => i && (i.id || i.productId))
      .map((i) => {
        const productId = i.id || i.productId
        const price = typeof i.price === 'number' ? i.price : Number(String(i.price).replace(/[^\d.]/g, '')) || 0
        return {
          productId: mongoose.Types.ObjectId.isValid(productId) ? new mongoose.Types.ObjectId(productId) : null,
          quantity: Math.max(1, Number(i.quantity) || 1),
          selected: i.selected !== false,
          productName: i.title || i.productName || '',
          pricePerUnit: price,
          image: i.image || '',
          seller: i.seller || '',
        }
      })
      .filter((i) => i.productId)

    await Cart.findOneAndUpdate(
      { user: currentUser.id },
      { $set: { items } },
      { upsert: true, new: true }
    )
    return NextResponse.json({ items: items.map(toApiItem) })
  } catch (err) {
    console.error('Cart PUT error:', err)
    return NextResponse.json({ error: 'Failed to save cart' }, { status: 500 })
  }
}
