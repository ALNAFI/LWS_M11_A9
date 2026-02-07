import { Navbar, Footer } from '@/app/components/common'
import React from 'react'
import NavResults from '@/app/components/bookings/NavResults'
import BookingsPageHeader from '@/app/components/bookings/BookingsPageHeader'
import OrderCard from '@/app/components/bookings/OrderCard'
import { bookingsOrdersData } from '@/app/data'

export default function BookingsPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-[1000px] mx-auto w-full p-4 py-6">
        <NavResults />
        <BookingsPageHeader />

        <div className="space-y-6">
          {bookingsOrdersData.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}
