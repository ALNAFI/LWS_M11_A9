import React from 'react'
import Link from 'next/link'
import { CheckCircle, Truck } from 'lucide-react'
import OrderProductActions from './OrderProductActions'

const statusIconMap = {
  CheckCircle,
  Truck,
}

export default function OrderProduct({ product, isFirst }) {
  const { image, title, href, seller, quantity, status, actions } = product
  const StatusIcon = status?.icon ? statusIconMap[status.icon] : null

  return (
    <div
      className={`flex gap-4 ${!isFirst ? 'pt-6 border-t border-gray-200' : ''}`}
    >
      <img
        src={image}
        alt={title}
        className="w-32 h-32 object-cover border border-gray-200 rounded"
      />
      <div className="flex-1">
        <Link
          href={href}
          className="text-amazon-blue hover:underline font-bold text-sm"
        >
          {title}
        </Link>
        <p className="text-xs text-gray-600 mt-1">Sold by: {seller}</p>
        <p className="text-xs text-gray-600 mt-1">Quantity: {quantity}</p>
        {status && (
          <div className="mt-2">
            <span
              className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${status.badgeClassName}`}
            >
              {StatusIcon && <StatusIcon className="w-3 h-3 inline mr-1" />}
              {status.label}
            </span>
          </div>
        )}
        <OrderProductActions actions={actions} />
      </div>
    </div>
  )
}
