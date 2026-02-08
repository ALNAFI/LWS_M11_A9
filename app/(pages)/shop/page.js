'use client'

import React, { useEffect, useState } from 'react'
import { Navbar, Footer } from '@/app/components/common'
import { ShopPageIntro, ShopsGrid, ShopPagination } from '@/app/components/shop'

export default function ShopsPage() {
  const [shops, setShops] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/shops')
      .then((res) => (res.ok ? res.json() : { shops: [] }))
      .then((data) => setShops(data.shops || []))
      .catch(() => setShops([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Navbar />
      <main className="max-w-[1500px] mx-auto w-full p-4 py-8">
        <ShopPageIntro />
        {loading ? (
          <p className="text-gray-600 text-center py-8">Loading shops...</p>
        ) : (
          <>
            <ShopsGrid shops={shops} />
            <ShopPagination total={shops.length} />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
