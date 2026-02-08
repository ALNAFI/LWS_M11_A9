import React from 'react'

export default function ShopPagination({ total = 0 }) {
  return (
    <div className="flex items-center justify-center mt-8 text-sm text-gray-600">
      {total > 0 && <span>Showing {total} shop{total !== 1 ? 's' : ''}</span>}
    </div>
  )
}
