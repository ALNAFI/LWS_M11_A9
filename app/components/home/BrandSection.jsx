'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { brandData } from '@/app/data'

function BrandCard({ brand }) {
  const href = `/products?brand=${encodeURIComponent(brand.name)}`
  return (
    <Link
      href={href}
      className="relative flex-none w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 bg-gray-50 border border-gray-200 rounded flex items-center justify-center hover:shadow-md transition-shadow cursor-pointer overflow-hidden p-3"
    >
      {brand.logo && (
        <Image
          src={brand.logo}
          alt={brand.name}
          fill
          sizes="160px"
          className="object-contain p-2"
        />
      )}
    </Link>
  )
}

export default function BrandSection() {
  const brands = [...brandData, ...brandData]

  return (
    <div className="bg-white py-8 mt-8">
      <div className="max-w-[1500px] mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Shop by Brand</h2>

        <div className="overflow-hidden">
          <div
            className="flex gap-6 w-max animate-marquee"
            style={{ width: 'max-content' }}
          >
            {brands.map((brand, index) => (
              <BrandCard key={`${brand.name}-${index}`} brand={brand} />
            ))}
            {brands.map((brand, index) => (
              <BrandCard key={`${brand.name}-dup-${index}`} brand={brand} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
