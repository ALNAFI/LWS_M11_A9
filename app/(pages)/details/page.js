import React, { Suspense } from 'react'
import DetailsPageClient from '@/app/components/details/DetailsPageClient'

export default function DetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      }
    >
      <DetailsPageClient />
    </Suspense>
  )
}
