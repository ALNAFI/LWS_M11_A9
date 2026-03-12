import React from 'react'
import Footer from '@/app/components/paymentProcess/Footer'
import {
  ReviewHeader,
  ReviewProductSummary,
  ReviewForm,
} from '@/app/components/review'
import { reviewPageData } from '@/app/data'

export default function ReviewPage() {
  const { pageTitle } = reviewPageData

  return (
    <>
      <ReviewHeader />

      <main className="max-w-[1000px] mx-auto w-full p-6">
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl font-normal">{pageTitle}</h1>
          <ReviewProductSummary />
          <ReviewForm />
        </div>
      </main>

      <Footer
        copyrightText="1996-{{year}}, GadgetHub.com, Inc. or its affiliates"
        className="w-full border-t border-gray-200 mt-auto py-8"
      />
    </>
  )
}
