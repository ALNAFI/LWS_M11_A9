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
  const session = await getServerSession(request, authOptions)
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
    const status = searchParams.get('status')?.trim() // All | Active | Inactive

    await connectMongo()

    const filter = {}

    if (featured) {
      filter.published = true
      filter.purchases = { $gt: 0 }
    } else if (sellerId) {
      filter.seller = sellerId
      filter.published = true
    } else {
      const currentUser = await getCurrentUser(request)
      if (currentUser && currentUser.userType === 'shopOwner') {
        filter.seller = currentUser.id
        if (status === 'Active') filter.published = true
        else if (status === 'Inactive') filter.published = false
      } else {
        // Public browse: all published products
        filter.published = true
      }
    }

    if (search) {
      filter.$or = [
        { productName: new RegExp(search, 'i') },
        { sku: new RegExp(search, 'i') },
      ]
    }
    if (category && category !== 'All Categories') filter.category = category
    if (brand && brand !== 'All Brands') filter.brand = brand

    const sort = featured
      ? { purchases: -1, createdAt: -1 }
      : { createdAt: -1 }
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
      { error: 'Failed to create product.' },
      { status: 500 }
    )
  }
}
