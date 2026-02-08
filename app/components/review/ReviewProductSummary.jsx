import React from 'react'
import { reviewPageData } from '@/app/data'

export default function ReviewProductSummary() {
  const { product } = reviewPageData

  return (
    <div className="flex items-center gap-4 border-b border-gray-200 pb-6">
      <img
        src={product.image}
        className="w-16 h-16 object-cover border border-gray-200 rounded"
        alt={product.title}
      />
      <h2 className="font-bold text-sm">{product.title}</h2>
    </div>
  )
}
