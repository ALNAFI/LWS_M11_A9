import { NextResponse } from 'next/server'
import connectMongo from '@/app/dbConnect/connectMongo'
import Product from '@/app/models/Product'
import { getAccessTokenFromRequest, verifyAccessToken } from '@/app/lib/tokens'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/lib/auth'

async function getCurrentUser(request) {
  const accessToken = getAccessTokenFromRequest(request)
  if (accessToken) {
    const payload = await verifyAccessToken(accessToken)
    if (payload?.sub) return { id: payload.sub, userType: payload.userType }
  }
  const session = await getServerSession(authOptions)
  if (session?.user) {
    return { id: session.user.id, userType: session.user.userType }
  }
  return null
}

function productToJson(p) {
  return {
    id: p._id.toString(),
    productName: p.productName,
    category: p.category,
    brand: p.brand,
    condition: p.condition,
    description: p.description,
    price: p.price,
    stockQuantity: p.stockQuantity,
    sku: p.sku,
    availability: p.availability,
    warrantyPeriod: p.warrantyPeriod,
    mainImageUrl: p.mainImageUrl,
    additionalImageUrls: p.additionalImageUrls || [],
    processor: p.processor,
    ram: p.ram,
    storage: p.storage,
    displaySize: p.displaySize,
    otherSpecs: p.otherSpecs,
    published: p.published !== false,
    seller: p.seller?.toString?.(),
    purchases: p.purchases ?? 0,
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const sellerId = searchParams.get('sellerId')
    const featured = searchParams.get('featured') === '1'
    const search = searchParams.get('search')?.trim()
    const category = searchParams.get('category')?.trim()
    const brand = searchParams.get('brand')?.trim()
    const minRatingRaw = searchParams.get('minRating')
    const priceSlug = searchParams.get('price')?.trim()
    const availability = searchParams.get('availability')?.trim()
    const condition = searchParams.get('condition')?.trim()
    const status = searchParams.get('status')?.trim()
    const view = searchParams.get('view')?.trim()
    const sortParam = searchParams.get('sort')?.trim()

    await connectMongo()

    const filter = {}

    if (featured) {
      filter.published = true
      filter.purchases = { $gt: 0 }
    } else if (sellerId) {
      filter.seller = sellerId
      filter.published = true
    } else if (view === 'manage') {
      const currentUser = await getCurrentUser(request)
      if (currentUser && currentUser.userType === 'shopOwner') {
        filter.seller = currentUser.id
        if (status === 'Active') filter.published = true
        else if (status === 'Inactive') filter.published = false
      } else {
        filter.published = true
      }
    } else {
      filter.published = true
    }

    if (search) {
      filter.$or = [
        { productName: new RegExp(search, 'i') },
        { sku: new RegExp(search, 'i') },
      ]
    }
    if (category && category !== 'All Categories') filter.category = category
    if (brand && brand !== 'All Brands') filter.brand = brand
    if (availability && availability !== 'All') filter.availability = availability
    if (condition && condition !== 'All') filter.condition = condition

    // Price range by slug
    const priceRanges = {
      'under-10k': { max: 9999 },
      '10k-25k': { min: 10000, max: 25000 },
      '25k-50k': { min: 25000, max: 50000 },
      '50k-100k': { min: 50000, max: 100000 },
      'over-100k': { min: 100001 },
    }
    if (priceSlug && priceRanges[priceSlug]) {
      const range = priceRanges[priceSlug]
      filter.price = {}
      if (range.min != null) filter.price.$gte = range.min
      if (range.max != null) filter.price.$lte = range.max
    }

    // Optional rating filter: only include products whose average review rating >= minRating
    let ratedProductIds = null
    if (minRatingRaw != null) {
      const minRating = Number(minRatingRaw)
      if (!Number.isNaN(minRating) && minRating > 0) {
        const Review = (await import('@/app/models/Review')).default
        const ratingAgg = await Review.aggregate([
          { $group: { _id: '$product', avg: { $avg: '$rating' } } },
          { $match: { avg: { $gte: minRating } } },
          { $project: { _id: 1 } },
        ])
        ratedProductIds = ratingAgg.map((r) => r._id)
        if (ratedProductIds.length === 0) {
          return NextResponse.json({ products: [] })
        }
        filter._id = { ...(filter._id || {}), $in: ratedProductIds }
      }
    }

    let sort = { createdAt: -1 }
    if (view === 'manage') {
      sort = { createdAt: -1 }
    } else if (sortParam === 'featured' || featured) {
      sort = { purchases: -1, createdAt: -1 }
    } else if (sortParam === 'price-asc') {
      sort = { price: 1, createdAt: -1 }
    } else if (sortParam === 'price-desc') {
      sort = { price: -1, createdAt: -1 }
    } else if (sortParam === 'rating') {
      sort = { purchases: -1, createdAt: -1 }
    } else {
      sort = { createdAt: -1 }
    }
    const products = await Product.find(filter).sort(sort).lean()
    return NextResponse.json({ products: products.map((p) => productToJson(p)) })
  } catch (err) {
    console.error('List products error:', err)
    return NextResponse.json({ error: 'Failed to list products.' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser(request)
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }
    if (currentUser.userType !== 'shopOwner') {
      return NextResponse.json(
        { error: 'Only Shop Owners can add products.' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const {
      productName,
      category,
      brand,
      condition,
      description,
      price,
      stockQuantity,
      sku,
      availability,
      warrantyPeriod,
      mainImageUrl,
      additionalImageUrls,
      processor,
      ram,
      storage,
      displaySize,
      otherSpecs,
    } = body

    if (!productName?.trim() || !category?.trim() || !brand?.trim()) {
      return NextResponse.json(
        { error: 'Product name, category, and brand are required.' },
        { status: 400 }
      )
    }
    if (typeof price !== 'number' || price < 0) {
      return NextResponse.json(
        { error: 'Valid price is required.' },
        { status: 400 }
      )
    }
    if (typeof stockQuantity !== 'number' || stockQuantity < 0) {
      return NextResponse.json(
        { error: 'Valid stock quantity is required.' },
        { status: 400 }
      )
    }

    await connectMongo()

    const product = await Product.create({
      seller: currentUser.id,
      productName: productName.trim(),
      category: category.trim(),
      brand: brand.trim(),
      condition: condition === 'Renewed' ? 'Renewed' : 'New',
      description: description?.trim() ?? '',
      price: Number(price),
      stockQuantity: Number(stockQuantity),
      sku: sku?.trim() ?? '',
      availability: availability || 'In Stock',
      warrantyPeriod: warrantyPeriod?.trim() ?? '',
      mainImageUrl: mainImageUrl?.trim() ?? '',
      additionalImageUrls: Array.isArray(additionalImageUrls)
        ? additionalImageUrls.filter((u) => typeof u === 'string' && u.trim()).map((u) => u.trim())
        : [],
      processor: processor?.trim() ?? '',
      ram: ram?.trim() ?? '',
      storage: storage?.trim() ?? '',
      displaySize: displaySize?.trim() ?? '',
      otherSpecs: otherSpecs?.trim() ?? '',
      published: true,
    })

    return NextResponse.json({
      success: true,
      product: {
        id: product._id.toString(),
        productName: product.productName,
        category: product.category,
      },
    })
  } catch (err) {
    console.error('Create product error:', err)
    return NextResponse.json(
      { error: 'Failed to create product. Please try again.' },
      { status: 500 }
    )
  }
}
