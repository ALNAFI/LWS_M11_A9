import React from 'react'
import { imageGalleryData } from '@/app/data'

export default function ImageGallery() {
  return (
    <div className="lg:col-span-5 flex gap-4">
      <div className="flex flex-col gap-2">
        {imageGalleryData.thumbnails.map((thumb, index) => (
          <button
            key={index}
            className={`w-10 h-10 border rounded overflow-hidden hover:shadow-md ${
              thumb.active
                ? 'border-amazon-secondary'
                : 'border-gray-300'
            }`}
          >
            <img
              src={thumb.src}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      <div className="flex-1 border border-gray-200 rounded p-4 bg-gray-50">
        <img
          src={imageGalleryData.mainImage}
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  )
}
