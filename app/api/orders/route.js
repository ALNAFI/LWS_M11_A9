import { NextResponse } from 'next/server'
import connectMongo from '@/app/dbConnect/connectMongo'
import Order from '@/app/models/Order'
import Product from '@/app/models/Product'
import User from '@/app/models/User'
import { getAccessTokenFromRequest, verifyAccessToken } from '@/app/lib/tokens'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/lib/auth'
import { sendInvoiceEmail } from '@/app/lib/email'

async function getCurrentUser(request) {
  const accessToken = getAccessTokenFromRequest(request)
  if (accessToken) {
    const payload = await verifyAccessToken(accessToken)
    if (payload?.sub) return { id: payload.sub, userType: payload.userType }
  }
  const session = await getServerSession(request, authOptions)
  if (session?.user) return { id: session.user.id, userType: session.user.userType }
  return null
}

const SERVICE_FEE = 500
const DELIVERY_FEE = 0

function formatPrice(n) {
  return `৳${Number(n).toLocaleString('en-BD')}`
}

function formatOrderPlaced(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const STATUS_DISPLAY = {
  Pending: { label: 'Pending', icon: 'Clock', badgeClassName: 'bg-amber-100 text-amber-800' },
  Confirmed: { label: 'Confirmed', icon: 'Check', badgeClassName: 'bg-orange-100 text-orange-800' },
  Shipped: { label: 'Shipped', icon: 'Truck', badgeClassName: 'bg-blue-100 text-blue-700' },
  Delivered: { label: 'Delivered', icon: 'CheckCircle', badgeClassName: 'bg-green-100 text-green-700' },
  Cancelled: { label: 'Cancelled', icon: 'XCircle', badgeClassName: 'bg-red-100 text-red-700' },
}

function getStatusDisplay(status) {
  return STATUS_DISPLAY[status] || STATUS_DISPLAY.Pending
}

function canCancelOrder(items) {
  if (!items || items.length === 0) return false
  return items.every((i) => i.status === 'Pending' || i.status === 'Confirmed')
}

export async function GET(request) {
  try {
    const currentUser = await getCurrentUser(request)
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    await connectMongo()
    const User = (await import('@/app/models/User')).default
    const userDoc = await User.findById(currentUser.id).select('userType').lean()
    const userType = userDoc?.userType || 'customer'

    const { searchParams } = new URL(request.url)
    const view = searchParams.get('view') || 'customer'

    let orders
    if (view === 'shop' && userType === 'shopOwner') {
      const myProducts = await Product.find({ seller: currentUser.id }).select('_id').lean()
      const myProductIds = myProducts.map((p) => p._id)
      if (myProductIds.length === 0) {
        orders = []
      } else {
        orders = await Order.find({ 'items.productId': { $in: myProductIds } })
          .sort({ createdAt: -1 })
          .lean()
      }
    } else {
      orders = await Order.find({ user: currentUser.id })
        .sort({ createdAt: -1 })
        .lean()
    }

    const productIds = [...new Set(orders.flatMap((o) => (o.items || []).map((i) => i.productId)))]
    const products = await Product.find({ _id: { $in: productIds } })
      .select('mainImageUrl seller')
      .lean()
    const productImageMap = Object.fromEntries(
      products.map((p) => [p._id.toString(), p.mainImageUrl || ''])
    )
    const productSellerMap = Object.fromEntries(
      products.map((p) => [p._id.toString(), p.seller?.toString()])
    )

    const list = orders.map((order) => {
      const orderNumber = `#GB-${order._id.toString().slice(-8).toUpperCase()}`
      const addr = order.shippingAddress || {}
      const shipTo = addr.name || 'Customer'
      const items = order.items || []
      const cancellable = canCancelOrder(items)

      const productsForCard = items.map((i) => {
        const productIdStr = i.productId?.toString()
        const status = i.status || 'Pending'
        const display = getStatusDisplay(status)
        const isMyProduct = view === 'shop' && productSellerMap[productIdStr] === currentUser.id
        const actions = []
        actions.push({ label: 'Download Invoice', icon: 'Download', actionType: 'download', orderId: order._id.toString() })
        if (view === 'customer') {
          actions.push({ label: 'Write a Review', icon: null, actionType: 'review', productId: productIdStr })
        }
        return {
          id: productIdStr,
          productId: productIdStr,
          image: productImageMap[productIdStr] || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200',
          title: i.productName || 'Item',
          href: `/details?productId=${productIdStr}`,
          seller: 'Gadgets BD',
          quantity: i.quantity || 1,
          status: { ...display, value: status },
          isShopOwnerProduct: isMyProduct,
          orderId: order._id.toString(),
          actions,
        }
      })

      let cancelAction = null
      if (view === 'customer' && cancellable) {
        cancelAction = { label: 'Cancel Order', icon: 'XCircle', variant: 'danger', actionType: 'cancel', orderId: order._id.toString() }
      }

      const reorderOrderId = view === 'customer' ? order._id.toString() : null

      return {
        id: orderNumber,
        orderId: order._id.toString(),
        orderPlaced: formatOrderPlaced(order.createdAt),
        total: formatPrice(order.orderTotal || 0),
        shipTo,
        viewDetailsHref: `/success?orderId=${order._id.toString()}`,
        products: productsForCard,
        cancelAction,
        reorderOrderId,
        isShopView: view === 'shop',
      }
    })

    return NextResponse.json({ orders: list, userType })
  } catch (err) {
    console.error('List orders error:', err)
    return NextResponse.json({ error: 'Failed to list orders.' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser(request)
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    const body = await request.json()
    const items = Array.isArray(body.items) ? body.items : []
    const shippingAddress = body.shippingAddress && typeof body.shippingAddress === 'object'
      ? {
          name: String(body.shippingAddress.name ?? '').trim(),
          street: String(body.shippingAddress.street ?? '').trim(),
          city: String(body.shippingAddress.city ?? '').trim(),
          country: String(body.shippingAddress.country ?? '').trim(),
          phone: String(body.shippingAddress.phone ?? '').trim(),
        }
      : {}

    if (items.length === 0) {
      return NextResponse.json({ error: 'At least one item is required.' }, { status: 400 })
    }

    const mongoose = await import('mongoose')
    await connectMongo()

    const productIds = items.map((i) => i.productId).filter(Boolean)
    const products = await Product.find({ _id: { $in: productIds } })
    const productMap = Object.fromEntries(products.map((p) => [p._id.toString(), p]))

    const orderItems = []
    for (const it of items) {
      const id = it.productId
      const qty = Math.max(1, Math.floor(Number(it.quantity) || 1))
      if (!mongoose.default.Types.ObjectId.isValid(id)) continue
      const product = productMap[id]
      if (!product) continue
      if (product.stockQuantity < qty) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.productName}. Available: ${product.stockQuantity}.` },
          { status: 400 }
        )
      }
      const pricePerUnit = Number(product.price) || 0
      orderItems.push({
        productId: product._id,
        quantity: qty,
        productName: product.productName || '',
        pricePerUnit,
        status: 'Pending',
      })
    }

    if (orderItems.length === 0) {
      return NextResponse.json({ error: 'No valid items.' }, { status: 400 })
    }

    const itemsSubtotal = orderItems.reduce((s, i) => s + i.pricePerUnit * i.quantity, 0)
    const serviceFee = SERVICE_FEE
    const deliveryFee = DELIVERY_FEE
    const orderTotal = itemsSubtotal + deliveryFee + serviceFee

    const order = await Order.create({
      user: currentUser.id,
      items: orderItems,
      shippingAddress,
      itemsSubtotal,
      deliveryFee,
      serviceFee,
      orderTotal,
    })

    for (const it of orderItems) {
      await Product.findByIdAndUpdate(it.productId, {
        $inc: { stockQuantity: -it.quantity, purchases: it.quantity },
      })
    }

    const orderId = order._id.toString()
    const orderNumber = `#GB-${orderId.slice(-8).toUpperCase()}`

    try {
      const user = await User.findById(currentUser.id).select('email').lean()
      if (user?.email) {
        await sendInvoiceEmail({
          to: user.email,
          orderId,
          orderNumber,
          address: shippingAddress,
          items: orderItems,
          itemsSubtotal,
          deliveryFee,
          serviceFee,
          orderTotal,
        })
      }
    } catch (emailErr) {
      console.error('Invoice email error:', emailErr)
    }

    return NextResponse.json({
      success: true,
      orderId,
      orderNumber,
    })
  } catch (err) {
    console.error('Create order error:', err)
    return NextResponse.json({ error: 'Failed to create order.' }, { status: 500 })
  }
}
