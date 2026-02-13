'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useCart } from '@/app/context/CartContext'

function formatPrice(price) {
  if (typeof price === 'number') return price.toLocaleString('en-BD')
  return String(price ?? '')
}

export default function FeaturedProduct() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { items, addItem, removeItem } = useCart()
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    fetch('/api/products?featured=1')
      .then((res) => res.json())
      .then((data) => setProducts(data.products ?? []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return null
  if (!products.length) return null

  return (
    <div className="mt-8 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-bold">Featured Products</h2>
        <Link
          href="/products"
          className="text-amazon-blue text-sm hover:underline hover:text-red-700"
        >
          View All
        </Link>
      </div>

      <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
        {products.map((product) => {
          const isInCart = items.some((item) => item.id === product.id)
          const isLoggedIn = !!session?.user
          return (
          <div key={product.id} className="flex-none w-48">
            <Link href={`/details?productId=${product.id}`}>
              <div className="relative bg-gray-50 h-48 flex items-center justify-center mb-2 p-2 overflow-hidden">
                {product.mainImageUrl ? (
                  <Image
                    src={product.mainImageUrl}
                    alt={product.productName}
                    fill
                    sizes="192px"
                    className="object-cover mix-blend-multiply"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No image</span>
                )}
              </div>
              <div className="text-sm hover:text-amazon-orange text-amazon-blue line-clamp-2">
                {product.productName}
              </div>
            </Link>

            <div className="mt-1">
              <span className="text-xs align-top">৳</span>
              <span className="text-xl font-bold">
                {formatPrice(product.price)}
              </span>
            </div>

            <div className="text-xs text-gray-500 mb-2">
              Get it by Tomorrow
            </div>

            <button
              onClick={() => {
                if (!isLoggedIn) {
                  const redirectUrl = `/details?productId=${product.id}`
                  router.push(`/auth/login?redirect=${encodeURIComponent(redirectUrl)}`)
                  return
                }
                if (isInCart) {
                  removeItem(product.id)
                } else {
                  addItem(product)
                }
              }}
              className={`w-full text-sm py-1.5 rounded-md shadow-sm font-medium border transition-colors ${
                isInCart
                  ? 'bg-white border-red-500 text-red-600 hover:bg-red-50'
                  : 'bg-amazon-yellow hover:bg-amazon-yellow_hover border-amazon-secondary text-black'
              }`}
            >
              {isInCart ? 'Remove from Cart' : 'Add to Cart'}
            </button>
          </div>
        )})}
      </div>
    </div>
  )
}
