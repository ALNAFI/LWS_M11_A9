import React from 'react'
import { paymentProductsListData } from '@/app/data'

export default function ProductsList() {
  const { sectionNumber, sectionTitle, products } = paymentProductsListData

  return (
    <div className="pb-6 border-b border-gray-300">
      <div className="flex items-center mb-4">
        <span className="section-number mr-4">{sectionNumber}</span>
        <span className="font-bold text-lg">{sectionTitle}</span>
      </div>

      <div className="box p-4 space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex gap-4 pb-4 border-b border-gray-200 last:border-0"
          >
            <div className="w-24 h-24 bg-gray-50 flex items-center justify-center flex-shrink-0">
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
                  {product.price}
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <span>Qty:</span>
                  <select className="border border-gray-300 rounded px-2 py-0.5">
                    {product.quantityOptions.map((qty) => (
                      <option key={qty}>{qty}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
