import { NextResponse } from 'next/server'
import connectMongo from '@/app/dbConnect/connectMongo'
import Order from '@/app/models/Order'
import Product from '@/app/models/Product'
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

function productToJson(p) {
  return {
    id: p._id.toString(),
    productName: p.productName,
    category: p.category,
    brand: p.brand,
    price: p.price,
    stockQuantity: p.stockQuantity,
    mainImageUrl: p.mainImageUrl || '',
    seller: p.seller?.toString?.(),
  }
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

    const productIds = (order.items || []).map((i) => i.productId).filter(Boolean)
    const products = await Product.find({ _id: { $in: productIds } }).lean()
    const productMap = Object.fromEntries(products.map((p) => [p._id.toString(), p]))

    const items = []
    for (const it of order.items || []) {
      const pid = it.productId?.toString()
      const product = productMap[pid]
      if (!product || (product.stockQuantity || 0) < 1) continue
      const qty = Math.min(it.quantity || 1, product.stockQuantity || 1)
      items.push({
        productId: pid,
        quantity: qty,
        product: productToJson(product),
      })
    }

    return NextResponse.json({ items })
  } catch (err) {
    console.error('Reorder error:', err)
    return NextResponse.json({ error: 'Failed to get reorder data.' }, { status: 500 })
  }
}
