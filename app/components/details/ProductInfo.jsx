'use client'

import React from 'react'
import Link from 'next/link'
import { StarIcon } from 'lucide-react'

function formatPrice(price) {
  if (typeof price === 'number') return `৳${price.toLocaleString('en-BD')}`
  return price
}

export default function ProductInfo({ product, shop }) {
  if (!product) return null

  const rating = product.averageRating ?? 0
  const ratingCount = product.totalRatings ?? 0

  const about = [
    product.description && product.description.trim() ? product.description : null,
    product.processor && `Processor: ${product.processor}`,
    product.ram && `RAM: ${product.ram}`,
    product.storage && `Storage: ${product.storage}`,
    product.displaySize && `Display: ${product.displaySize}`,
    product.otherSpecs && product.otherSpecs.trim(),
  ].filter(Boolean)

  return (
    <div className="lg:col-span-4">
      <h1 className="text-2xl font-normal mb-2">{product.productName}</h1>

      {shop && (
        <p className="text-sm text-gray-600 mb-3">
          Visit the{' '}
          <Link
            href={`/shop/${shop.id}`}
            className="text-amazon-blue hover:underline"
          >
            {shop.name}
          </Link>
        </p>
      )}

      <div className="flex items-center gap-2 mb-4">
        <div className="flex text-amazon-secondary">
          {[1, 2, 3, 4, 5].map((i) => (
            <StarIcon
              key={i}
              className={`w-4 h-4 ${i <= Math.round(rating) ? 'fill-current' : ''}`}
            />
          ))}
        </div>
        <span className="text-sm text-amazon-blue">
          {ratingCount} rating{ratingCount !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-sm">Price:</span>
          <span className="text-3xl text-amazon-orange">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="text-xs text-gray-600 mb-2">Inclusive of all taxes</p>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4">
        <h3 className="font-bold text-base mb-2">About this item</h3>
        {about.length > 0 ? (
          <ul className="text-sm space-y-1 list-disc list-inside">
            {about.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No description provided.</p>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <p className="text-sm mb-2">
          <span className="font-bold">Category:</span> {product.category}
        </p>
        <p className="text-sm mb-2">
          <span className="font-bold">Brand:</span> {product.brand}
        </p>
        <p className="text-sm mb-2">
          <span className="font-bold">Stock:</span>{' '}
          <span className={product.stockQuantity > 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
            {product.stockQuantity > 0
              ? `${product.stockQuantity} unit${product.stockQuantity !== 1 ? 's' : ''} available`
              : 'Out of stock'}
          </span>
        </p>
      </div>
    </div>
  )
}
