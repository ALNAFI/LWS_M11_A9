import React from 'react'
import ShopPreviewCard from './ShopPreviewCard'
import ShopInfoGrid from './ShopInfoGrid'

export default function ProfileViewMode({ user }) {
  return (
    <div className="space-y-6">
      <ShopPreviewCard user={user} />
      <ShopInfoGrid user={user} />
    </div>
  )
}
