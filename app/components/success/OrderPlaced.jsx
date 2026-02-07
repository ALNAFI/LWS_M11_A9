import React from 'react'
import { CheckIcon, DownloadIcon } from 'lucide-react'
import Link from 'next/link'
import { orderPlacedData } from '@/app/data'

const actionIconMap = {
  Download: DownloadIcon,
}

export default function OrderPlaced() {
  const { heading, confirmationMessage, shipping, orderNumber, actions } =
    orderPlacedData

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
            <span className="font-bold block mb-1">{shipping.label}</span>
            <p className="text-gray-600">
              {shipping.addressLines.map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < shipping.addressLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          </div>
          <div className="flex-1 text-sm bg-gray-50 p-4 border border-gray-200 rounded">
            <span className="font-bold block mb-1">{orderNumber.label}</span>
            <p className="text-gray-600 font-mono">{orderNumber.number}</p>
            <p className="text-xs text-gray-500 mt-2">{orderNumber.placedLabel}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-4 items-center">
          {actions.map((action) => {
            if (action.type === 'button') {
              const IconComponent = actionIconMap[action.icon]
              return (
                <button
                  key={action.label}
                  type="button"
                  className="w-full sm:w-auto px-8 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 shadow-xs transition-colors text-center flex items-center justify-center gap-2"
                >
                  {IconComponent && <IconComponent className="w-4 h-4" />}
                  {action.label}
                </button>
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
