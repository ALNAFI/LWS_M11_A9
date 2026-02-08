import React from 'react'
import ShopPreviewCard from './ShopPreviewCard'
import ShopInfoGrid from './ShopInfoGrid'

export default function ProfileViewMode() {
  return (
    <div className="space-y-6">
      <ShopPreviewCard />
      <ShopInfoGrid />
    </div>
  )
}
