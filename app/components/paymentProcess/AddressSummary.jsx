'use client'

import React from 'react'

export default function AddressSummary({ address, onEditOrderDetails }) {
  const a = address || {}
  const lines = [a.name, a.street, a.city, a.country].filter(Boolean)
  return (
    <div className="border-b border-gray-300 pb-6">
      <div className="flex justify-between items-start">
        <div>
          <span className="section-number mr-4">1</span>
          <span className="font-bold text-lg">Shipping address</span>
        </div>
        {onEditOrderDetails && (
          <button
            type="button"
            onClick={onEditOrderDetails}
            className="text-amazon-blue text-xs hover:underline hover:text-amazon-orange"
          >
            Edit Order Details
          </button>
        )}
      </div>
      <div className="text-sm flex-1 ml-10 mt-2">
        {lines.length > 0 ? (
          <>
            {lines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
            {a.phone && <p className="mt-1 text-gray-600">Phone: {a.phone}</p>}
          </>
        ) : (
          <p className="text-gray-500">No address entered.</p>
        )}
      </div>
    </div>
  )
}
