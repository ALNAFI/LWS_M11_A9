import { NextResponse } from 'next/server'
import connectMongo from '@/app/dbConnect/connectMongo'
import User from '@/app/models/User'

export async function GET(request, { params }) {
  try {
    const id = params.id
    await connectMongo()
    const user = await User.findOne({ _id: id, userType: 'shopOwner' })
      .select('_id name shopName shopLocation shopDescription shopSpecialization shopBannerImage')
      .lean()
    if (!user) {
      return NextResponse.json({ error: 'Shop not found.' }, { status: 404 })
    }
    const shop = {
      id: user._id.toString(),
      name: user.shopName || user.name,
      ownerName: user.name,
      location: user.shopLocation || '—',
      description: user.shopDescription || '',
      specializesIn: user.shopSpecialization || '—',
      image: user.shopBannerImage || 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600',
    }
    return NextResponse.json({ shop })
  } catch (err) {
    console.error('Get shop error:', err)
    return NextResponse.json({ error: 'Failed to get shop.' }, { status: 500 })
  }
}
