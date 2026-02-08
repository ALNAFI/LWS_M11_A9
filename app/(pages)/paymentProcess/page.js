'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Footer from '@/app/components/paymentProcess/Footer'
import Header from '@/app/components/paymentProcess/Header'
import PaymentMethod from '@/app/components/paymentProcess/PaymentMethod'
import OrderSummary from '@/app/components/paymentProcess/OrderSummary'
import ProductsList from '@/app/components/paymentProcess/ProductsList'
import AddressSummary from '@/app/components/paymentProcess/AddressSummary'

const CHECKOUT_STORAGE_KEY = 'gadgetsbd_checkout_items'

export default function PaymentProcessPage() {
  const router = useRouter()
  const [checkoutItems, setCheckoutItems] = useState(null)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(CHECKOUT_STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        setCheckoutItems(Array.isArray(parsed) ? parsed : [])
      } else {
        setCheckoutItems([])
      }
    } catch {
      setCheckoutItems([])
    }
  }, [])

  useEffect(() => {
    if (checkoutItems !== null && checkoutItems.length === 0) {
      router.replace('/cart')
    }
  }, [checkoutItems, router])

  if (checkoutItems === null) {
    return (
      <>
        <Header />
        <main className="checkout-container flex-1 py-10 px-4 flex items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </main>
        <Footer />
      </>
    )
  }

  if (checkoutItems.length === 0) {
    return null
  }

  const itemsSubtotal = checkoutItems.reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0)
  const serviceFee = 500
  const orderTotal = itemsSubtotal + serviceFee

  return (
    <>
      <Header />
      <main className="checkout-container flex-1 py-10 px-4 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <AddressSummary />
          <ProductsList products={checkoutItems} />
          <PaymentMethod />
        </div>
        <OrderSummary
          itemsCount={checkoutItems.length}
          itemsSubtotal={itemsSubtotal}
          serviceFee={serviceFee}
          orderTotal={orderTotal}
        />
      </main>
      <Footer />
    </>
  )
}
