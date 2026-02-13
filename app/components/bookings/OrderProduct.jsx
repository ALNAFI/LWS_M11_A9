'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, Truck, Clock, XCircle } from 'lucide-react'
import OrderProductActions from './OrderProductActions'

const statusIconMap = {
  CheckCircle,
  Truck,
  Clock,
  XCircle,
  Check: CheckCircle,
}

const STATUS_OPTIONS = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled']

export default function OrderProduct({ product, isFirst, isShopView, onStatusUpdated }) {
  const { image, title, href, seller, quantity, status, actions, isShopOwnerProduct, orderId, productId } = product
  const StatusIcon = status?.icon ? statusIconMap[status.icon] : null
  const [updating, setUpdating] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(product.status?.value || status?.value || 'Pending')

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value
    if (!orderId || !productId || updating) return
    setUpdating(true)
    try {
      const res = await fetch(`/api/orders/${orderId}/item-status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, status: newStatus }),
      })
      if (res.ok) {
        setCurrentStatus(newStatus)
        onStatusUpdated?.()
      } else {
        const data = await res.json().catch(() => ({}))
        alert(data.error || 'Failed to update status')
      }
    } catch (_) {
      alert('Failed to update status')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div
      className={`flex gap-4 ${!isFirst ? 'pt-6 border-t border-gray-200' : ''}`}
    >
      <div className="relative w-32 h-32 flex-shrink-0 border border-gray-200 rounded overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="128px"
          className="object-cover"
        />
      </div>
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
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            {isShopView && isShopOwnerProduct ? (
              <select
                value={currentStatus}
                onChange={handleStatusChange}
                disabled={updating}
                className="border border-gray-300 rounded px-2 py-1 text-xs disabled:opacity-50"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            ) : (
              <span
                className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${status.badgeClassName}`}
              >
                {StatusIcon && <StatusIcon className="w-3 h-3 inline mr-1" />}
                {status.label}
              </span>
            )}
          </div>
        )}
        {(!isShopView || !isShopOwnerProduct) && (
          <OrderProductActions actions={actions} />
        )}
      </div>
    </div>
  )
}
