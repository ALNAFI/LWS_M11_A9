 'use client'

import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { customerReviewsData } from '@/app/data'
import { StarIcon } from 'lucide-react'

export default function CustomerReviews() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedMinRating = Number(searchParams.get('minRating') || '') || 0

  const handleChange = (rating) => {
    const next = new URLSearchParams(searchParams.toString())
    if (rating === selectedMinRating) {
      next.delete('minRating')
    } else {
      next.set('minRating', String(rating))
    }
    router.push(`/products${next.toString() ? `?${next.toString()}` : ''}`)
  }

  return (
    <div className="border-t pt-4 mb-6">
      <h3 className="font-bold text-base mb-3">
        {customerReviewsData.title}
      </h3>

      <div className="space-y-2">
        {customerReviewsData.options.map((option) => (
          <label
            key={option.rating}
            className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange"
          >
            <input
              type="checkbox"
              checked={selectedMinRating === option.rating}
              onChange={() => handleChange(option.rating)}
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            />

            <div className="flex items-center gap-1">
              <div className="flex text-amazon-secondary text-sm">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-4 h-4 ${
                      i < option.rating ? 'fill-current' : ''
                    }`}
                  ></StarIcon>
                ))}
              </div>
              <span className="text-sm">& Up</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}
