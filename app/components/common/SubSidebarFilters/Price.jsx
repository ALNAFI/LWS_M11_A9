'use client'

import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { priceData } from '@/app/data'

export default function Price() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedPrice = searchParams.get('price') || ''

  const handleChange = (value) => {
    const next = new URLSearchParams(searchParams.toString())
    if (value === selectedPrice) {
      next.delete('price')
    } else {
      next.set('price', value)
    }
    router.push(`/products${next.toString() ? `?${next.toString()}` : ''}`)
  }

  return (
    <div className="border-t pt-4 mb-6">
      <h3 className="font-bold text-base mb-3">
        {priceData.title}
      </h3>

      <div className="space-y-2">
        {priceData.options.map((option) => {
          const opt = typeof option === 'string' ? { label: option, value: option } : option
          return (
            <label
              key={opt.value}
              className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange"
            >
              <input
                type="checkbox"
                checked={selectedPrice === opt.value}
                onChange={() => handleChange(opt.value)}
                className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
              />
              <span className="text-sm">{opt.label}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}
