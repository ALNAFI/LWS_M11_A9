import React from 'react'
import { profilePageData } from '@/app/data'

export default function ShopInfoGrid() {
  const { infoFields } = profilePageData

  return (
    <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-300">
        <h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">
          Shop Information
        </h2>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {infoFields.map((field) => (
          <div
            key={field.label}
            className={field.colSpan === 2 ? 'md:col-span-2' : ''}
          >
            <label className="block text-xs text-gray-500 mb-1">{field.label}</label>
            <p className="font-medium">{field.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
