import React, { Suspense } from 'react'
import SuccessPageClient from '@/app/components/success/SuccessPageClient'

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SuccessPageClient />
    </Suspense>
  )
}
