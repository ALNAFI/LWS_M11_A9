'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Footer } from '@/app/components/common'
import Breadcrumbs from '@/app/components/common/Breadcrumbs'
import ImageGallery from '@/app/components/details/ImageGallery'
import ProductInfo from '@/app/components/details/ProductInfo'
import BuyBox from '@/app/components/details/BuyBox'
import TabsSection from '@/app/components/details/TabsSection'
import RelatedProducts from '@/app/components/details/RelatedProducts'

export default function DetailsPageClient() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('productId')
  const { data: session } = useSession()
  const [product, setProduct] = useState(null)
  const [shop, setShop] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  useEffect(() => {
    if (!productId) {
      setError('Product not specified')
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    fetch(`/api/products/${productId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found')
        return res.json()
      })
      .then(async (data) => {
        const prod = data.product
        setProduct(prod)
        const sellerId = prod?.seller
        if (sellerId) {
          const shopRes = await fetch(`/api/shops/${sellerId}`)
          const shopData = shopRes.ok ? await shopRes.json() : { shop: null }
          setShop(shopData.shop || null)
        }
        const reviewRes = await fetch(`/api/reviews?productId=${productId}&page=1&limit=1`)
        if (reviewRes.ok) {
          const reviewData = await reviewRes.json()
          setProduct((p) => (p ? { ...p, averageRating: reviewData.averageRating, totalRatings: reviewData.totalRatings } : p))
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [productId])

  if (loading) {
    return (
      <>
        <main className="flex-1 max-w-[1500px] mx-auto w-full p-4 flex items-center justify-center min-h-[40vh]">
          <p className="text-gray-500">Loading product...</p>
        </main>
        <Footer />
      </>
    )
  }

  if (error || !product) {
    return (
      <>
        <main className="flex-1 max-w-[1500px] mx-auto w-full p-4 flex items-center justify-center min-h-[40vh]">
          <p className="text-red-600">{error || 'Product not found.'}</p>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <main className="flex-1 max-w-[1500px] mx-auto w-full p-4">
        <Breadcrumbs product={product} shop={shop} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <ImageGallery product={product} />
          <ProductInfo product={product} shop={shop} />
          {user?.userType !== 'shopOwner' && session?.user?.userType !== 'shopOwner' && (
            <BuyBox product={product} shop={shop} />
          )}
        </div>
        <TabsSection
          product={product}
          shop={shop}
          initialTab={searchParams.get('review') === '1' ? 'reviews' : undefined}
        />
        <RelatedProducts product={product} />
      </main>
      <Footer />
    </>
  )
}
