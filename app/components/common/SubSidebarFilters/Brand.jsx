import React from 'react'
import { brandFilterData } from '@/app/data'

export default function Brand() {
  return (
    <div className="border-t pt-4 mb-6">
      <h3 className="font-bold text-base mb-3">
        {brandFilterData.title}
      </h3>

      <div className="space-y-2">
        {brandFilterData.options.map((label) => (
          <label
            key={label}
            className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange"
          >
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            />
            <span className="text-sm">{label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
