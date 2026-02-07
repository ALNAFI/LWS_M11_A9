import React from 'react'
import Link from 'next/link'
import { addressSummaryData } from '@/app/data'

export default function AddressSummary() {
  return (
    <div className="hover:bg-gray-50 border-b border-gray-300 pb-6 flex justify-between items-start transition-colors cursor-pointer">
      <div>
        <span className="section-number mr-4">
          {addressSummaryData.step}
        </span>
        <span className="font-bold text-lg">
          {addressSummaryData.title}
        </span>
      </div>

      <div className="text-sm flex-1 ml-10">
        <p>{addressSummaryData.address.name}</p>
        <p>{addressSummaryData.address.street}</p>
        <p>{addressSummaryData.address.city}</p>
        <p>{addressSummaryData.address.country}</p>
        <p className="mt-1 text-gray-600">
          Phone: {addressSummaryData.address.phone}
        </p>
      </div>

      <Link
        href={addressSummaryData.changeLink.href}
        className="text-amazon-blue text-xs hover:underline hover:text-amazon-orange"
      >
        {addressSummaryData.changeLink.label}
      </Link>
    </div>
  )
}
