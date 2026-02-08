'use client'

import React, { useState } from 'react'
import { Star, Camera } from 'lucide-react'
import { reviewPageData } from '@/app/data'

const inputClassName =
  'w-full border border-gray-300 rounded p-2 outline-none focus:ring-1 focus:ring-amazon-blue'
const textareaClassName =
  'w-full border border-gray-300 rounded p-4 outline-none focus:ring-1 focus:ring-amazon-blue'

export default function ReviewForm() {
  const [rating, setRating] = useState(0)
  const { form } = reviewPageData
  const { starCount, sections, submitLabel } = form

  return (
    <form className="space-y-10">
      {sections.map((section, index) => (
        <React.Fragment key={section.id}>
          {index > 0 && <hr className="border-gray-200" />}

          {section.type === 'rating' && (
            <section className="space-y-4">
              <h3 className="text-xl font-bold">{section.title}</h3>
              <div className="flex items-center gap-2">
                {Array.from({ length: starCount }, (_, i) => i + 1).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    className="group transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        value <= rating
                          ? 'text-amazon-yellow fill-amazon-yellow'
                          : 'text-gray-300 group-hover:text-amazon-yellow'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </section>
          )}

          {section.type === 'photo' && (
            <section className="space-y-4">
              <h3 className="text-xl font-bold">{section.title}</h3>
              {section.description && (
                <p className="text-sm">{section.description}</p>
              )}
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-amazon-blue transition-colors gap-2">
                <Camera className="w-8 h-8 text-gray-400" />
                <span className="text-xs text-gray-500">{section.uploadLabel}</span>
              </div>
            </section>
          )}

          {section.type === 'headline' && (
            <section className="space-y-4">
              <h3 className="text-xl font-bold">{section.title}</h3>
              <input
                type="text"
                placeholder={section.placeholder}
                className={inputClassName}
              />
            </section>
          )}

          {section.type === 'written' && (
            <section className="space-y-4">
              <h3 className="text-xl font-bold">{section.title}</h3>
              <textarea
                rows={section.rows ?? 6}
                placeholder={section.placeholder}
                className={textareaClassName}
              />
            </section>
          )}
        </React.Fragment>
      ))}

      <div className="border-t border-gray-200 pt-8 flex justify-end">
        <button
          type="submit"
          className="bg-amazon-yellow hover:bg-amazon-yellow_hover px-8 py-2 rounded-md shadow-sm border border-amazon-secondary font-bold"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
