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
  }
}

export async function GET(request, { params }) {
  try {
    const id = params.id
    await connectMongo()
    const product = await Product.findById(id).lean()
    if (!product) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 })
    }
    return NextResponse.json({ product: productToJson(product) })
  } catch (err) {
    console.error('Get product error:', err)
    return NextResponse.json({ error: 'Failed to get product.' }, { status: 500 })
  }
}

export async function PATCH(request, { params }) {
  try {
    const currentUser = await getCurrentUser(request)
    if (!currentUser || currentUser.userType !== 'shopOwner') {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    const id = params.id
    await connectMongo()
    const product = await Product.findById(id)
    if (!product) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 })
    }
    if (product.seller.toString() !== currentUser.id) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
    }

    const body = await request.json()
    const allowed = [
      'productName', 'category', 'brand', 'condition', 'description',
      'price', 'stockQuantity', 'sku', 'availability', 'warrantyPeriod',
      'mainImageUrl', 'additionalImageUrls', 'processor', 'ram', 'storage',
      'displaySize', 'otherSpecs', 'published',
    ]
    for (const key of allowed) {
      if (body[key] === undefined) continue
      if (key === 'published') {
        product.published = Boolean(body.published)
      } else if (key === 'price' || key === 'stockQuantity') {
        product[key] = Number(body[key])
      } else if (key === 'additionalImageUrls') {
        product.additionalImageUrls = Array.isArray(body[key])
          ? body[key].filter((u) => typeof u === 'string' && u.trim()).map((u) => u.trim())
          : []
      } else if (typeof product[key] === 'string') {
        product[key] = String(body[key] ?? '').trim()
      }
    }
    await product.save()
    return NextResponse.json({ success: true, product: productToJson(product) })
  } catch (err) {
    console.error('Update product error:', err)
    return NextResponse.json({ error: 'Failed to update product.' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const currentUser = await getCurrentUser(request)
    if (!currentUser || currentUser.userType !== 'shopOwner') {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    const id = params.id
    await connectMongo()
    const product = await Product.findById(id)
    if (!product) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 })
    }
    if (product.seller.toString() !== currentUser.id) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
    }
    await Product.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Delete product error:', err)
    return NextResponse.json({ error: 'Failed to delete product.' }, { status: 500 })
  }
}
