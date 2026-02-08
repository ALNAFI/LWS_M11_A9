'use client'

import React from 'react'
import Link from 'next/link'
import { useCart } from '@/app/context/CartContext'

function formatPrice(price) {
  if (typeof price === 'number') return `৳${price.toLocaleString('en-BD')}`
  return price
}

export default function ProductGrid({ products = [], loading = false }) {
  const { addItem } = useCart()

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-12">
        <p className="text-gray-500">Loading products...</p>
      </div>
    )
  }

  if (!products.length) {
    return (
      <div className="flex-1 flex items-center justify-center py-12">
        <p className="text-gray-500">No products found.</p>
      </div>
    )
  }

  return (
    <div className="flex-1">
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex gap-4 p-4 border rounded hover:shadow-md transition"
          >
            <Link
              href={`/details?productId=${product.id}`}
              className="w-48 h-48 flex-shrink-0 bg-gray-50 flex items-center justify-center"
            >
              {product.mainImageUrl ? (
                <img
                  src={product.mainImageUrl}
                  alt={product.productName}
                  className="h-full w-full object-cover mix-blend-multiply"
                />
              ) : (
                <span className="text-gray-400 text-sm">No image</span>
              )}
            </Link>

            <div className="flex-1">
              <Link href={`/details?productId=${product.id}`}>
                <h3 className="text-lg text-amazon-blue hover:text-amazon-orange font-normal mb-1">
                  {product.productName}
                </h3>
              </Link>

              <div className="mb-2">
                <span className="text-2xl font-normal">
                  {formatPrice(product.price)}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-2">
                FREE delivery <strong>Tomorrow</strong>
              </p>

              {product.description && (
                <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                  {product.description}
                </p>
              )}

              <button
                onClick={() => addItem(product)}
                className="mt-2 bg-amazon-yellow hover:bg-amazon-yellow_hover text-sm py-1.5 px-3 rounded-md shadow-sm font-medium border border-amazon-secondary transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
