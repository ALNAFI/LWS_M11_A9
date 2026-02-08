import React from 'react'
import ShopCard from './ShopCard'
import { shopPageData } from '@/app/data'

export default function ShopsGrid() {
  const { shops } = shopPageData

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {shops.map((shop) => (
        <ShopCard key={shop.id} shop={shop} />
      ))}
    </div>
  )
}
