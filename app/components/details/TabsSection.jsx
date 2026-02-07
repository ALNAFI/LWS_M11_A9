'use client'

import React, { useState } from 'react'
import { tabsSectionData } from '@/app/data'
import DescriptionTab from './SubTabs/DescriptionTab'
import ReviewsTab from './SubTabs/ReviewsTab'
import ShopInfoTab from './SubTabs/ShopInfoTab'
import SwitchTabs from './SubTabs/SwitchTabs'

export default function TabsSection() {
  const [activeTab, setActiveTab] = useState(tabsSectionData.tabs[0].id)

  return (
    <div className="mt-12">
      <SwitchTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'description' && <DescriptionTab />}
      {activeTab === 'reviews' && <ReviewsTab />}
      {activeTab === 'shop' && <ShopInfoTab />}
    </div>
  )
}
