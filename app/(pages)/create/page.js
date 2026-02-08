import React from 'react'
import Footer from '@/app/components/paymentProcess/Footer'
import {
  CreateHeader,
  CreatePageIntro,
  CreateForm,
} from '@/app/components/create'
import { createPageData } from '@/app/data'

export default function CreatePage() {
  const { footer } = createPageData

  return (
    <>
      <CreateHeader />

      <main className="max-w-[1000px] mx-auto w-full p-6">
        <CreatePageIntro />
        <CreateForm />
      </main>

      <Footer
        copyrightText={`{{year}} ${footer.copyrightText}`}
        className="mt-auto py-6 bg-white border-t border-gray-300"
        innerClassName="max-w-[1000px] mx-auto text-center text-xs text-gray-500"
      />
    </>
  )
}