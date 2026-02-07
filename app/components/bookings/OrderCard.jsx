import React from 'react'
import OrderHeader from './OrderHeader'
import OrderProduct from './OrderProduct'

export default function OrderCard({ order }) {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <OrderHeader order={order} />
      <div className={`p-6 ${order.products.length > 1 ? 'space-y-6' : ''}`}>
        {order.products.map((product, index) => (
          <OrderProduct
            key={product.id}
            product={product}
            isFirst={index === 0}
          />
        ))}
      </div>
    </div>
  )
}
