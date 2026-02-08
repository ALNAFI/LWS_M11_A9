import React from 'react'
import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'

export default function Breadcrumbs({ product, shop }) {
  const category = product?.category || 'Products'
  const name = product?.productName || 'Product'
  return (
    <div className="text-xs text-gray-500 mb-4 flex items-center gap-1 flex-wrap">
      <Link href="/" className="hover:underline">Home</Link>
      <ChevronRightIcon className="w-3 h-3 flex-shrink-0" />
      <Link href="/products" className="hover:underline">Products</Link>
      <ChevronRightIcon className="w-3 h-3 flex-shrink-0" />
      <Link href={`/products?category=${encodeURIComponent(category)}`} className="hover:underline">
        {category}
      </Link>
      <ChevronRightIcon className="w-3 h-3 flex-shrink-0" />
      <span className="text-amazon-text font-bold truncate max-w-[200px]" title={name}>{name}</span>
    </div>
  )
}
