import React from 'react'
import Link from 'next/link'
import { productGridData } from '@/app/data'
import { StarIcon } from 'lucide-react'
export default function ProductGrid() {
  return (
    <div className="flex-1">
      <div className="space-y-4">
        {productGridData.map((product) => (
          <Link
            key={product.title}
            href={product.href}
            className="flex gap-4 p-4 border rounded hover:shadow-md transition"
          >
            <div className="w-48 h-48 flex-shrink-0 bg-gray-50 flex items-center justify-center">
              <img
                src={product.image}
                className="h-full object-cover mix-blend-multiply"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-lg text-amazon-blue hover:text-amazon-orange font-normal mb-1">
                {product.title}
              </h3>

              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amazon-secondary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-4 h-4 ${i < product.rating ? 'fill-current' : ''}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-amazon-blue">
                  {product.ratingCount}
                </span>
              </div>

              <div className="mb-2">
                <span className="text-2xl font-normal">
                  {product.price}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-2">
                FREE delivery <strong>Tomorrow</strong>
              </p>

              <p className="text-xs text-gray-500">
                {product.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
