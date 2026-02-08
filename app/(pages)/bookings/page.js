import React, { Suspense } from 'react'
import BookingsPageClient from '@/app/components/bookings/BookingsPageClient'

export default function BookingsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <BookingsPageClient />
    </Suspense>
  )
}
