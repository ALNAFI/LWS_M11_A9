'use client'

import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { conditionData } from '@/app/data'

export default function Condition() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedCondition = searchParams.get('condition') || ''

  const handleChange = (label) => {
    const next = new URLSearchParams(searchParams.toString())
    if (label === selectedCondition) {
      next.delete('condition')
    } else {
      next.set('condition', label)
    }
    router.push(`/products${next.toString() ? `?${next.toString()}` : ''}`)
  }

  return (
    <div className="border-t pt-4 mb-6">
      <h3 className="font-bold text-base mb-3">
        {conditionData.title}
      </h3>

      <div className="space-y-2">
        {conditionData.options.map((option) => (
          <label
            key={option.label}
            className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange"
          >
            <input
              type="checkbox"
              checked={selectedCondition === option.label}
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
