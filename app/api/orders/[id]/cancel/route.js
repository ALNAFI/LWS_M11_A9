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
  const session = await getServerSession(authOptions)
  if (session?.user) return { id: session.user.id }
  return null
}

function canCancel(items) {
  if (!items || items.length === 0) return false
  return items.every((i) => i.status === 'Pending' || i.status === 'Confirmed')
}

export async function PATCH(request, { params }) {
  try {
    const currentUser = await getCurrentUser(request)
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    const id = params.id
    await connectMongo()
    const order = await Order.findOne({ _id: id, user: currentUser.id })
    if (!order) {
      return NextResponse.json({ error: 'Order not found.' }, { status: 404 })
    }

    if (!canCancel(order.items)) {
      return NextResponse.json(
        { error: 'Order can only be cancelled when all items are Pending or Confirmed.' },
        { status: 400 }
      )
    }

    order.items.forEach((i) => { i.status = 'Cancelled' })
    await order.save()

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Cancel order error:', err)
    return NextResponse.json({ error: 'Failed to cancel order.' }, { status: 500 })
  }
}
