import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { categoriesData } from '@/app/data'

export default function CategoriesSection() {
  return (
    <div className="max-w-[1500px] mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categoriesData.map((category) => (
          <Link
            key={category.title}
            href={category.category ? `${category.href}?category=${encodeURIComponent(category.category)}` : category.href}
            className="bg-white p-4 text-center hover:shadow-md transition-shadow border border-gray-200 rounded"
          >
            <div className="relative h-32 flex items-center justify-center mb-2 overflow-hidden">
              <Image
                src={category.image}
                alt={category.alt}
                fill
                sizes="(max-width: 768px) 50vw, 16vw"
                className="object-cover"
              />
            </div>
            <h3 className="font-medium text-sm">{category.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}
