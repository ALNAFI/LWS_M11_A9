'use client'

import React, { useState } from 'react'
import { Eye, Pencil } from 'lucide-react'
import { profilePageData } from '@/app/data'
import ProfileViewMode from './ProfileViewMode'
import ProfileEditForm from './ProfileEditForm'

const iconMap = { Eye, Pencil }

export default function ProfileContent() {
  const [isEditMode, setIsEditMode] = useState(false)
  const { pageIntro } = profilePageData

  return (
    <>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-normal">{pageIntro.title}</h1>
          <p className="text-sm text-gray-600">{pageIntro.subtitle}</p>
        </div>
        <div className="flex gap-2">
          {pageIntro.modeButtons.map((btn) => {
            const IconComponent = iconMap[btn.icon]
            const active = btn.id === 'edit' ? isEditMode : !isEditMode
            return (
              <button
                key={btn.id}
                type="button"
                onClick={() => setIsEditMode(btn.id === 'edit')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                  btn.id === 'edit'
                    ? active
                      ? 'bg-amazon-yellow hover:bg-amazon-yellow_hover border border-amazon-secondary font-bold'
                      : 'bg-white border border-gray-300 hover:bg-gray-50'
                    : active
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : 'bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {IconComponent && <IconComponent className="w-4 h-4 inline mr-1" />}
                {btn.label}
              </button>
            )
          })}
        </div>
      </div>

      {isEditMode ? (
        <ProfileEditForm onCancel={() => setIsEditMode(false)} />
      ) : (
        <ProfileViewMode />
      )}
    </>
  )
}
