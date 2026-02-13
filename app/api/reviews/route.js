import { NextResponse } from 'next/server'
import connectMongo from '@/app/dbConnect/connectMongo'
import Review from '@/app/models/Review'
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

function reviewToJson(r, user) {
  return {
    id: r._id.toString(),
    productId: r.product?.toString?.() ?? r.product,
    userId: r.user?.toString?.() ?? r.user,
    rating: r.rating,
    title: r.title ?? '',
    content: r.content ?? '',
    createdAt: r.createdAt,
    isOwn: user ? (r.user?.toString?.() === user.id) : false,
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')
    const page = Math.max(1, parseInt(searchParams.get('page'), 10) || 1)
    const limit = Math.min(20, Math.max(1, parseInt(searchParams.get('limit'), 10) || 5))

    if (!productId) {
      return NextResponse.json({ error: 'productId required.' }, { status: 400 })
    }

    await connectMongo()

    const currentUser = await getCurrentUser(request)

    const mongoose = await import('mongoose')
    const productObjId = mongoose.default.Types.ObjectId.isValid(productId)
      ? new mongoose.default.Types.ObjectId(productId)
      : null
    if (!productObjId) {
      return NextResponse.json({ error: 'Invalid productId.' }, { status: 400 })
    }

    const total = await Review.countDocuments({ product: productObjId })

    let currentUserReview = null
    if (currentUser) {
      currentUserReview = await Review.findOne({
        product: productObjId,
        user: currentUser.id,
      }).lean()
    }

    const allOthers = await Review.find({ product: productObjId })
      .sort({ createdAt: -1 })
      .lean()
    const othersFiltered = currentUser
      ? allOthers.filter((r) => r.user?.toString() !== currentUser.id)
      : allOthers

    const firstPageOthersCount = limit - (currentUserReview ? 1 : 0)
    const othersSkip = page === 1 ? 0 : firstPageOthersCount + (page - 2) * limit
    const othersLimit = page === 1 ? firstPageOthersCount : limit
    const othersPaginated = othersFiltered.slice(othersSkip, othersSkip + othersLimit)

    const ordered =
      page === 1 && currentUserReview
        ? [currentUserReview, ...othersPaginated]
        : othersPaginated

    const agg = await Review.aggregate([
      { $match: { product: productObjId } },
      { $group: { _id: null, avg: { $avg: '$rating' }, count: { $sum: 1 } } },
    ])
    const averageRating = agg[0]?.avg ?? 0
    const totalRatings = agg[0]?.count ?? 0

    let hasPurchased = false
    if (currentUser) {
      const orderWithProduct = await Order.findOne({
        user: currentUser.id,
        'items.productId': productObjId,
      }).lean()
      hasPurchased = !!orderWithProduct
    }

    const User = (await import('@/app/models/User')).default
    const userIds = [...new Set(ordered.map((r) => r.user?.toString()).filter(Boolean))]
    const users = await User.find({ _id: { $in: userIds } })
      .select('name')
      .lean()
    const userMap = Object.fromEntries(users.map((u) => [u._id.toString(), u.name || 'User']))

    const reviewsWithNames = ordered.map((r) => ({
      ...reviewToJson(r, currentUser),
      userName: userMap[r.user?.toString()] ?? 'User',
      userInitials: (userMap[r.user?.toString()] || 'U').split(/\s+/).map((n) => n[0]).join('').toUpperCase().slice(0, 2),
    }))

    return NextResponse.json({
      reviews: reviewsWithNames,
      total,
      page,
      limit,
      averageRating: Math.round(averageRating * 10) / 10,
      totalRatings,
      hasPurchased,
    })
  } catch (err) {
    console.error('List reviews error:', err)
    return NextResponse.json({ error: 'Failed to list reviews.' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser(request)
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    const body = await request.json()
    const { productId, rating, title, content } = body
    if (!productId || typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'productId and rating (1-5) are required.' },
        { status: 400 }
      )
    }

    await connectMongo()

    const Order = (await import('@/app/models/Order')).default
    const hasPurchased = await Order.findOne({
      user: currentUser.id,
      'items.productId': productId,
    })
    if (!hasPurchased) {
      return NextResponse.json(
        { error: 'You can only review products you have purchased.' },
        { status: 403 }
      )
    }

    const mongoose = await import('mongoose')
    const productObjId = mongoose.default.Types.ObjectId.isValid(productId)
      ? new mongoose.default.Types.ObjectId(productId)
      : null
    if (!productObjId) {
      return NextResponse.json({ error: 'Invalid productId.' }, { status: 400 })
    }

    const existing = await Review.findOne({
      product: productObjId,
      user: currentUser.id,
    })
    if (existing) {
      return NextResponse.json(
        { error: 'You have already reviewed this product. Edit your existing review.' },
        { status: 409 }
      )
    }

    const review = await Review.create({
      product: productObjId,
      user: currentUser.id,
      rating: Number(rating),
      title: String(title ?? '').trim(),
      content: String(content ?? '').trim(),
    })

    return NextResponse.json({
      success: true,
      review: reviewToJson(review.toObject(), currentUser),
    })
  } catch (err) {
    console.error('Create review error:', err)
    return NextResponse.json({ error: 'Failed to create review.' }, { status: 500 })
  }
}
