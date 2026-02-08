import React from 'react'
import { manageListPageData } from '@/app/data'

export default function ManageListPagination({ total = 0 }) {
  const { pagination } = manageListPageData
  const showingText = total === 0 ? 'Showing 0 products' : `Showing 1-${total} of ${total} products`

  return (
    <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
      <div>{showingText}</div>
    </div>
  )
}
