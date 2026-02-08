'use client'

import React from 'react'

export default function DescriptionTab({ product }) {
  if (!product) return null

  const paragraphs = product.description
    ? product.description.trim().split(/\n+/).filter(Boolean)
    : []
  const features = [
    product.processor && `Processor: ${product.processor}`,
    product.ram && `RAM: ${product.ram}`,
    product.storage && `Storage: ${product.storage}`,
    product.displaySize && `Display: ${product.displaySize}`,
    product.warrantyPeriod && `Warranty: ${product.warrantyPeriod}`,
    product.otherSpecs && product.otherSpecs.trim(),
  ].filter(Boolean)

  return (
    <div className="tab-content" role="tabpanel" aria-labelledby="tab-description">
      <h2 className="text-xl font-bold mb-4">Product Description</h2>
      <div className="prose max-w-none text-sm">
        {paragraphs.length > 0 ? (
          paragraphs.map((text, index) => (
            <p key={index} className="mb-4">
              {text}
            </p>
          ))
        ) : (
          <p className="text-gray-500 mb-4">No description provided.</p>
        )}
        {features.length > 0 && (
          <>
            <h3 className="font-bold mt-6 mb-2">Key Features</h3>
            <ul className="list-disc list-inside space-y-1">
              {features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}
