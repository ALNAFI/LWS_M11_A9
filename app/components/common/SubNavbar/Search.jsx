'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SearchIcon } from 'lucide-react'
import { categoryFilterData } from '@/app/data'

export default function Search() {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('All Categories')

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (keyword.trim()) params.set('search', keyword.trim())
    if (category && category !== 'All Categories') params.set('category', category)
    router.push(`/products${params.toString() ? `?${params.toString()}` : ''}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex h-10 rounded-md overflow-hidden focus-within:ring-3 focus-within:ring-amazon-secondary">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-gray-100 text-black text-xs px-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200"
      >
        <option>All Categories</option>
        {categoryFilterData.options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Gadgets, Laptops, Phones..."
        className="flex-1 px-3 text-black outline-none"
      />
      <button type="submit" className="bg-amazon-secondary hover:bg-[#fa8900] px-4 flex items-center justify-center">
        <SearchIcon className="text-black w-5 h-5" />
      </button>
    </form>
  )
}
