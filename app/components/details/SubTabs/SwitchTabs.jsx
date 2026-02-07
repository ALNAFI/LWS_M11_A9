'use client'

import { tabsSectionData } from '@/app/data'

export default function SwitchTabs({ activeTab, onTabChange }) {
  return (
    <div className="border-b border-gray-300 mb-6">
      <div className="flex gap-8">
        {tabsSectionData.tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`tab-button pb-2 px-1 text-sm font-medium ${
              activeTab === tab.id
                ? 'tab-active'
                : 'text-gray-600 hover:text-amazon-orange'
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
