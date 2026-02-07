import React from 'react'
import { whyUsData } from '@/app/data'

export default function WhyUsSection() {
  return (
    <div className="bg-white py-12 mt-8">
      <div className="max-w-[1500px] mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">
          Why Shop with Gadgets BD?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUsData.map((item) => (
            <div key={item.title} className="text-center p-4">
              <div className="w-16 h-16 bg-amazon-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <i
                  data-lucide={item.icon}
                  className="w-8 h-8 text-amazon"
                ></i>
              </div>

              <h3 className="font-bold text-lg mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
