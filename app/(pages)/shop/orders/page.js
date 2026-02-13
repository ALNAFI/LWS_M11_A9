'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import NavResults from '@/app/components/bookings/NavResults'
import BookingsPageHeader from '@/app/components/bookings/BookingsPageHeader'
import OrderCard from '@/app/components/bookings/OrderCard'
import { Footer } from '@/app/components/common'

export default function ShopOwnerOrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Ensure user is authenticated and is a shop owner
      const meRes = await fetch('/api/auth/me', { credentials: 'include' })
      const meData = await meRes.json().catch(() => ({}))
      if (!meRes.ok || !meData.user || meData.user.userType !== 'shopOwner') {
        router.replace('/')
        return
      }

      const res = await fetch('/api/orders?view=shop', { credentials: 'include' })
      if (!res.ok) {
        setError('Failed to load shop orders. Please try again.')
        setOrders([])
        return
      }
      const data = await res.json().catch(() => ({}))
      setOrders(Array.isArray(data.orders) ? data.orders : [])
    } catch (_) {
      setError('Failed to load shop orders. Please try again.')
      setOrders([])
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const handleStatusUpdated = useCallback(() => {
    // Re-fetch to keep filters in sync with latest statuses
    fetchOrders()
  }, [fetchOrders])

  const normalizedSearch = search.trim().toLowerCase()

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === 'all' ||
      order.products.some((p) => p.status?.value === statusFilter)

    if (!matchesStatus) return false
    if (!normalizedSearch) return true

    const idText = (order.id || order.orderId || '').toString().toLowerCase()
    const shipTo = (order.shipTo || '').toLowerCase()
    const viewHref = (order.viewDetailsHref || '').toLowerCase()

    return (
      idText.includes(normalizedSearch) ||
      shipTo.includes(normalizedSearch) ||
      viewHref.includes(normalizedSearch)
    )
  })

  return (
    <>
      <main className="flex-1 max-w-[1000px] mx-auto w-full p-4 py-6">
        <NavResults />
        <BookingsPageHeader ordersCount={filteredOrders.length} />

        <div className="flex flex-wrap gap-3 mb-4 text-xs items-center">
          <div className="flex items-center gap-1">
            <label htmlFor="shop-orders-status" className="font-medium">
              Status:
            </label>
            <select
              id="shop-orders-status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-100 border border-gray-300 rounded px-2 py-1 outline-none"
            >
              <option value="all">All</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex items-center gap-1 flex-1 min-w-[200px]">
            <label htmlFor="shop-orders-search" className="font-medium">
              Search:
            </label>
            <input
              id="shop-orders-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Order ID, customer, etc."
              className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-amazon-blue"
            />
          </div>
        </div>

        {loading && (
          <p className="text-sm text-gray-500 mt-4">Loading shop orders...</p>
        )}
        {!loading && error && (
          <p className="text-sm text-red-600 mt-4">{error}</p>
        )}
        {!loading && !error && filteredOrders.length === 0 && (
          <p className="text-sm text-gray-500 mt-4">
            You have no orders for your shop yet.
          </p>
        )}

        <div className="space-y-6 mt-4">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.orderId || order.id}
              order={order}
              isShopView={true}
              onStatusUpdated={handleStatusUpdated}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}

