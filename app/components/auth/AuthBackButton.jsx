'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function AuthBackButton({ href = '/' }) {
  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()

    if (typeof window !== 'undefined') {
      const { history, location, document } = window
      const hasHistory = history.length > 1
      let sameOriginReferrer = false

      try {
        if (document.referrer) {
          const refUrl = new URL(document.referrer)
          sameOriginReferrer = refUrl.origin === location.origin
        }
      } catch {
        sameOriginReferrer = false
      }

      if (hasHistory && sameOriginReferrer) {
        router.back()
        return
      }
    }

    router.push(href)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 text-sm text-amazon-blue hover:text-amazon-orange hover:underline mb-4"
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </button>
  )
}
