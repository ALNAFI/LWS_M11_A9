'use client'

import React from 'react'
import Image from 'next/image'
import { TruckIcon, ShieldCheckIcon } from 'lucide-react'
import { paymentOrderSummaryData } from '@/app/data'
import Link from 'next/link'

const footerIconMap = {
  Truck: TruckIcon,
  ShieldCheck: ShieldCheckIcon,
}

export default function OrderSummary({
  checkoutItems = [],
  itemsCount,
  itemsSubtotal,
  deliveryFee = 0,
  serviceFee = 500,
  orderTotal,
  submitDisabled = false,
}) {
  const {
    formId,
    submitButton,
    disclaimer,
    title,
    footerItems,
  } = paymentOrderSummaryData

  const useDynamic = itemsCount != null && itemsSubtotal != null
  const subtotalDisplay = useDynamic
    ? `৳${itemsSubtotal.toLocaleString('en-BD')}`
    : paymentOrderSummaryData.rows?.[0]?.value ?? '—'
  const deliveryDisplay = deliveryFee === 0 ? 'FREE' : `৳${deliveryFee.toLocaleString('en-BD')}`
  const feeDisplay = useDynamic ? `৳${serviceFee.toLocaleString('en-BD')}` : '৳500'
  const totalDisplay = useDynamic
    ? `৳${(orderTotal ?? itemsSubtotal + deliveryFee + serviceFee).toLocaleString('en-BD')}`
    : paymentOrderSummaryData.rows?.find((r) => r.total)?.value ?? '—'

  const rows = useDynamic
    ? [
        { label: `Items (${itemsCount}):`, value: subtotalDisplay },
        { label: 'Delivery Fee:', value: deliveryDisplay, valueClassName: deliveryFee === 0 ? 'text-green-600 font-bold' : '' },
        { label: 'Service Fee:', value: feeDisplay, borderBottom: true },
        { label: 'Order Total:', value: totalDisplay, total: true },
      ]
    : paymentOrderSummaryData.rows

  return (
    <div className="w-full">
      <div className="box p-4 sticky top-10">
        <button
          type="submit"
          form={formId}
          disabled={submitDisabled}
          className="w-full py-2 mb-4 rounded-md btn-primary text-sm font-normal shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitDisabled ? 'Placing order...' : submitButton.label}
        </button>

        <p className="text-[10px] text-gray-500 text-center mb-4 border-b border-gray-300 pb-4 leading-tight">
          {disclaimer.text}{' '}
          {disclaimer.links.map((link, i) => (
            <React.Fragment key={link.label}>
              <Link
                href={link.href}
                className="text-amazon-blue text-xs hover:underline hover:text-amazon-orange"
              >
                {link.label}
              </Link>
              {i < disclaimer.links.length - 1 && ' and '}
            </React.Fragment>
          ))}
          {disclaimer.suffix}
        </p>

        <h3 className="font-bold text-lg mb-2">{title}</h3>
        {checkoutItems.length > 0 && (
          <div className="mb-4 space-y-2 max-h-40 overflow-y-auto">
            {checkoutItems.map((item) => (
              <div key={item.id} className="flex gap-2 text-xs text-gray-600">
                <div className="relative w-10 h-10 flex-shrink-0 bg-gray-50 rounded overflow-hidden">
                  {item.image ? <Image src={item.image} alt="" fill sizes="40px" className="object-cover" /> : null}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-gray-800">{item.title}</p>
                  <p>Qty: {item.quantity ?? 1} × ৳{(item.price || 0).toLocaleString('en-BD')}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="space-y-2 text-xs text-gray-600 border-t border-gray-200 pt-2">
          {rows.map((row) => (
            <div
              key={row.label}
              className={`flex justify-between ${row.borderBottom ? 'border-b border-gray-200 pb-2' : ''} ${row.total ? 'text-amazon-orange text-lg font-bold pt-2' : ''}`}
            >
              <span>{row.label}</span>
              <span className={row.valueClassName ?? ''}>{row.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 text-xs">
          {footerItems.map((item) => {
            const IconComponent = footerIconMap[item.icon]
            return (
              <p key={item.text} className={item.className}>
                {IconComponent && (
                  <IconComponent className="w-4 h-4 inline mr-1" />
                )}
                {item.text}
              </p>
            )
          })}
        </div>
      </div>
    </div>
  )
}
