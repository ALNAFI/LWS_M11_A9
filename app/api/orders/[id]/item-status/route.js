import { NextResponse } from 'next/server'
import connectMongo from '@/app/dbConnect/connectMongo'
import Order from '@/app/models/Order'
import Product from '@/app/models/Product'
import { getAccessTokenFromRequest, verifyAccessToken } from '@/app/lib/tokens'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/lib/auth'

const ALLOWED = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled']

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

export async function PATCH(request, { params }) {
  try {
    const currentUser = await getCurrentUser(request)
    if (!currentUser || currentUser.userType !== 'shopOwner') {
      return NextResponse.json({ error: 'Forbidden. Shop owners only.' }, { status: 403 })
    }

    const id = params.id
    const body = await request.json()
    const { productId, status } = body
    if (!productId || !ALLOWED.includes(status)) {
      return NextResponse.json(
        { error: 'productId and status (Pending|Confirmed|Shipped|Delivered|Cancelled) required.' },
        { status: 400 }
      )
    }

    await connectMongo()
    const product = await Product.findOne({ _id: productId, seller: currentUser.id }).lean()
    if (!product) {
      return NextResponse.json({ error: 'Product not found or you are not the seller.' }, { status: 404 })
    }

    const order = await Order.findOne({ _id: id })
    if (!order) {
      return NextResponse.json({ error: 'Order not found.' }, { status: 404 })
    }

    const item = order.items.find(
      (i) => i.productId && i.productId.toString() === productId
    )
    if (!item) {
      return NextResponse.json({ error: 'Order item not found.' }, { status: 404 })
    }

    item.status = status
    await order.save()

    return NextResponse.json({ success: true, status })
  } catch (err) {
    console.error('Update item status error:', err)
    return NextResponse.json({ error: 'Failed to update status.' }, { status: 500 })
  }
}
