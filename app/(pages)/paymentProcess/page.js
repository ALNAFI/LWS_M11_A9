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
import { useCart } from '@/app/context/CartContext'

const CHECKOUT_STORAGE_KEY = 'gadgetsbd_checkout_items'
const CHECKOUT_ADDRESS_KEY = 'gadgetsbd_checkout_address'
export default function PaymentProcessPage() {
  const router = useRouter()
  const { setItems } = useCart()
  const [checkoutItems, setCheckoutItems] = useState(null)
  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    country: '',
    phone: '',
  })
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
        if (addr && typeof addr === 'object') {
          setAddress({
            name: addr.name ?? '',
            street: addr.street ?? '',
            city: addr.city ?? '',
            country: addr.country ?? '',
            phone: addr.phone ?? '',
          })
        }
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
        <Header itemCount={0} />
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

  const itemsSubtotal = checkoutItems.reduce(
    (s, i) => s + (i.price || 0) * (i.quantity || 1),
    0
  )
  const serviceFee = 500
  // Free delivery on orders >= 50,000; otherwise 120 tk delivery charge
  const deliveryFee = itemsSubtotal >= 50000 ? 0 : 120
  const orderTotal = itemsSubtotal + deliveryFee + serviceFee

  return (
    <>
      <Header itemCount={checkoutItems.length} />
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
              const hasAddress =
                address.name.trim() &&
                address.street.trim() &&
                address.city.trim() &&
                address.country.trim() &&
                address.phone.trim()

              if (!hasAddress) {
                setOrderError('Please add your delivery address before placing your order.')
                return
              }

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
                  // Clear only checkout items for this order; keep address for reuse
                  sessionStorage.removeItem(CHECKOUT_STORAGE_KEY)
                  // Clear purchased items from client cart immediately
                  setItems((prev) =>
                    prev.filter(
                      (cartItem) => !checkoutItems.some((ci) => ci.id === cartItem.id)
                    )
                  )
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
