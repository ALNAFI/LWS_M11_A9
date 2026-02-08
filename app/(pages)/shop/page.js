import { Navbar, Footer } from '@/app/components/common'
import React from 'react'
import {
  ShopPageIntro,
  ShopsGrid,
  ShopPagination,
} from '@/app/components/shop'

export default function ShopPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-[1500px] mx-auto w-full p-4 py-8">
        <ShopPageIntro />
        <ShopsGrid />
        <ShopPagination />
      </main>

      <Footer />
    </>
  )
}
