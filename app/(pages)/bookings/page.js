'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { Footer } from '@/app/components/common'
import NavResults from '@/app/components/bookings/NavResults'
import BookingsPageHeader from '@/app/components/bookings/BookingsPageHeader'
import OrderCard from '@/app/components/bookings/OrderCard'

export default function BookingsPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchOrders = useCallback(async () => {
    let cancelled = false
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/orders', { credentials: 'include' })
      if (!res.ok) {
        if (res.status === 401) {
          setError('Please sign in to view your orders.')
        } else {
          setError('Failed to load orders. Please try again.')
        }
        setOrders([])
        return
      }
      const data = await res.json().catch(() => ({}))
      if (!cancelled) {
        setOrders(Array.isArray(data.orders) ? data.orders : [])
      }
    } catch (_) {
      if (!cancelled) {
        setError('Failed to load orders. Please try again.')
        setOrders([])
      }
    } finally {
      if (!cancelled) setLoading(false)
    }
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  return (
    <>
      <main className="flex-1 max-w-[1000px] mx-auto w-full p-4 py-6">
        <NavResults />
        <BookingsPageHeader ordersCount={orders.length} />

        {loading && (
          <p className="text-sm text-gray-500 mt-4">Loading your orders...</p>
        )}
        {!loading && error && (
          <p className="text-sm text-red-600 mt-4">{error}</p>
        )}
        {!loading && !error && orders.length === 0 && (
          <p className="text-sm text-gray-500 mt-4">
            You have no orders yet.
          </p>
        )}

        <div className="space-y-6 mt-4">
          {orders.map((order) => (
            <OrderCard
              key={order.orderId || order.id}
              order={order}
              isShopView={order.isShopView}
              onOrderCancelled={fetchOrders}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}
