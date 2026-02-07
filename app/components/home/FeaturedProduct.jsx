import React from 'react'
import Link from 'next/link'
import { featuredProductsData } from '@/app/data'

export default function FeaturedProduct() {
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
        {featuredProductsData.map((product) => (
          <div key={product.title} className="flex-none w-48">
            <Link href={product.href}>
              <div className="bg-gray-50 h-48 flex items-center justify-center mb-2 p-2">
                <img
                  src={product.image}
                  className="h-full object-cover mix-blend-multiply"
                />
              </div>
              <div className="text-sm hover:text-amazon-orange text-amazon-blue line-clamp-2">
                {product.title}
              </div>
            </Link>

            <div className="text-xs text-gray-500">
              {product.store}
            </div>

            <div className="mt-1">
              <span className="text-xs align-top">৳</span>
              <span className="text-xl font-bold">
                {product.price}
              </span>
            </div>

            <div className="text-xs text-gray-500 mb-2">
              Get it by Tomorrow
            </div>

            <button className="w-full bg-amazon-yellow hover:bg-amazon-yellow_hover text-sm py-1.5 rounded-md shadow-sm font-medium border border-amazon-secondary transition-colors">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
