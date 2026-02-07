import React from 'react'
import Link from 'next/link'
import { categoriesData } from '@/app/data'

export default function CategoriesSection() {
  return (
    <div className="max-w-[1500px] mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categoriesData.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className="bg-white p-4 text-center hover:shadow-md transition-shadow border border-gray-200 rounded"
          >
            <div className="h-32 flex items-center justify-center mb-2">
              <img
                src={category.image}
                className="h-full object-cover"
                alt={category.alt}
              />
            </div>
            <h3 className="font-medium text-sm">{category.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}
