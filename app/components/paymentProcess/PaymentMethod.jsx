'use client'

import React from 'react'
import { paymentMethodData } from '@/app/data'

export default function PaymentMethod({ checkoutItems = [], orderError, onPlaceOrder }) {
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!onPlaceOrder || checkoutItems.length === 0) return
    await onPlaceOrder()
  }

  return (
    <div className="pb-6">
      <div className="flex items-center mb-6">
        <span className="section-number mr-4">
          {paymentMethodData.step}
        </span>
        <span className="font-bold text-lg text-amazon-orange">
          {paymentMethodData.title}
        </span>
      </div>

      {orderError && (
        <p className="text-red-600 text-sm mb-4">{orderError}</p>
      )}

      <form
        id="paymentForm"
        onSubmit={handleSubmit}
        className="box p-6 space-y-6 shadow-sm"
      >
        <div className="space-y-4">
          {paymentMethodData.methods.map((method) => (
            <label
              key={method.id}
              className="flex items-start gap-3 p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-amazon-background transition-colors bg-gray-50 border-amazon-orange ring-1 ring-amazon-orange"
            >
              <div>
                <span className="font-bold block text-sm">
                  {method.label}
                </span>
                <div className="flex gap-2 mt-2">
                  {method.logos.map((logo) => (
                    <img
                      key={logo.alt}
                      src={logo.src}
                      className="h-4"
                      alt={logo.alt}
                    />
                  ))}
                </div>
              </div>
            </label>
          ))}

          <div id="cardInputs" className="pl-8 space-y-4">
            <div>
              <label className="text-xs font-bold block mb-1">
                Name on card
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full max-w-sm px-2 py-1 border border-gray-400 rounded-sm text-sm outline-none focus:ring-1 focus:ring-amazon-blue"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="text-xs font-bold block mb-1">
                  Card number
                </label>
                <input
                  type="text"
                  placeholder="#### #### #### ####"
                  className="w-full px-2 py-1 border border-gray-400 rounded-sm text-sm outline-none focus:ring-1 focus:ring-amazon-blue"
                />
              </div>

              <div className="w-24">
                <label className="text-xs font-bold block mb-1">
                  CVV
                </label>
                <input
                  type="password"
                  placeholder="***"
                  className="w-full px-2 py-1 border border-gray-400 rounded-sm text-sm outline-none focus:ring-1 focus:ring-amazon-blue"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold block mb-1">
                Expiration date
              </label>
              <div className="flex gap-2">
                <select className="bg-gray-100 border border-gray-300 rounded p-1 text-xs">
                  {paymentMethodData.months.map((month) => (
                    <option key={month}>{month}</option>
                  ))}
                </select>

                <select className="bg-gray-100 border border-gray-300 rounded p-1 text-xs">
                  {paymentMethodData.years.map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-200"></div>
        </div>
      </form>
    </div>
  )
}
