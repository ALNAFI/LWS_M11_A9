import React from 'react'
import { manageListPageData } from '@/app/data'

export default function ManageListPagination() {
  const { pagination } = manageListPageData
  const hasPrev = pagination.currentPage > 1
  const hasNext = pagination.currentPage < pagination.totalPages

  return (
    <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
      <div>{pagination.showingText}</div>
      <div className="flex gap-2">
        <button
          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
          disabled={!hasPrev}
        >
          {pagination.prevLabel}
        </button>
        {pagination.pages.map((page) => (
          <button
            key={page}
            className={`px-3 py-1 border border-gray-300 rounded ${page === pagination.currentPage ? 'bg-amazon-yellow font-bold' : 'hover:bg-gray-50'}`}
          >
            {page}
          </button>
        ))}
        <button
          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
          disabled={!hasNext}
        >
          {pagination.nextLabel}
        </button>
      </div>
    </div>
  )
}
