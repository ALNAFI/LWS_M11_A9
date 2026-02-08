import React from 'react'
import { shopPageData } from '@/app/data'

export default function ShopPageIntro() {
  const { intro } = shopPageData

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold">{intro.title}</h1>
      <p className="text-sm text-gray-600">{intro.subtitle}</p>
    </div>
  )
}
