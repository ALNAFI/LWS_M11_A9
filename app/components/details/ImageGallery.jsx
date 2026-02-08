'use client'

import React, { useState } from 'react'

export default function ImageGallery({ product }) {
  const images = [
    ...(product?.mainImageUrl ? [product.mainImageUrl] : []),
    ...(product?.additionalImageUrls || []),
  ].filter(Boolean)
  const [activeIndex, setActiveIndex] = useState(0)
  const mainImage = images[activeIndex] || product?.mainImageUrl || ''

  if (!product) return null

  return (
    <div className="lg:col-span-5 flex gap-4">
      <div className="flex flex-col gap-2">
        {images.length > 0 &&
          images.map((src, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`w-10 h-10 border rounded overflow-hidden hover:shadow-md ${
                activeIndex === index ? 'border-amazon-secondary' : 'border-gray-300'
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
      </div>
      <div className="flex-1 border border-gray-200 rounded p-4 bg-gray-50">
        {mainImage ? (
          <img src={mainImage} alt={product.productName} className="w-full h-auto object-cover" />
        ) : (
          <div className="w-full aspect-square bg-gray-200 flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>
    </div>
  )
}
