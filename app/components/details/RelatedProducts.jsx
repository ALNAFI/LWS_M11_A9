'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useCart } from '@/app/context/CartContext'

function formatPrice(price) {
  if (typeof price === 'number') return `৳${price.toLocaleString('en-BD')}`
  return price
}

export default function RelatedProducts({ product }) {
  const [relatedItems, setRelatedItems] = useState([])
  const { items: cartItems, addItem, removeItem } = useCart()
  const router = useRouter()
  const { data: session } = useSession()
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (session?.user) {
      setUser({ userType: session.user.userType })
      return
    }
    fetch('/api/auth/me', { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : { user: null }))
      .then((data) => setUser(data?.user ?? null))
      .catch(() => setUser(null))
  }, [session])

  const isShopOwner = user?.userType === 'shopOwner' || session?.user?.userType === 'shopOwner'

  useEffect(() => {
    if (!product?.category || !product?.id) return
    const params = new URLSearchParams()
    params.set('category', product.category)
    fetch(`/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        const list = (data.products || []).filter((p) => p.id !== product.id).slice(0, 6)
        setRelatedItems(list)
      })
      .catch(() => setRelatedItems([]))
  }, [product?.id, product?.category])

  if (!product || relatedItems.length === 0) return null

  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="text-xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {relatedItems.map((p) => {
          const isInCart = cartItems.some((item) => item.id === p.id)
          const isLoggedIn = !!session?.user
          return (
          <div
            key={p.id}
            className="border border-gray-200 rounded p-3 hover:shadow-md transition"
          >
            <Link href={`/details?productId=${p.id}`} className="block">
              <div className="bg-gray-50 h-32 flex items-center justify-center mb-2 overflow-hidden">
                {p.mainImageUrl ? (
                  <img
                    src={p.mainImageUrl}
                    alt={p.productName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-xs">No image</span>
                )}
              </div>
              <p className="text-sm text-amazon-blue hover:text-amazon-orange line-clamp-2 mb-1">
                {p.productName}
              </p>
            </Link>
            <p className="text-sm font-bold mb-2">{formatPrice(p.price)}</p>
            {!isShopOwner ? (
              <button
                type="button"
                onClick={() => {
                  if (!isLoggedIn) {
                    const redirectUrl = `/details?productId=${p.id}`
                    router.push(`/auth/login?redirect=${encodeURIComponent(redirectUrl)}`)
                    return
                  }
                  if (isInCart) {
                    removeItem(p.id)
                  } else {
                    addItem(p)
                  }
                }}
                disabled={(p.stockQuantity ?? 0) < 1}
                className={`w-full text-xs py-1.5 rounded border disabled:opacity-50 ${
                  isInCart
                    ? 'bg-white border-red-500 text-red-600 hover:bg-red-50'
                    : 'bg-amazon-yellow hover:bg-amazon-yellow_hover border-amazon-secondary'
                }`}
              >
                {isInCart ? 'Remove from Cart' : 'Add to Cart'}
              </button>
            ) : (
              <Link
                href={`/details?productId=${p.id}`}
                className="block w-full text-center bg-white hover:bg-gray-50 text-xs py-1.5 rounded border border-gray-300 text-amazon-blue hover:text-amazon-orange"
              >
                View details
              </Link>
            )}
          </div>
        )})}
      </div>
    </div>
  )
}
