import React from 'react'
import Link from 'next/link'
import { productInfoData } from '@/app/data'
import { StarIcon } from 'lucide-react'
export default function ProductInfo() {
  return (
    <div className="lg:col-span-4">
      <h1 className="text-2xl font-normal mb-2">
        {productInfoData.title}
      </h1>

      <p className="text-sm text-gray-600 mb-3">
        Visit the{' '}
        <Link
          href={productInfoData.store.href}
          className="text-amazon-blue hover:underline"
        >
          {productInfoData.store.name}
        </Link>
      </p>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex text-amazon-secondary">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              className="w-4 h-4 fill-current"
            />
          ))}
        </div>
        <span className="text-sm text-amazon-blue hover:underline cursor-pointer">
          {productInfoData.rating.count}
        </span>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-sm">Price:</span>
          <span className="text-3xl text-amazon-orange">
            {productInfoData.price}
          </span>
        </div>
        <p className="text-xs text-gray-600 mb-2">
          Inclusive of all taxes
        </p>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4">
        <h3 className="font-bold text-base mb-2">
          About this item
        </h3>
        <ul className="text-sm space-y-1 list-disc list-inside">
          {productInfoData.about.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <p className="text-sm mb-2">
          <span className="font-bold">Category:</span>{' '}
          {productInfoData.meta.category}
        </p>
        <p className="text-sm mb-2">
          <span className="font-bold">Brand:</span>{' '}
          {productInfoData.meta.brand}
        </p>
        <p className="text-sm">
          <span className="font-bold">Stock:</span>{' '}
          <span className="text-green-600 font-semibold">
            {productInfoData.meta.stock}
          </span>
        </p>
      </div>
    </div>
  )
}
