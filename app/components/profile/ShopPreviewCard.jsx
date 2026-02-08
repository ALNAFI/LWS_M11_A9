import React from 'react'
import { Star, CheckCircle } from 'lucide-react'
import { profilePageData } from '@/app/data'

function StarRating({ rating }) {
  const fullStars = Math.floor(rating)
  return (
    <div className="flex text-amazon-secondary">
      {Array.from({ length: fullStars }, (_, i) => (
        <Star key={i} className="w-4 h-4 fill-current" />
      ))}
    </div>
  )
}

export default function ShopPreviewCard() {
  const { shop } = profilePageData

  return (
    <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-300 flex justify-between items-center">
        <h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">
          Shop Preview
        </h2>
        {shop.verified && (
          <span className="flex items-center bg-green-50 px-2 py-1 rounded border border-green-200">
            <CheckCircle className="w-3 h-3 text-green-600 mr-1" />
            <span className="text-[10px] font-bold text-green-700 uppercase">
              Verified
            </span>
          </span>
        )}
      </div>
      <div className="p-6">
        <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-sm overflow-hidden shadow-md">
          <div className={`h-48 overflow-hidden bg-gradient-to-br ${shop.imageGradient}`}>
            <img
              src={shop.bannerImage}
              className="w-full h-full object-cover"
              alt="Shop Banner"
            />
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg text-amazon-blue mb-1">{shop.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{shop.location}</p>
            <div className="flex items-center gap-1 mb-3">
              <StarRating rating={shop.rating} />
              <span className="text-xs text-amazon-blue">{shop.ratingsCount}</span>
            </div>
            <p className="text-sm text-gray-700 mb-4">{shop.description}</p>
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="text-xs">
                <span className="text-gray-500">Specializes in: </span>
                <span className="font-bold">{shop.specializesIn}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
