'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Footer, Navbar, ResultsHeader, SidebarFilters } from '@/app/components/common'
import ProductGrid from '@/app/components/product/ProductGrid'

export default function ProductsPageClient() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (category) params.set('category', category)
    fetch(`/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products ?? [])
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [search, category])

  return (
    <>
      <Navbar />
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
