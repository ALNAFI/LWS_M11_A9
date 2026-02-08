'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Footer from '@/app/components/paymentProcess/Footer'
import OrderPlaced from '@/app/components/success/OrderPlaced'
import SuccessOrderInfo from '@/app/components/success/SuccessOrderInfo'

export default function SuccessPageClient() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(!!orderId)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!orderId) {
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    fetch(`/api/orders/${orderId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Order not found')
        return res.json()
      })
      .then((data) => setOrder(data.order))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [orderId])

  return (
    <>
      <main className="max-w-[800px] mx-auto w-full p-8 py-12">
        {loading && <p className="text-gray-500">Loading order...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && order && (
          <>
            <OrderPlaced order={order} />
            <SuccessOrderInfo order={order} />
          </>
        )}
        {!loading && !error && !order && !orderId && (
          <>
            <OrderPlaced order={null} />
            <SuccessOrderInfo order={null} />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
