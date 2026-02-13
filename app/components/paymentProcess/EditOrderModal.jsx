'use client'

import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export default function EditOrderModal({ isOpen, onClose, address: initialAddress, checkoutItems: initialItems, onSave }) {
  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    country: '',
    phone: '',
  })
  const [errors, setErrors] = useState({})
  const [quantities, setQuantities] = useState({})

  useEffect(() => {
    if (initialAddress && typeof initialAddress === 'object') {
      setAddress({
        name: initialAddress.name ?? '',
        street: initialAddress.street ?? '',
        city: initialAddress.city ?? '',
        country: initialAddress.country ?? '',
        phone: initialAddress.phone ?? '',
      })
    } else if (isOpen) {
      // First time / no saved address: keep fields empty and rely on placeholders
      setAddress({
        name: '',
        street: '',
        city: '',
        country: '',
        phone: '',
      })
    }
  }, [initialAddress, isOpen])

  useEffect(() => {
    if (Array.isArray(initialItems)) {
      const q = {}
      initialItems.forEach((i) => {
        q[i.id] = i.quantity ?? 1
      })
      setQuantities(q)
    }
  }, [initialItems, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()

    const nextErrors = {}
    if (!address.name.trim()) nextErrors.name = 'Full name is required.'
    if (!address.street.trim()) nextErrors.street = 'Street address is required.'
    if (!address.city.trim()) nextErrors.city = 'City / postal code is required.'
    if (!address.country.trim()) nextErrors.country = 'Country is required.'
    if (!address.phone.trim()) {
      nextErrors.phone = 'Phone number is required.'
    } else if (!/^[0-9]+$/.test(address.phone.trim())) {
      nextErrors.phone = 'Phone number must contain only digits.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const updatedItems = (initialItems || []).map((i) => ({
      ...i,
      quantity: Math.max(1, Math.floor(Number(quantities[i.id]) || 1)),
    }))
    onSave({ address, checkoutItems: updatedItems })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">
            {initialAddress && Object.values(initialAddress || {}).some((v) => v)
              ? 'Edit Address Details'
              : 'Add Address Details'}
          </h2>
          <button type="button" onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto flex-1 space-y-6">
          <div>
            <h3 className="font-medium mb-2">Delivery address</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full name"
                value={address.name}
                onChange={(e) => setAddress((a) => ({ ...a, name: e.target.value }))}
                className={`w-full border rounded px-3 py-2 text-sm ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
              <input
                type="text"
                placeholder="Street address"
                value={address.street}
                onChange={(e) => setAddress((a) => ({ ...a, street: e.target.value }))}
                className={`w-full border rounded px-3 py-2 text-sm ${
                  errors.street ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.street && <p className="text-xs text-red-600">{errors.street}</p>}
              <input
                type="text"
                placeholder="City, postal code"
                value={address.city}
                onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))}
                className={`w-full border rounded px-3 py-2 text-sm ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.city && <p className="text-xs text-red-600">{errors.city}</p>}
              <input
                type="text"
                placeholder="Country"
                value={address.country}
                onChange={(e) => setAddress((a) => ({ ...a, country: e.target.value }))}
                className={`w-full border rounded px-3 py-2 text-sm ${
                  errors.country ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.country && <p className="text-xs text-red-600">{errors.country}</p>}
              <input
                type="text"
                placeholder="Phone"
                value={address.phone}
                onChange={(e) => setAddress((a) => ({ ...a, phone: e.target.value }))}
                className={`w-full border rounded px-3 py-2 text-sm ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Product quantities</h3>
            <div className="space-y-2">
              {(initialItems || []).map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 border-b border-gray-100 pb-2">
                  <span className="text-sm truncate flex-1">{item.title}</span>
                  <select
                    value={quantities[item.id] ?? item.quantity ?? 1}
                    onChange={(e) => setQuantities((q) => ({ ...q, [item.id]: Number(e.target.value) }))}
                    className="border border-gray-300 rounded px-2 py-1 text-sm w-20"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button type="submit" className="flex-1 bg-amazon-secondary text-white py-2 rounded text-sm font-medium hover:bg-amazon-secondary_hover">
              Save changes
            </button>
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded text-sm">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
