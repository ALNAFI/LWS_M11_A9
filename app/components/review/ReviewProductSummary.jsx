import React from 'react'
import Image from 'next/image'
import { reviewPageData } from '@/app/data'

export default function ReviewProductSummary() {
  const { product } = reviewPageData

  return (
    <div className="flex items-center gap-4 border-b border-gray-200 pb-6">
      <div className="relative w-16 h-16 flex-shrink-0 border border-gray-200 rounded overflow-hidden">
        <Image src={product.image} alt={product.title} fill sizes="64px" className="object-cover" />
      </div>
      <h2 className="font-bold text-sm">{product.title}</h2>
    </div>
  )
}
