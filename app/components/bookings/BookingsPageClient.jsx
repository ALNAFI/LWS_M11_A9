'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Footer } from '@/app/components/common'
import NavResults from '@/app/components/bookings/NavResults'
import BookingsPageHeader from '@/app/components/bookings/BookingsPageHeader'
import OrderCard from '@/app/components/bookings/OrderCard'

export default function BookingsPageClient() {
  const router = useRouter()
  const [orders, setOrders] = useState(null)
  const [userType, setUserType] = useState(null)
  const [loading, setLoading] = useState(true)

  const refetchOrders = useCallback(() => {
    if (userType === 'shopOwner') {
      fetch('/api/orders?view=shop')
        .then((r) => r.json())
        .then((d) => setOrders(d.orders ?? []))
        .catch(() => {})
    } else {
      fetch('/api/orders?view=customer')
        .then((r) => r.json())
        .then((d) => setOrders(d.orders ?? []))
        .catch(() => {})
    }
  }, [userType])

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      setLoading(true)
      try {
        const meRes = await fetch('/api/auth/me')
        if (!meRes.ok) {
          if (!cancelled) router.replace('/')
          return
        }
        const meData = await meRes.json().catch(() => ({}))
        const uType = meData.user?.userType || 'customer'
        if (!cancelled) setUserType(uType)
        const view = uType === 'shopOwner' ? 'shop' : 'customer'
        const ordersRes = await fetch(`/api/orders?view=${view}`)
        if (ordersRes.status === 401) {
          if (!cancelled) router.replace('/')
          return
        }
        const ordersData = await ordersRes.json().catch(() => ({}))
        if (!cancelled) setOrders(ordersData.orders ?? [])
      } catch {
        if (!cancelled) setOrders([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => { cancelled = true }
  }, [router])

  const handleOrderCancelled = refetchOrders
  const handleStatusUpdated = refetchOrders

  if (loading && orders === null) {
    return (
      <>
        <main className="max-w-[1000px] mx-auto w-full p-4 py-6">
          <p className="text-gray-500">Loading orders...</p>
        </main>
        <Footer />
      </>
    )
  }

  const isShopView = userType === 'shopOwner'
  const emptyMessage = isShopView
    ? 'No orders placed for your products yet.'
    : 'You have not placed any orders yet.'

  return (
    <>
      <main className="max-w-[1000px] mx-auto w-full p-4 py-6">
        <NavResults />
        <BookingsPageHeader ordersCount={orders?.length ?? 0} />
        <div className="space-y-6">
          {!orders?.length ? (
            <p className="text-gray-500 py-8">{emptyMessage}</p>
          ) : (
            orders.map((order) => (
              <OrderCard
                key={order.orderId || order.id}
                order={order}
                isShopView={order.isShopView ?? isShopView}
                onOrderCancelled={handleOrderCancelled}
                onStatusUpdated={handleStatusUpdated}
              />
            ))
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
