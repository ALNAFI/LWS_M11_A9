'use client'

import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { categoryFilterData } from '@/app/data'

export default function Category() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedCategory = searchParams.get('category') || ''

  const handleChange = (option) => {
    const next = new URLSearchParams(searchParams.toString())
    if (option === selectedCategory) {
      next.delete('category')
    } else {
      next.set('category', option)
    }
    router.push(`/products${next.toString() ? `?${next.toString()}` : ''}`)
  }

  return (
    <div className="mb-6">
      <h3 className="font-bold text-base mb-3">
        {categoryFilterData.title}
      </h3>

      <div className="space-y-2">
        {categoryFilterData.options.map((label) => (
          <label
            key={label}
            className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange"
          >
            <input
              type="checkbox"
              checked={selectedCategory === label}
              onChange={() => handleChange(label)}
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            />
            <span className="text-sm">{label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
