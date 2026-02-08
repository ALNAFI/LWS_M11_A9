'use client'

import React from 'react'
import OrderHeader from './OrderHeader'
import OrderProduct from './OrderProduct'

export default function OrderCard({ order, isShopView, onOrderCancelled, onStatusUpdated }) {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <OrderHeader order={order} onOrderCancelled={onOrderCancelled} />
      <div className={`p-6 ${order.products.length > 1 ? 'space-y-6' : ''}`}>
        {order.products.map((product, index) => (
          <OrderProduct
            key={product.id || product.productId}
            product={product}
            isFirst={index === 0}
            isShopView={isShopView}
            onStatusUpdated={onStatusUpdated}
          />
        ))}
      </div>
    </div>
  )
}
