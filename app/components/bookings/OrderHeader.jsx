'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/app/context/CartContext'

export default function OrderHeader({ order, onOrderCancelled }) {
  const router = useRouter()
  const { addItem } = useCart()
  const { orderPlaced, total, shipTo, id, viewDetailsHref, cancelAction, reorderOrderId } = order
  const [cancelling, setCancelling] = useState(false)
  const [reordering, setReordering] = useState(false)

  const handleCancel = async () => {
    if (!cancelAction?.orderId || cancelling) return
    if (!confirm('Cancel this order? This cannot be undone.')) return
    setCancelling(true)
    try {
      const res = await fetch(`/api/orders/${cancelAction.orderId}/cancel`, { method: 'PATCH' })
      if (res.ok) onOrderCancelled?.()
      else {
        const data = await res.json().catch(() => ({}))
        alert(data.error || 'Failed to cancel')
      }
    } catch (_) {
      alert('Failed to cancel order')
    } finally {
      setCancelling(false)
    }
  }

  const handleReorder = async () => {
    if (!reorderOrderId || reordering) return
    setReordering(true)
    try {
      const res = await fetch(`/api/orders/${reorderOrderId}/reorder`)
      if (!res.ok) throw new Error('Failed to load order')
      const data = await res.json()
      const items = data.items || []
      for (const it of items) {
        if (it.product && it.quantity) addItem(it.product, it.quantity)
      }
      router.push('/cart')
    } catch (e) {
      alert(e.message || 'Re-order failed')
    } finally {
      setReordering(false)
    }
  }

  return (
    <div className="bg-gray-100 p-4 flex flex-wrap justify-between items-center text-xs text-gray-600 border-b border-gray-300">
      <div className="flex gap-10">
        <div>
          <div className="uppercase tracking-tighter">Order Placed</div>
          <div className="font-normal text-sm text-gray-900 mt-1">{orderPlaced}</div>
        </div>
        <div>
          <div className="uppercase tracking-tighter">Total</div>
          <div className="font-normal text-sm text-gray-900 mt-1">{total}</div>
        </div>
        <div>
          <div className="uppercase tracking-tighter">Ship to</div>
          <div className="font-normal text-sm text-amazon-blue mt-1 hover:underline cursor-pointer">
            {shipTo}
          </div>
        </div>
      </div>
      <div className="text-right flex items-center gap-3">
        {reorderOrderId && (
          <button
            type="button"
            onClick={handleReorder}
            disabled={reordering}
            className="px-3 py-1.5 rounded border border-gray-300 bg-white text-gray-700 text-xs hover:bg-gray-50 disabled:opacity-50"
          >
            {reordering ? 'Adding to cart...' : 'Re-order'}
          </button>
        )}
        {cancelAction && (
          <button
            type="button"
            onClick={handleCancel}
            disabled={cancelling}
            className="px-3 py-1.5 rounded border border-red-300 bg-red-50 text-red-700 text-xs hover:bg-red-100 disabled:opacity-50"
          >
            {cancelling ? 'Cancelling...' : 'Cancel Order'}
          </button>
        )}
        <div>
          <div className="uppercase tracking-tighter mb-1">Order # {id}</div>
          <Link href={viewDetailsHref} className="text-amazon-blue hover:underline">
            View order details
          </Link>
        </div>
      </div>
    </div>
  )
}
