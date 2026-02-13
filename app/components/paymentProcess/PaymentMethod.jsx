'use client'

import React, { useState, useEffect } from 'react'
import { paymentMethodData } from '@/app/data'

const PAYMENT_METHOD_STORAGE_KEY = 'gadgetsbd_payment_method'

export default function PaymentMethod({ checkoutItems = [], orderError, onPlaceOrder }) {
  const [card, setCard] = useState({
    name: '',
    number: '',
    cvv: '',
  })
  const [errors, setErrors] = useState({})

  // Load last-used (non-sensitive) payment info, e.g. cardholder name
  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined'
        ? sessionStorage.getItem(PAYMENT_METHOD_STORAGE_KEY)
        : null
      if (!raw) return
      const saved = JSON.parse(raw)
      if (saved && typeof saved === 'object') {
        setCard((prev) => ({
          ...prev,
          name: saved.name ?? prev.name,
        }))
      }
    } catch {
      // ignore corrupt storage
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!onPlaceOrder || checkoutItems.length === 0) return

    const nextErrors = {}
    const name = card.name.trim()
    const numberRaw = card.number.replace(/\s|-/g, '')
    const cvv = card.cvv.trim()

    if (!name) {
      nextErrors.name = 'Name on card is required.'
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      nextErrors.name = 'Name on card should contain only letters and spaces.'
    }

    if (!numberRaw) {
      nextErrors.number = 'Card number is required.'
    } else if (!/^[0-9]+$/.test(numberRaw)) {
      nextErrors.number = 'Card number must contain only digits.'
    } else if (numberRaw.length !== 16) {
      nextErrors.number = 'Card number must be 16 digits.'
    }

    if (!cvv) {
      nextErrors.cvv = 'CVV is required.'
    } else if (!/^[0-9]+$/.test(cvv)) {
      nextErrors.cvv = 'CVV must contain only digits.'
    } else if (cvv.length !== 3) {
      nextErrors.cvv = 'CVV must be 3 digits.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    // Persist non-sensitive choice so it's pre-filled next time
    try {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(
          PAYMENT_METHOD_STORAGE_KEY,
          JSON.stringify({ name: card.name.trim() })
        )
      }
    } catch {
      // ignore storage errors
    }

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
              className="flex items-start gap-3 p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-amazon-background transition-colors bg-gray-50  ring-1 ring-amazon-orange"
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
                value={card.name}
                onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))}
                className={`w-full max-w-sm px-2 py-1 border rounded-sm text-sm outline-none focus:ring-1 focus:ring-amazon-blue ${
                  errors.name ? 'border-red-500' : 'border-gray-400'
                }`}
              />
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="text-xs font-bold block mb-1">
                  Card number
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="0000 0000 0000 0000"
                  maxLength={19} // 16 digits + 3 spaces
                  value={card.number.replace(/(\d{4})(?=\d)/g, '$1 ')}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, '').slice(0, 16)
                    setCard((c) => ({ ...c, number: digits }))
                  }}
                  className={`w-full px-2 py-1 border rounded-sm text-sm outline-none focus:ring-1 focus:ring-amazon-blue ${
                    errors.number ? 'border-red-500' : 'border-gray-400'
                  }`}
                />
                {errors.number && <p className="text-xs text-red-600 mt-1">{errors.number}</p>}
              </div>

              <div className="w-24">
                <label className="text-xs font-bold block mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="123"
                  maxLength={3}
                  value={card.cvv}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, '').slice(0, 3)
                    setCard((c) => ({ ...c, cvv: v }))
                  }}
                  className={`w-full px-2 py-1 border rounded-sm text-sm outline-none focus:ring-1 focus:ring-amazon-blue ${
                    errors.cvv ? 'border-red-500' : 'border-gray-400'
                  }`}
                />
                {errors.cvv && <p className="text-xs text-red-600 mt-1">{errors.cvv}</p>}
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
