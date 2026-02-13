import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, StarHalf } from 'lucide-react'

function StarRating({ rating }) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0)

  return (
    <div className="flex text-amazon-secondary">
      {Array.from({ length: fullStars }, (_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 fill-current" />
      ))}
      {hasHalf && <StarHalf className="w-4 h-4 fill-current" />}
      {Array.from({ length: emptyStars }, (_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4" />
      ))}
    </div>
  )
}

export default function ShopCard({ shop }) {
  const {
    image,
    imageGradient = 'from-blue-50 to-blue-100',
    name,
    location,
    rating = 0,
    ratingsCount = '',
    description,
    specializesIn,
    href,
  } = shop

  return (
    <div className="bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <div
        className={`relative h-48 overflow-hidden bg-gradient-to-br ${imageGradient}`}
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <Link
              href={href}
              className="font-bold text-lg text-amazon-blue hover:text-amazon-orange hover:underline cursor-pointer"
            >
              {name}
            </Link>
            <p className="text-sm text-gray-500">{location}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-2">
          <StarRating rating={rating} />
          <span className="text-xs text-amazon-blue">{ratingsCount}</span>
        </div>

        <p className="text-sm line-clamp-3 mb-4 text-gray-700">{description}</p>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-xs">
            <span className="text-gray-500">Specializes in: </span>
            <span className="font-bold">{specializesIn}</span>
          </div>
          <Link
            href={href}
            className="bg-amazon-yellow hover:bg-amazon-yellow_hover px-4 py-1.5 rounded-full text-xs font-bold shadow-sm transition-colors"
          >
            Visit Shop →
          </Link>
        </div>
      </div>
    </div>
  )
}
