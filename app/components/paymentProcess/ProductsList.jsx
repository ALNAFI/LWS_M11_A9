'use client'

import React from 'react'
import { paymentProductsListData } from '@/app/data'

export default function ProductsList({ products: productsProp }) {
  const { sectionNumber, sectionTitle } = paymentProductsListData
  const products = productsProp ?? paymentProductsListData.products

  if (!products || products.length === 0) {
    return (
      <div className="pb-6 border-b border-gray-300">
        <div className="flex items-center mb-4">
          <span className="section-number mr-4">{sectionNumber}</span>
          <span className="font-bold text-lg">{sectionTitle}</span>
        </div>
        <div className="box p-4 text-gray-500 text-sm">No items.</div>
      </div>
    )
  }

  return (
    <div className="pb-6 border-b border-gray-300">
      <div className="flex items-center mb-4">
        <span className="section-number mr-4">{sectionNumber}</span>
        <span className="font-bold text-lg">{sectionTitle}</span>
      </div>

      <div className="box p-4 space-y-4">
        {products.map((product) => {
          const priceDisplay = product.priceDisplay ?? (typeof product.price === 'number' ? `৳${product.price.toLocaleString('en-BD')}` : product.price)
          const quantityOptions = product.quantityOptions ?? [1, 2, 3, 4, 5]
          const qty = product.quantity ?? 1
          return (
            <div
              key={product.id}
              className="flex gap-4 pb-4 border-b border-gray-200 last:border-0"
            >
              <div className="w-24 h-24 bg-gray-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium mb-1">{product.title}</h3>
                <p className="text-xs text-gray-600 mb-2">
                  Sold by: {product.seller}
                </p>
                <div className="flex items-center gap-4">
                  <p className="text-sm font-bold text-amazon-orange">
                    {priceDisplay}
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <span>Qty:</span>
                    <span className="font-medium">{qty}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
