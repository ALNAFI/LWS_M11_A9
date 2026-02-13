import { NextResponse } from 'next/server'
import connectMongo from '@/app/dbConnect/connectMongo'
import Review from '@/app/models/Review'
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

export async function PATCH(request, { params }) {
  try {
    const currentUser = await getCurrentUser(request)
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    const id = params.id
    await connectMongo()
    const review = await Review.findById(id)
    if (!review) {
      return NextResponse.json({ error: 'Review not found.' }, { status: 404 })
    }
    if (review.user.toString() !== currentUser.id) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
    }

    const body = await request.json()
    if (body.rating !== undefined) {
      const r = Number(body.rating)
      if (r < 1 || r > 5) {
        return NextResponse.json({ error: 'Rating must be 1-5.' }, { status: 400 })
      }
      review.rating = r
    }
    if (body.title !== undefined) review.title = String(body.title ?? '').trim()
    if (body.content !== undefined) review.content = String(body.content ?? '').trim()

    await review.save()
    return NextResponse.json({
      success: true,
      review: {
        id: review._id.toString(),
        productId: review.product?.toString?.(),
        userId: review.user?.toString?.(),
        rating: review.rating,
        title: review.title ?? '',
        content: review.content ?? '',
        createdAt: review.createdAt,
      },
    })
  } catch (err) {
    console.error('Update review error:', err)
    return NextResponse.json({ error: 'Failed to update review.' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const currentUser = await getCurrentUser(request)
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    const id = params.id
    await connectMongo()
    const review = await Review.findById(id)
    if (!review) {
      return NextResponse.json({ error: 'Review not found.' }, { status: 404 })
    }
    if (review.user.toString() !== currentUser.id) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
    }
    await Review.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Delete review error:', err)
    return NextResponse.json({ error: 'Failed to delete review.' }, { status: 500 })
  }
}
