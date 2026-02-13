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

function formatPrice(n) {
  return `৳${Number(n).toLocaleString('en-BD')}`
}

export async function GET(request, { params }) {
  try {
    const currentUser = await getCurrentUser(request)
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    const id = params.id
    await connectMongo()
    const order = await Order.findOne({ _id: id, user: currentUser.id }).lean()
    if (!order) {
      return NextResponse.json({ error: 'Order not found.' }, { status: 404 })
    }

    const orderNumber = `#GB-${order._id.toString().slice(-8).toUpperCase()}`
    const items = (order.items || []).map((i) => ({
      productId: i.productId?.toString(),
      productName: i.productName || 'Item',
      quantity: i.quantity,
      pricePerUnit: i.pricePerUnit,
      priceDisplay: formatPrice(i.pricePerUnit || 0),
      lineTotal: (i.pricePerUnit || 0) * (i.quantity || 1),
      lineTotalDisplay: formatPrice((i.pricePerUnit || 0) * (i.quantity || 1)),
    }))

    return NextResponse.json({
      order: {
        id: order._id.toString(),
        orderNumber,
        createdAt: order.createdAt,
        shippingAddress: order.shippingAddress || {},
        items,
        itemsSubtotal: order.itemsSubtotal,
        itemsSubtotalDisplay: formatPrice(order.itemsSubtotal || 0),
        deliveryFee: order.deliveryFee,
        deliveryFeeDisplay: order.deliveryFee === 0 ? 'FREE' : formatPrice(order.deliveryFee),
        serviceFee: order.serviceFee,
        serviceFeeDisplay: formatPrice(order.serviceFee || 0),
        orderTotal: order.orderTotal,
        orderTotalDisplay: formatPrice(order.orderTotal || 0),
      },
    })
  } catch (err) {
    console.error('Get order error:', err)
    return NextResponse.json({ error: 'Failed to get order.' }, { status: 500 })
  }
}
