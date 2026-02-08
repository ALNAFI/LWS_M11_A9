'use client'

import React from 'react'
import { Search } from 'lucide-react'
import { manageListPageData } from '@/app/data'

export default function ManageListFilters({ filters = {}, onFiltersChange }) {
  const { filters: filterConfig } = manageListPageData

  const handleChange = (key, value) => {
    onFiltersChange?.({ ...filters, [key]: value })
  }

  return (
    <div className="bg-white border border-gray-300 rounded shadow-sm p-4 mb-6 flex flex-wrap items-center gap-4 text-sm">
      <div className="flex items-center gap-2">
        <span className="font-bold">{filterConfig.status.label}</span>
        <select
          value={filters.status ?? 'All'}
          onChange={(e) => handleChange('status', e.target.value)}
          className="border border-gray-300 py-1 px-2 rounded outline-none focus:ring-1 focus:ring-amazon-blue"
        >
          {filterConfig.status.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2 border-l border-gray-300 pl-4">
        <span className="font-bold">{filterConfig.category.label}</span>
        <select
          value={filters.category ?? 'All Categories'}
          onChange={(e) => handleChange('category', e.target.value)}
          className="border border-gray-300 py-1 px-2 rounded outline-none focus:ring-1 focus:ring-amazon-blue"
        >
          {filterConfig.category.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2 border-l border-gray-300 pl-4">
        <span className="font-bold">{filterConfig.brand.label}</span>
        <select
          value={filters.brand ?? 'All Brands'}
          onChange={(e) => handleChange('brand', e.target.value)}
          className="border border-gray-300 py-1 px-2 rounded outline-none focus:ring-1 focus:ring-amazon-blue"
        >
          {filterConfig.brand.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div className="flex-1 flex items-center gap-2 border-l border-gray-300 pl-4">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={filters.search ?? ''}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder={filterConfig.searchPlaceholder}
            className="w-full pl-8 pr-2 py-1 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-amazon-blue"
          />
        </div>
      </div>
    </div>
  )
}
