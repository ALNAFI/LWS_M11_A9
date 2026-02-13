'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Download, XCircle } from 'lucide-react'

const iconMap = {
  Download,
  XCircle,
}

function downloadInvoice(orderId) {
  if (!orderId) return
  // Trigger a single download without navigating away using a hidden iframe
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = `/api/orders/${orderId}/invoice`
  document.body.appendChild(iframe)
  setTimeout(() => {
    if (iframe.parentNode) iframe.parentNode.removeChild(iframe)
  }, 15000)
}

export default function OrderProductActions({ actions }) {
  const router = useRouter()
  const [downloadingId, setDownloadingId] = useState(null)
  const [successOrderId, setSuccessOrderId] = useState(null)

  const handleClick = async (action) => {
    if (action.actionType === 'print') {
      window.print()
    }
    if (action.actionType === 'download' && action.orderId) {
      setDownloadingId(action.orderId)
      setSuccessOrderId(null)
      try {
        await downloadInvoice(action.orderId)
        setSuccessOrderId(action.orderId)
        setTimeout(() => setSuccessOrderId(null), 3000)
      } catch (_) {}
      setDownloadingId(null)
    }
    if (action.actionType === 'review' && action.productId) {
      router.push(`/details?productId=${action.productId}&review=1`)
    }
  }

  return (
    <div className="flex flex-wrap gap-2 mt-4 items-center">
      {actions.map((action) => {
        const IconComponent = action.icon ? iconMap[action.icon] : null
        const isDanger = action.variant === 'danger'
        if (action.actionType === 'review' && action.productId) {
          return (
            <Link
              key={action.label}
              href={`/details?productId=${action.productId}&review=1`}
              className="px-4 py-1.5 rounded-md text-xs border border-gray-300 hover:bg-gray-50 inline-flex items-center gap-1"
            >
              {action.label}
            </Link>
          )
        }
        return (
          <button
            key={action.label}
            type="button"
            onClick={() => handleClick(action)}
            disabled={action.actionType === 'download' && downloadingId === action.orderId}
            className={`px-4 py-1.5 rounded-md text-xs flex items-center gap-1 disabled:opacity-50 ${
              isDanger
                ? 'border border-red-300 bg-red-50 text-red-700 hover:bg-red-100'
                : 'border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {IconComponent && <IconComponent className="w-3 h-3" />}
            {action.actionType === 'download' && downloadingId === action.orderId ? 'Downloading...' : action.label}
          </button>
        )
      })}
      {successOrderId && (
        <span className="text-xs text-green-600 ml-1">Invoice downloaded successfully.</span>
      )}
    </div>
  )
}
