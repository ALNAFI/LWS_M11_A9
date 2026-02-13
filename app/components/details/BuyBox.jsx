'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ShieldCheckIcon, TruckIcon, PackageIcon } from 'lucide-react'
import { useCart } from '@/app/context/CartContext'

const CHECKOUT_STORAGE_KEY = 'gadgetsbd_checkout_items'

function formatPrice(price) {
  if (typeof price === 'number') return `৳${price.toLocaleString('en-BD')}`
  return price
}

function checkoutItemFromProduct(product, quantity, shop) {
  return {
    id: product.id,
    title: product.productName,
    image: product.mainImageUrl || '',
    price: product.price,
    priceDisplay: formatPrice(product.price),
    seller: shop?.name || '',
    quantity: Math.min(Number(quantity) || 1, product.stockQuantity || 1),
  }
}

export default function BuyBox({ product, shop }) {
  const router = useRouter()
  const { data: session } = useSession()
  const { items, addItem, removeItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const inCart = product ? items.some((i) => i.id === product.id) : false
  const stock = product?.stockQuantity ?? 0
  const maxQty = Math.max(1, stock)
  const quantityOptions = Array.from({ length: maxQty }, (_, i) => i + 1)

  if (!product) return null

  const handleAddToCart = () => {
    const isLoggedIn = !!session?.user
    if (!isLoggedIn) {
      const redirectUrl = `/details?productId=${product.id}`
      router.push(`/auth/login?redirect=${encodeURIComponent(redirectUrl)}`)
      return
    }
    if (inCart) removeItem(product.id)
    else addItem(product, quantity)
  }

  const handleBuyNow = () => {
    if (stock < 1) return
    const qty = Math.min(quantity, stock)
    const item = checkoutItemFromProduct(product, qty, shop)
    try {
      sessionStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify([item]))
    } catch (_) {}
    router.push('/paymentProcess')
  }

  return (
    <div className="lg:col-span-3">
      <div className="border border-gray-200 rounded p-4">
        <div className="text-3xl text-amazon-orange mb-2">
          {formatPrice(product.price)}
        </div>

        <p className="text-sm mb-3">
          <span className="font-bold">FREE delivery</span>{' '}
          <strong>Tomorrow</strong>
        </p>

        <p className={`font-bold text-sm mb-4 ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {stock > 0 ? 'In Stock' : 'Out of Stock'}
        </p>

        <div className="mb-4">
          <label className="text-sm font-bold block mb-2">Quantity:</label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border border-gray-300 rounded px-3 py-1 text-sm w-20"
            disabled={stock < 1}
          >
            {quantityOptions.map((qty) => (
              <option key={qty} value={qty}>
                {qty}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={stock < 1}
          className="w-full bg-amazon-yellow hover:bg-amazon-yellow_hover py-2 rounded-md shadow-sm mb-2 text-sm font-medium border border-amazon-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {inCart ? 'Remove from Cart' : 'Add to Cart'}
        </button>

        <button
          onClick={handleBuyNow}
          disabled={stock < 1}
          className="w-full bg-amazon-secondary hover:bg-amazon-secondary_hover py-2 rounded-md shadow-sm text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Buy Now
        </button>

        <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-600">
          <p className="mb-1">
            <ShieldCheckIcon className="w-4 h-4 inline mr-1" />
            Secure transaction
          </p>
          <p className="mb-1">
            <TruckIcon className="w-4 h-4 inline mr-1" />
            Ships from Gadgets BD
          </p>
          <p>
            <PackageIcon className="w-4 h-4 inline mr-1" />
            Sold by {shop?.name || 'Seller'}
          </p>
        </div>
      </div>
    </div>
  )
}
