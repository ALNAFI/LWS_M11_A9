'use client'

import React from 'react'
import { Download, XCircle } from 'lucide-react'

const iconMap = {
  Download,
  XCircle,
}

export default function OrderProductActions({ actions }) {
  const handleClick = (action) => {
    if (action.actionType === 'print') {
      window.print()
    }
  }

  return (
    <div className="flex gap-2 mt-4">
      {actions.map((action) => {
        const IconComponent = action.icon ? iconMap[action.icon] : null
        const isDanger = action.variant === 'danger'
        return (
          <button
            key={action.label}
            type="button"
            onClick={() => handleClick(action)}
            className={`px-4 py-1.5 rounded-md text-xs flex items-center gap-1 ${
              isDanger
                ? 'border border-red-300 bg-red-50 text-red-700 hover:bg-red-100'
                : 'border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {IconComponent && <IconComponent className="w-3 h-3" />}
            {action.label}
          </button>
        )
      })}
    </div>
  )
}
