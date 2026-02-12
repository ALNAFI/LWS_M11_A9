'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Footer, ResultsHeader, SidebarFilters } from '@/app/components/common'
import ProductGrid from '@/app/components/product/ProductGrid'

export default function ProductsPageClient() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''
  const brand = searchParams.get('brand') || ''
  const minRating = searchParams.get('minRating') || ''
  const price = searchParams.get('price') || ''
  const availability = searchParams.get('availability') || ''
  const condition = searchParams.get('condition') || ''
  const sort = searchParams.get('sort') || ''
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (category) params.set('category', category)
    if (brand) params.set('brand', brand)
    if (minRating) params.set('minRating', minRating)
    if (price) params.set('price', price)
    if (availability) params.set('availability', availability)
    if (condition) params.set('condition', condition)
    if (sort) params.set('sort', sort)
    const query = params.toString()
    fetch(query ? `/api/products?${query}` : '/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products ?? [])
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [search, category, brand, minRating, price, availability, condition, sort])

  return (
    <>
      <main className="flex-1 max-w-[1500px] mx-auto w-full p-4">
        <ResultsHeader
          searchTerm={search}
          totalResults={products.length}
        />
        <div className="flex gap-6">
          <SidebarFilters />
          <ProductGrid products={products} loading={loading} />
        </div>
      </main>
      <Footer />
    </>
  )
}
