'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/app/context/CartContext'

function formatPrice(price) {
  if (typeof price === 'number') return price.toLocaleString('en-BD')
  return String(price ?? '')
}

export default function FeaturedProduct() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    fetch('/api/products?featured=1')
      .then((res) => res.json())
      .then((data) => setProducts(data.products ?? []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return null
  if (!products.length) return null

  return (
    <div className="mt-8 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-bold">Featured Products</h2>
        <Link
          href="/products"
          className="text-amazon-blue text-sm hover:underline hover:text-red-700"
        >
          View All
        </Link>
      </div>

      <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
        {products.map((product) => (
          <div key={product.id} className="flex-none w-48">
            <Link href={`/details?productId=${product.id}`}>
              <div className="bg-gray-50 h-48 flex items-center justify-center mb-2 p-2">
                {product.mainImageUrl ? (
                  <img
                    src={product.mainImageUrl}
                    alt={product.productName}
                    className="h-full w-full object-cover mix-blend-multiply"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No image</span>
                )}
              </div>
              <div className="text-sm hover:text-amazon-orange text-amazon-blue line-clamp-2">
                {product.productName}
              </div>
            </Link>

            <div className="mt-1">
              <span className="text-xs align-top">৳</span>
              <span className="text-xl font-bold">
                {formatPrice(product.price)}
              </span>
            </div>

            <div className="text-xs text-gray-500 mb-2">
              Get it by Tomorrow
            </div>

            <button
              onClick={() => addItem(product)}
              className="w-full bg-amazon-yellow hover:bg-amazon-yellow_hover text-sm py-1.5 rounded-md shadow-sm font-medium border border-amazon-secondary transition-colors"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
