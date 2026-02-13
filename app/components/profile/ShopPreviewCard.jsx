import React from 'react'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'

export default function ShopPreviewCard({ user }) {
  const shopName = user?.shopName || 'Your shop'
  const shopLocation = user?.shopLocation || '—'
  const shopDescription = user?.shopDescription || 'Add a description in Edit Mode.'
  const shopSpecialization = user?.shopSpecialization || '—'
  const bannerImage = user?.shopBannerImage

  return (
    <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-300 flex justify-between items-center">
        <h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">
          Shop Preview
        </h2>
        <span className="flex items-center bg-green-50 px-2 py-1 rounded border border-green-200">
          <CheckCircle className="w-3 h-3 text-green-600 mr-1" />
          <span className="text-[10px] font-bold text-green-700 uppercase">
            Verified
          </span>
        </span>
      </div>
      <div className="p-6">
        <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-sm overflow-hidden shadow-md">
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
            {bannerImage ? (
              <Image
                src={bannerImage}
                alt="Shop Banner"
                fill
                sizes="384px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                No banner image
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg text-amazon-blue mb-1">{shopName}</h3>
            <p className="text-sm text-gray-500 mb-3">{shopLocation}</p>
            <p className="text-sm text-gray-700 mb-4">{shopDescription}</p>
            <div className="pt-4 border-t border-gray-100">
              <div className="text-xs">
                <span className="text-gray-500">Specializes in: </span>
                <span className="font-bold">{shopSpecialization}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
