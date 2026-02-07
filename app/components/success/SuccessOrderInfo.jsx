import React from 'react'
import Link from 'next/link'
import { successOrderInfoData } from '@/app/data'

export default function SuccessOrderInfo() {
  const { title, items, summaryRows } = successOrderInfoData

  return (
    <div className="mt-12 space-y-6">
      <h2 className="text-2xl font-normal border-b border-gray-200 pb-4">
        {title}
      </h2>

      {items.map((item, index) => (
        <div
          key={item.id}
          className={`flex gap-4 items-start ${
            index > 0 ? 'pt-4 border-t border-gray-100' : ''
          }`}
        >
          <img
            src={item.image}
            className="w-20 h-20 object-cover border border-gray-200 rounded"
            alt={item.title}
          />
          <div>
            <Link
              href={item.href}
              className="text-amazon-blue hover:underline font-bold text-sm"
            >
              {item.title}
            </Link>
            <p className="text-xs text-gray-500 mt-1">Quantity: {item.quantity}</p>
            <p className="text-xs text-amazon-orange font-bold mt-1">
              {item.price}
            </p>
          </div>
        </div>
      ))}

      <div className="pt-4 border-t border-gray-200">
        <div className="max-w-sm ml-auto space-y-2 text-sm">
          {summaryRows.map((row) => (
            <div
              key={row.label}
              className={`flex justify-between ${
                row.borderBottom ? 'border-b border-gray-200 pb-2' : ''
              } ${row.total ? 'text-lg font-bold text-amazon-orange' : ''}`}
            >
              <span>{row.label}</span>
              <span className={row.valueClassName ?? ''}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
