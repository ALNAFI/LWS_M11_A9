import React from 'react'
import { Footer } from '@/app/components/common'
import OrderSummarySidebar from '@/app/components/cart/OrderSummarySidebar'
import CartItemsList from '@/app/components/cart/CartItemsList'
import CartHeader from '@/app/components/cart/CartHeader'

export default function CartPage() {
  return (
    <>
        {/* Main Content */}
        <main className="flex-1 max-w-[1500px] mx-auto w-full p-4">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Cart Items */}
                <div className="flex-1">
                    {/* Cart Header */}
                    <CartHeader />

                    {/* Cart Items List */}
                    <CartItemsList />
                </div>

                {/* Order Summary Sidebar */}
                <OrderSummarySidebar />
            </div>
        </main>

        <Footer />
    </>
  )
}
