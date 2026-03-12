'use client'

import React from 'react'
import Link from 'next/link'
import { CheckCircleIcon } from 'lucide-react'

export default function ShopInfoTab({ shop }) {
  if (!shop) {
    return (
      <div className="tab-content" role="tabpanel" aria-labelledby="tab-shop">
        <h2 className="text-xl font-bold mb-4">Shop Information</h2>
        <p className="text-gray-500">Shop information is not available.</p>
      </div>
    )
  }

  const policies = [
    'Secure payment options',
    'Ships from Gadget Hub',
  ]
  if (shop.description) policies.unshift(shop.description)

  return (
    <div className="tab-content" role="tabpanel" aria-labelledby="tab-shop">
      <h2 className="text-xl font-bold mb-4">Shop Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold mb-2">{shop.name}</h3>
          <p className="text-sm text-gray-600 mb-4">{shop.description || 'No description.'}</p>
          <div className="space-y-2 text-sm">
            <p><span className="font-bold">Location:</span> {shop.location || '—'}</p>
            <p><span className="font-bold">Specialization:</span> {shop.specializesIn || '—'}</p>
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-2">Policies</h3>
          <div className="space-y-2 text-sm">
            {policies.map((policy, index) => (
              <p key={index}>
                <CheckCircleIcon className="w-4 h-4 inline text-green-600 mr-1" />
                {policy}
              </p>
            ))}
          </div>
          <Link
            href={`/shop/${shop.id}`}
            className="inline-block mt-4 text-amazon-blue hover:underline text-sm"
          >
            Visit Shop Page →
          </Link>
        </div>
      </div>
    </div>
  )
}
