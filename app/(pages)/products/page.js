import React, { Suspense } from 'react'
import ProductsPageClient from '@/app/components/product/ProductsPageClient'

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    }>
      <ProductsPageClient />
    </Suspense>
  )
}
