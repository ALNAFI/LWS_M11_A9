import { NextResponse } from 'next/server'
import connectMongo from '@/app/dbConnect/connectMongo'
import User from '@/app/models/User'

export async function GET() {
  try {
    await connectMongo()
    const shops = await User.find({ userType: 'shopOwner' })
      .select('_id name email shopName shopLocation shopDescription shopSpecialization shopBannerImage')
      .lean()

    const list = shops.map((s) => ({
      id: s._id.toString(),
      name: s.shopName || s.name,
      ownerName: s.name,
      location: s.shopLocation || '—',
      description: s.shopDescription || '',
      specializesIn: s.shopSpecialization || '—',
      image: s.shopBannerImage || 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600',
      imageGradient: 'from-blue-50 to-blue-100',
      href: `/shop/${s._id.toString()}`,
    }))

    return NextResponse.json({ shops: list })
  } catch (err) {
    console.error('List shops error:', err)
    return NextResponse.json({ error: 'Failed to list shops.' }, { status: 500 })
  }
}
