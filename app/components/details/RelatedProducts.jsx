import React from 'react'
import Link from 'next/link'
import { relatedProductsData } from '@/app/data'

export default function RelatedProducts() {
  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="text-xl font-bold mb-6">
        {relatedProductsData.title}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {relatedProductsData.items.map((product) => (
          <Link
            key={product.name}
            href={product.href}
            className="border border-gray-200 rounded p-3 hover:shadow-md transition"
          >
            <div className="bg-gray-50 h-32 flex items-center justify-center mb-2">
              <img
                src={product.image}
                className="h-full object-cover"
              />
            </div>

            <p className="text-sm text-amazon-blue hover:text-amazon-orange line-clamp-2 mb-1">
              {product.name}
            </p>

            <p className="text-sm font-bold">{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
