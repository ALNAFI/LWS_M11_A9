'use client'

import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { availabilityData } from '@/app/data'

export default function Availability() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedAvailability = searchParams.get('availability') || ''

  const handleChange = (label) => {
    const next = new URLSearchParams(searchParams.toString())
    if (label === selectedAvailability) {
      next.delete('availability')
    } else {
      next.set('availability', label)
    }
    router.push(`/products${next.toString() ? `?${next.toString()}` : ''}`)
  }

  return (
    <div className="border-t pt-4 mb-6">
      <h3 className="font-bold text-base mb-3">
        {availabilityData.title}
      </h3>

      <div className="space-y-2">
        {availabilityData.options.map((option) => (
          <label
            key={option.label}
            className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange"
          >
            <input
              type="checkbox"
              checked={selectedAvailability === option.label}
              onChange={() => handleChange(option.label)}
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            />
            <span className="text-sm">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
