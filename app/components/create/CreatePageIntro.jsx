import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createPageData } from '@/app/data'

export default function CreatePageIntro() {
  const { pageIntro } = createPageData

  return (
    <div className="mb-8 flex justify-between items-end">
      <div>
        <h1 className="text-3xl font-normal">{pageIntro.title}</h1>
        <p className="text-sm text-gray-600">{pageIntro.subtitle}</p>
      </div>
      <Link
        href={pageIntro.backLink.href}
        className="text-amazon-blue hover:underline text-sm flex items-center gap-1"
      >
        <ArrowLeft className="w-4 h-4" />
        {pageIntro.backLink.label}
      </Link>
    </div>
  )
}
