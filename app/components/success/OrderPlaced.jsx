'use client'

import React, { useState } from 'react'
import { CheckIcon, DownloadIcon } from 'lucide-react'
import Link from 'next/link'
import { orderPlacedData } from '@/app/data'

const actionIconMap = { Download: DownloadIcon }

function downloadInvoice(orderId) {
  if (!orderId) return
  // Trigger a single download without navigating away using a hidden iframe
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = `/api/orders/${orderId}/invoice`
  document.body.appendChild(iframe)
  // Clean up after some time
  setTimeout(() => {
    if (iframe.parentNode) iframe.parentNode.removeChild(iframe)
  }, 15000)
}

function formatDate(createdAt) {
  if (!createdAt) return '—'
  return new Date(createdAt).toLocaleDateString('en-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function DownloadInvoiceButton({ order, action, IconComponent, isDownload }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const handleClick = async () => {
    if (!isDownload || !order?.id) return
    setError(null)
    setSuccess(false)
    setLoading(true)
    try {
      await downloadInvoice(order.id)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (e) {
      setError(e.message || 'Download failed')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={handleClick}
        disabled={!order?.id || loading}
        className="w-full sm:w-auto px-8 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 shadow-xs transition-colors text-center flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {IconComponent && <IconComponent className="w-4 h-4" />}
        {loading ? 'Downloading...' : action.label}
      </button>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
      {success && <p className="text-xs text-green-600 mt-1">Invoice downloaded successfully.</p>}
    </div>
  )
}

export default function OrderPlaced({ order }) {
  const { heading, confirmationMessage, actions } = orderPlacedData

  const addr = order?.shippingAddress || {}
  const addressLines = [addr.street, addr.city, addr.country].filter(Boolean)
  const shippingLabel = addr.name ? `Shipping to ${addr.name}` : 'Shipping address'
  const orderNumber = order?.orderNumber || orderPlacedData.orderNumber?.number || '—'
  const placedLabel = order?.createdAt ? `Placed on ${formatDate(order.createdAt)}` : (orderPlacedData.orderNumber?.placedLabel || '')

  return (
    <div className="flex items-start gap-4 p-6 border border-gray-300 rounded shadow-sm">
      <div className="bg-white border border-green-600 rounded-full p-1 self-start mt-1">
        <CheckIcon className="w-6 h-6 text-green-600 stroke-[3]" />
      </div>
      <div className="space-y-4 flex-1">
        <h1 className="text-xl font-bold text-green-700">{heading}</h1>
        <p className="text-sm">{confirmationMessage}</p>

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <div className="flex-1 text-sm bg-gray-50 p-4 border border-gray-200 rounded">
            <span className="font-bold block mb-1">{shippingLabel}</span>
            <p className="text-gray-600">
              {addressLines.length > 0 ? (
                addressLines.map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < addressLines.length - 1 && <br />}
                  </React.Fragment>
                ))
              ) : (
                orderPlacedData.shipping?.addressLines?.join(', ') || '—'
              )}
            </p>
            {addr.phone && <p className="text-xs text-gray-500 mt-1">Phone: {addr.phone}</p>}
          </div>
          <div className="flex-1 text-sm bg-gray-50 p-4 border border-gray-200 rounded">
            <span className="font-bold block mb-1">Order Number</span>
            <p className="text-gray-600 font-mono">{orderNumber}</p>
            <p className="text-xs text-gray-500 mt-2">{placedLabel}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-4 items-center">
          {actions.map((action) => {
            if (action.type === 'button') {
              const IconComponent = actionIconMap[action.icon]
              const isDownload = action.label === 'Download Invoice'
              return (
                <DownloadInvoiceButton
                  key={action.label}
                  order={order}
                  action={action}
                  IconComponent={IconComponent}
                  isDownload={isDownload}
                />
              )
            }
            return (
              <Link
                key={action.label}
                href={action.href}
                className={`w-full sm:w-auto px-8 py-2 rounded-md text-sm font-medium shadow-xs transition-colors text-center ${
                  action.primary
                    ? 'bg-amazon-yellow hover:bg-amazon-yellow_hover border border-amazon-secondary font-bold'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {action.label}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
