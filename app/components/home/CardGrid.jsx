import React from 'react'
import Link from 'next/link'
import { cardGridData } from '@/app/data'

export default function CardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardGridData.map((card, index) => {
        if (card.type === 'grid') {
          return (
            <div
              key={card.title}
              className="bg-white p-4 flex flex-col gap-4 shadow-sm z-20"
            >
              <h2 className="text-xl font-bold">{card.title}</h2>

              <div className="grid grid-cols-2 gap-2 h-full">
                {card.images.map((img) => (
                  <img
                    key={img}
                    src={img}
                    className="w-full h-full object-cover mb-1"
                  />
                ))}
              </div>

              <Link
                href={card.category ? `${card.href}?category=${encodeURIComponent(card.category)}` : card.href}
                className="text-amazon-blue text-sm hover:underline hover:text-red-700 mt-auto"
              >
                {card.linkText}
              </Link>
            </div>
          )
        }

        if (card.type === 'single') {
          return (
            <div
              key={card.title}
              className="bg-white p-4 flex flex-col gap-4 shadow-sm z-20"
            >
              <h2 className="text-xl font-bold">{card.title}</h2>

              <div className="w-full h-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={card.image}
                  className="w-full h-full object-cover"
                />
              </div>

              <Link
                href={card.category ? `${card.href}?category=${encodeURIComponent(card.category)}` : card.href}
                className="text-amazon-blue text-sm hover:underline hover:text-red-700 mt-auto"
              >
                {card.linkText}
              </Link>
            </div>
          )
        }

        return (
          <div
            key={index}
            className="bg-white p-4 flex flex-col gap-4 shadow-sm z-20 justify-between"
          >
            <div className="shrink-0">
              <h2 className="text-xl font-bold">{card.title}</h2>
              <button className="bg-amazon-yellow w-full py-2 rounded-md shadow-sm mt-4 text-sm hover:bg-amazon-yellow_hover">
                {card.buttonText}
              </button>
            </div>

            <div className="mt-4 grow h-full">
              <img
                src={card.image}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
