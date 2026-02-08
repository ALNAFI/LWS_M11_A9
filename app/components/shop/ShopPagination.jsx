import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { shopPageData } from '@/app/data'

export default function ShopPagination() {
  const { pagination } = shopPageData
  const { currentPage, pages } = pagination

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        type="button"
        className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={`px-4 py-2 rounded-md text-sm font-bold ${
            page === currentPage
              ? 'bg-amazon-yellow border border-amazon-secondary'
              : 'border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}
