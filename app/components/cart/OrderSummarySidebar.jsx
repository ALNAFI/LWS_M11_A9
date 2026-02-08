'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  CheckCircleIcon,
  ShieldCheckIcon,
  TruckIcon,
} from 'lucide-react'
import { orderSummaryData } from '@/app/data'
import { useCart } from '@/app/context/CartContext'

const CHECKOUT_STORAGE_KEY = 'gadgetsbd_checkout_items'

const subtotalBoxIcon = {
  ShieldCheck: ShieldCheckIcon,
  Truck: TruckIcon,
}

export default function OrderSummarySidebar() {
  const router = useRouter()
  const { selectedItems, selectedSubtotal } = useCart()
  const {
    freeShipping,
    giftOption,
    checkoutButton,
    footerItems,
  } = orderSummaryData

  const selectedCount = selectedItems.length
  const canCheckout = selectedCount > 0
  const subtotalDisplay = `৳${selectedSubtotal.toLocaleString('en-BD')}`

  function handleProceedToCheckout() {
    if (!canCheckout) return
    const payload = selectedItems.map((item) => ({
      id: item.id,
      title: item.title,
      image: item.image,
      price: item.price,
      priceDisplay: item.priceDisplay,
      seller: item.seller,
      quantity: item.quantity,
    }))
    try {
      sessionStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(payload))
    } catch (_) {}
    router.push(checkoutButton.href)
  }

  return (
    <div className="lg:w-80">
      <div className="bg-white p-4 border border-gray-300 rounded">
        <div className="mb-4">
          <p className="text-sm mb-2">
            <CheckCircleIcon className="w-4 h-4 inline text-green-600 mr-1" />
            <span className="text-green-700 font-medium">
              {freeShipping.text}
            </span>
          </p>
        </div>

        <div className="mb-4">
          <p className="text-lg mb-1">
            Subtotal ({selectedCount} item{selectedCount !== 1 ? 's' : ''}):
            <span className="font-bold text-amazon-orange">
              {subtotalDisplay}
            </span>
          </p>
          <div className="flex items-start gap-2 text-xs">
            <input
              type="checkbox"
              id={giftOption.id}
              className="mt-0.5"
            />
            <label htmlFor={giftOption.id} className="text-gray-700">
              {giftOption.label}
            </label>
          </div>
        </div>

        <button
          type="button"
          onClick={handleProceedToCheckout}
          disabled={!canCheckout}
          className="w-full py-2 bg-amazon-yellow hover:bg-amazon-yellow_hover border border-amazon-secondary rounded-md text-sm font-bold shadow-sm transition-colors mb-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {checkoutButton.label}
        </button>
        {!canCheckout && selectedCount === 0 && (
          <p className="text-xs text-gray-500 mb-2">Select at least one item to checkout.</p>
        )}

        <div className="text-xs text-gray-600 mt-4">
          {footerItems.map((item) => {
            const IconComponent = subtotalBoxIcon[item.icon]
            return (
              <p key={item.text} className={item.icon === 'Truck' ? '' : 'mb-2'}>
                {IconComponent && (
                  <IconComponent className="w-3 h-3 inline mr-1" />
                )}
                {item.text}
              </p>
            )
          })}
        </div>
      </div>
    </div>
  )
}
