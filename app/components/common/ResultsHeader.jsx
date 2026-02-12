'use client'

import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Avg. Customer Review', value: 'rating' },
  { label: 'Newest Arrivals', value: 'newest' },
]

export default function ResultsHeader({ searchTerm = '', totalResults = 0 }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sortParam = searchParams.get('sort') || 'newest'

  const resultsText = searchTerm
    ? `${totalResults} result${totalResults !== 1 ? 's' : ''} for `
    : totalResults
      ? `${totalResults} product${totalResults !== 1 ? 's' : ''}`
      : 'No products'

  const handleSortChange = (e) => {
    const value = e.target.value
    const next = new URLSearchParams(searchParams.toString())
    if (value && value !== 'newest') {
      next.set('sort', value)
    } else {
      next.delete('sort')
    }
    router.push(`/products${next.toString() ? `?${next.toString()}` : ''}`)
  }

  return (
    <div className="flex justify-between items-center mb-4 shadow-sm border-b pb-2">
      <div className="text-sm">
        <span>{resultsText}</span>
        {searchTerm && (
          <span className="font-bold text-amazon-orange">"{searchTerm}"</span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm">Sort by:</span>
        <select
          value={sortParam}
          onChange={handleSortChange}
          className="text-sm bg-gray-100 border border-gray-300 rounded px-2 py-1 shadow-sm focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
