import React from 'react'
import Link from 'next/link'
import { manageListPageData } from '@/app/data'

export default function ManageListPageIntro() {
  const { pageIntro } = manageListPageData

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-normal">{pageIntro.title}</h1>
      <Link
        href={pageIntro.addProduct.href}
        className="bg-amazon-yellow hover:bg-amazon-yellow_hover px-6 py-2 rounded-md text-sm font-bold shadow-sm border border-amazon-secondary transition-colors"
      >
        {pageIntro.addProduct.label}
      </Link>
    </div>
  )
}
