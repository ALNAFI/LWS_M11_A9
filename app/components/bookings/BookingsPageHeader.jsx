import React from 'react'
import { bookingsPageData } from '@/app/data'

export default function BookingsPageHeader() {
  const { pageTitle, ordersCount, periodLabel, periodOptions } = bookingsPageData

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-normal">{pageTitle}</h1>
      </div>
      <div className="text-sm mb-6 flex items-center gap-1">
        <span className="font-bold">{ordersCount} orders</span>
        <span>{periodLabel}</span>
        <select className="bg-gray-100 border border-gray-300 rounded shadow-sm px-2 py-1 text-xs outline-none hover:bg-gray-200">
          {periodOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    </>
  )
}
