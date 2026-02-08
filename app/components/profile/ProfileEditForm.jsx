'use client'

import React, { useState } from 'react'
import { profilePageData } from '@/app/data'

const inputClassName =
  'w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue'

const LOCATION_OPTIONS = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh']
const SPECIALIZATION_OPTIONS = ['Laptops & PCs', 'Smartphones', 'Gaming Gear', 'Audio & Headphones', 'Cameras & Lenses', 'Wearables', 'Accessories']

function getValue(fieldName, user) {
  const map = {
    ownerName: 'name',
    phone: 'mobile',
    description: 'shopDescription',
    location: 'shopLocation',
    specialization: 'shopSpecialization',
    address: 'shopAddress',
  }
  const key = map[fieldName] || fieldName
  const v = user?.[key]
  return v ?? ''
}

export default function ProfileEditForm({ user, onCancel, onSave }) {
  const { formActions } = profilePageData
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const fd = new FormData(e.target)
    const payload = {
      name: String(fd.get('ownerName') ?? user?.name ?? '').trim(),
      mobile: String(fd.get('phone') ?? '').trim(),
      shopName: String(fd.get('shopName') ?? '').trim(),
      shopDescription: String(fd.get('description') ?? '').trim(),
      shopLocation: String(fd.get('location') ?? '').trim(),
      shopSpecialization: String(fd.get('specialization') ?? '').trim(),
      shopAddress: String(fd.get('address') ?? '').trim(),
      shopBannerImage: String(fd.get('shopBannerImage') ?? '').trim(),
      yearEstablished: fd.get('yearEstablished') !== '' ? Number(fd.get('yearEstablished')) || null : null,
      employees: fd.get('employees') !== '' ? Number(fd.get('employees')) || null : null,
      brandPartnerships: String(fd.get('brandPartnerships') ?? '').trim(),
      website: String(fd.get('website') ?? '').trim(),
    }
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to update.')
        setLoading(false)
        return
      }
      onSave?.(data.user)
    } catch {
      setError('Something went wrong.')
    }
    setLoading(false)
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-800">
          {error}
        </div>
      )}

      {/* Basic Information */}
      <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-300">
          <h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">Basic Information</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-1">Shop Name *</label>
              <input type="text" name="shopName" defaultValue={getValue('shopName', user)} className={inputClassName} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Owner Name *</label>
              <input type="text" name="ownerName" defaultValue={getValue('ownerName', user)} className={inputClassName} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-1">Email</label>
              <input type="email" name="email" defaultValue={user?.email} readOnly className={inputClassName + ' bg-gray-100'} />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed here.</p>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Phone Number</label>
              <input type="tel" name="phone" defaultValue={getValue('phone', user)} className={inputClassName} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Shop Description *</label>
            <textarea name="description" rows={4} defaultValue={getValue('description', user)} placeholder="Describe your shop" className={inputClassName} />
          </div>
        </div>
      </div>

      {/* Location & Specialization */}
      <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-300">
          <h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">Location & Specialization</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-1">City/Location *</label>
              <select name="location" className={inputClassName} defaultValue={getValue('location', user)}>
                <option value="">Select</option>
                {LOCATION_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Specialization *</label>
              <select name="specialization" className={inputClassName} defaultValue={getValue('specialization', user)}>
                <option value="">Select</option>
                {SPECIALIZATION_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Full Address *</label>
            <textarea name="address" rows={2} defaultValue={getValue('address', user)} placeholder="Full address" className={inputClassName} />
          </div>
        </div>
      </div>

      {/* Shop Banner Image */}
      <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-300">
          <h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">Shop Banner Image</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2">Banner image URL</label>
            <input
              type="url"
              name="shopBannerImage"
              defaultValue={user?.shopBannerImage ?? ''}
              placeholder="https://..."
              className={inputClassName}
            />
            <p className="text-xs text-gray-500 mt-1">Enter a direct image URL (e.g. from Unsplash or your hosting).</p>
          </div>
          {user?.shopBannerImage && (
            <div>
              <label className="block text-sm font-bold mb-2">Current Banner</label>
              <div className="h-48 overflow-hidden rounded-md border border-gray-300">
                <img src={user.shopBannerImage} className="w-full h-full object-cover" alt="Banner" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-300">
          <h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">Additional Information</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-1">Year Established</label>
              <input type="number" name="yearEstablished" defaultValue={user?.yearEstablished ?? ''} placeholder="e.g. 2014" className={inputClassName} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Number of Employees</label>
              <input type="number" name="employees" defaultValue={user?.employees ?? ''} placeholder="e.g. 25" className={inputClassName} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Official Brand Partnerships (Optional)</label>
            <input type="text" name="brandPartnerships" defaultValue={user?.brandPartnerships ?? ''} placeholder="e.g. Apple, Dell, HP" className={inputClassName} />
            <p className="text-xs text-gray-500 mt-1">Separate multiple brands with commas.</p>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Website URL (Optional)</label>
            <input type="url" name="website" defaultValue={user?.website ?? ''} placeholder="https://www.yourshop.com" className={inputClassName} />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-400 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-amazon-yellow hover:bg-amazon-yellow_hover border border-amazon-secondary rounded-md text-sm font-bold shadow-sm transition-colors disabled:opacity-70"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
