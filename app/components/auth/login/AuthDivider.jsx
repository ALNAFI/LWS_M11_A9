import React from 'react'
import { loginData } from '@/app/data'

export default function AuthDivider() {
  const { divider } = loginData

  return (
    <div className="w-full max-w-[350px] mb-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-2 text-gray-500">{divider.text}</span>
        </div>
      </div>
    </div>
  )
}
