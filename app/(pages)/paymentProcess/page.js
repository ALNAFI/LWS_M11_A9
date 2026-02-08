'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Footer from '@/app/components/paymentProcess/Footer'
import Header from '@/app/components/paymentProcess/Header'
import PaymentMethod from '@/app/components/paymentProcess/PaymentMethod'
import OrderSummary from '@/app/components/paymentProcess/OrderSummary'
import ProductsList from '@/app/components/paymentProcess/ProductsList'
import AddressSummary from '@/app/components/paymentProcess/AddressSummary'
import EditOrderModal from '@/app/components/paymentProcess/EditOrderModal'

const CHECKOUT_STORAGE_KEY = 'gadgetsbd_checkout_items'
const CHECKOUT_ADDRESS_KEY = 'gadgetsbd_checkout_address'
const DEFAULT_ADDRESS = {
  name: 'John Doe',
  street: '123 Main St, Apartment 4B',
  city: 'Dhaka, 1212',
  country: 'Bangladesh',
  phone: '+880 1712-345678',
}

export default function PaymentProcessPage() {
  const router = useRouter()
  const [checkoutItems, setCheckoutItems] = useState(null)
  const [address, setAddress] = useState(DEFAULT_ADDRESS)
  const [placing, setPlacing] = useState(false)
  const [orderError, setOrderError] = useState(null)
  const [editModalOpen, setEditModalOpen] = useState(false)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(CHECKOUT_STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        setCheckoutItems(Array.isArray(parsed) ? parsed : [])
      } else {
        setCheckoutItems([])
      }
      const addrRaw = sessionStorage.getItem(CHECKOUT_ADDRESS_KEY)
      if (addrRaw) {
        const addr = JSON.parse(addrRaw)
        if (addr && typeof addr === 'object') setAddress({ ...DEFAULT_ADDRESS, ...addr })
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

  const handleSaveEdit = ({ address: newAddress, checkoutItems: newItems }) => {
    setAddress(newAddress)
    setCheckoutItems(newItems)
    try {
      sessionStorage.setItem(CHECKOUT_ADDRESS_KEY, JSON.stringify(newAddress))
      sessionStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(newItems))
    } catch (_) {}
  }

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
  const deliveryFee = 0
  const orderTotal = itemsSubtotal + deliveryFee + serviceFee

  return (
    <>
      <Header />
      <main className="checkout-container flex-1 py-10 px-4 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <AddressSummary
            address={address}
            onEditOrderDetails={() => setEditModalOpen(true)}
          />
          <ProductsList products={checkoutItems} />
        </div>
        <div className="w-full lg:w-[340px] flex-shrink-0 space-y-6">
          <PaymentMethod
            checkoutItems={checkoutItems}
            orderError={orderError}
            onPlaceOrder={async () => {
              setOrderError(null)
              setPlacing(true)
              try {
                const items = checkoutItems.map((i) => ({
                  productId: i.id,
                  quantity: i.quantity ?? 1,
                }))
                const res = await fetch('/api/orders', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    items,
                    shippingAddress: address,
                  }),
                })
                const data = await res.json().catch(() => ({}))
                if (!res.ok) throw new Error(data.error || 'Failed to place order')
                try {
                  sessionStorage.removeItem(CHECKOUT_STORAGE_KEY)
                  sessionStorage.removeItem(CHECKOUT_ADDRESS_KEY)
                } catch (_) {}
                router.push(`/success?orderId=${encodeURIComponent(data.orderId || '')}`)
              } catch (err) {
                setOrderError(err.message || 'Failed to place order')
              } finally {
                setPlacing(false)
              }
            }}
          />
          <OrderSummary
            checkoutItems={checkoutItems}
            itemsCount={checkoutItems.length}
            itemsSubtotal={itemsSubtotal}
            deliveryFee={deliveryFee}
            serviceFee={serviceFee}
            orderTotal={orderTotal}
            submitDisabled={placing}
          />
        </div>
      </main>
      <EditOrderModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        address={address}
        checkoutItems={checkoutItems}
        onSave={handleSaveEdit}
      />
      <Footer />
    </>
  )
}
