'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Footer } from '@/app/components/common'

export default function ShopDetailPage() {
  const params = useParams()
  const id = params?.id
  const [shop, setShop] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }
    Promise.all([
      fetch(`/api/shops/${id}`).then((r) => (r.ok ? r.json() : null)),
      fetch(`/api/products?sellerId=${id}`).then((r) => (r.ok ? r.json() : { products: [] })),
    ])
      .then(([shopRes, productsRes]) => {
        if (!shopRes?.shop) {
          setNotFound(true)
          return
        }
        setShop(shopRes.shop)
        setProducts(productsRes?.products || [])
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </div>
        <Footer />
      </>
    )
  }

  if (notFound || !shop) {
    return (
      <>
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
          <h1 className="text-xl font-bold text-gray-800 mb-2">Shop not found</h1>
          <Link href="/shop" className="text-amazon-blue hover:underline">
            Browse all shops
          </Link>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <main className="max-w-[1200px] mx-auto w-full px-4 py-8">
        {/* Shop header */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="h-48 sm:h-64 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
            {shop.image ? (
              <img
                src={shop.image}
                alt={shop.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg">
                {shop.name}
              </div>
            )}
          </div>
          <div className="p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              {shop.name}
            </h1>
            <p className="text-gray-500 text-sm mb-2">{shop.location}</p>
            {shop.specializesIn && (
              <p className="text-sm text-gray-600 mb-3">
                <span className="font-medium">Specializes in:</span> {shop.specializesIn}
              </p>
            )}
            {shop.description && (
              <p className="text-gray-700 text-sm">{shop.description}</p>
            )}
          </div>
        </div>

        {/* Products section */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Products {products.length > 0 && `(${products.length})`}
          </h2>
          {products.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-12 text-center text-gray-500">
              This shop has no products listed yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((p) => (
                <Link
                  key={p.id}
                  href={`/details?productId=${p.id}`}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    {p.mainImageUrl ? (
                      <img
                        src={p.mainImageUrl}
                        alt={p.productName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm p-4 text-center">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                      {p.productName}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{p.brand}</p>
                    <p className="mt-auto text-amazon-secondary font-bold">
                      ৳{typeof p.price === 'number' ? p.price.toLocaleString('en-BD') : p.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8">
          <Link
            href="/shop"
            className="text-amazon-blue hover:underline text-sm"
          >
            ← Back to all shops
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
