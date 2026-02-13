import { NextResponse } from 'next/server'
import connectMongo from '@/app/dbConnect/connectMongo'
import Order from '@/app/models/Order'
import User from '@/app/models/User'
import { getAccessTokenFromRequest, verifyAccessToken } from '@/app/lib/tokens'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/lib/auth'
import { generateInvoicePdfBuffer } from '@/app/lib/invoicePdf'

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

    const user = await User.findById(currentUser.id).select('name email').lean()
    const orderNumber = `#GB-${order._id.toString().slice(-8).toUpperCase()}`

    let pdfBuffer
    try {
      pdfBuffer = await generateInvoicePdfBuffer({
        orderNumber,
        date: order.createdAt,
        customerName: user?.name || order.shippingAddress?.name || 'Customer',
        customerEmail: user?.email || '',
        address: order.shippingAddress || {},
        items: order.items || [],
        itemsSubtotal: order.itemsSubtotal || 0,
        deliveryFee: order.deliveryFee ?? 0,
        serviceFee: order.serviceFee || 0,
        orderTotal: order.orderTotal || 0,
      })
    } catch (e) {
      console.error('pdfkit not installed or invoice error:', e)
      return NextResponse.json(
        { error: 'PDF generation unavailable. Install pdfkit.' },
        { status: 503 }
      )
    }

    const filename = `invoice-${orderNumber.replace('#', '')}.pdf`
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': String(pdfBuffer.length),
      },
    })
  } catch (err) {
    console.error('Invoice PDF error:', err)
    return NextResponse.json({ error: 'Failed to generate invoice.' }, { status: 500 })
  }
}
