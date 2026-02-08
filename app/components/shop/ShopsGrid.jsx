import React from 'react'
import ShopCard from './ShopCard'

export default function ShopsGrid({ shops = [] }) {
  if (shops.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No shops yet. Shop owners can register and set up their storefronts.
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {shops.map((shop) => (
        <ShopCard key={shop.id} shop={shop} />
      ))}
    </div>
  )
}
