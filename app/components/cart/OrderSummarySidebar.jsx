import React from 'react'
import Link from 'next/link'
import {
  CheckCircleIcon,
  ShieldCheckIcon,
  TruckIcon,
} from 'lucide-react'
import { orderSummaryData } from '@/app/data'

const subtotalBoxIcon = {
  ShieldCheck: ShieldCheckIcon,
  Truck: TruckIcon,
}

export default function OrderSummarySidebar() {
  const {
    freeShipping,
    subtotal,
    giftOption,
    checkoutButton,
    footerItems,
  } = orderSummaryData

  return (
    <div className="lg:w-80">
      <div className="bg-white p-4 border border-gray-300 rounded">
        <div className="mb-4">
          <p className="text-sm mb-2">
            <CheckCircleIcon className="w-4 h-4 inline text-green-600 mr-1" />
            <span className="text-green-700 font-medium">
              {freeShipping.text}
            </span>
          </p>
        </div>

        <div className="mb-4">
          <p className="text-lg mb-1">
            Subtotal ({subtotal.itemCount} items):
            <span className="font-bold text-amazon-orange">
              {subtotal.amount}
            </span>
          </p>
          <div className="flex items-start gap-2 text-xs">
            <input
              type="checkbox"
              id={giftOption.id}
              className="mt-0.5"
            />
            <label htmlFor={giftOption.id} className="text-gray-700">
              {giftOption.label}
            </label>
          </div>
        </div>

        <Link
          href={checkoutButton.href}
          className="w-full block text-center py-2 bg-amazon-yellow hover:bg-amazon-yellow_hover border border-amazon-secondary rounded-md text-sm font-bold shadow-sm transition-colors mb-2"
        >
          {checkoutButton.label}
        </Link>

        <div className="text-xs text-gray-600 mt-4">
          {footerItems.map((item) => {
            const IconComponent = subtotalBoxIcon[item.icon]
            return (
              <p key={item.text} className={item.icon === 'Truck' ? '' : 'mb-2'}>
                {IconComponent && (
                  <IconComponent className="w-3 h-3 inline mr-1" />
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
