import React from 'react'

const FIELDS = [
  { label: 'Shop Name', key: 'shopName' },
  { label: 'Owner Name', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Phone Number', key: 'mobile' },
  { label: 'Location', key: 'shopLocation' },
  { label: 'Specialization', key: 'shopSpecialization' },
  { label: 'Shop Description', key: 'shopDescription', colSpan: 2 },
  { label: 'Address', key: 'shopAddress', colSpan: 2 },
  { label: 'Year Established', key: 'yearEstablished' },
  { label: 'Employees', key: 'employees' },
  { label: 'Brand Partnerships', key: 'brandPartnerships', colSpan: 2 },
  { label: 'Website', key: 'website', colSpan: 2 },
]

export default function ShopInfoGrid({ user }) {
  return (
    <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-300">
        <h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">
          Shop Information
        </h2>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {FIELDS.map((field) => {
          const value = user?.[field.key] ?? '—'
          return (
            <div
              key={field.label}
              className={field.colSpan === 2 ? 'md:col-span-2' : ''}
            >
              <label className="block text-xs text-gray-500 mb-1">{field.label}</label>
              <p className="font-medium">{value}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
