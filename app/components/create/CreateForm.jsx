'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createPageData } from '@/app/data'
import ImageUpload from '@/app/components/common/ImageUpload'

const inputClassName =
  'w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue'

function renderField(field, defaultValues = {}) {
  const name = field.name || field.label.replace(/\s+/g, '_').toLowerCase()
  const defaultValue = defaultValues[name] ?? defaultValues[field.name]
  const attrs = { name, className: inputClassName, required: !!field.required }
  if (defaultValue !== undefined && defaultValue !== '') attrs.defaultValue = defaultValue
  if (field.type === 'select') {
    return (
      <select key={field.name || field.label} {...attrs}>
        <option value="">Select</option>
        {field.options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    )
  }
  if (field.type === 'textarea') {
    return (
      <textarea
        key={field.name || field.label}
        rows={field.rows ?? 3}
        placeholder={field.placeholder}
        {...attrs}
      />
    )
  }
  return (
    <input
      key={field.name || field.label}
      type={field.type}
      placeholder={field.placeholder}
      {...attrs}
    />
  )
}

export default function CreateForm({ initialProduct, productId }) {
  const router = useRouter()
  const { form } = createPageData
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const isEdit = Boolean(productId && initialProduct)
  const defaultValues = isEdit && initialProduct ? {
    productName: initialProduct.productName,
    category: initialProduct.category,
    brand: initialProduct.brand,
    condition: initialProduct.condition,
    description: initialProduct.description,
    price: initialProduct.price,
    stockQuantity: initialProduct.stockQuantity,
    sku: initialProduct.sku,
    availability: initialProduct.availability,
    warrantyPeriod: initialProduct.warrantyPeriod,
    mainImageUrl: initialProduct.mainImageUrl,
    processor: initialProduct.processor,
    ram: initialProduct.ram,
    storage: initialProduct.storage,
    displaySize: initialProduct.displaySize,
    otherSpecs: initialProduct.otherSpecs,
    additionalImageUrl1: initialProduct.additionalImageUrls?.[0],
    additionalImageUrl2: initialProduct.additionalImageUrls?.[1],
    additionalImageUrl3: initialProduct.additionalImageUrls?.[2],
    additionalImageUrl4: initialProduct.additionalImageUrls?.[3],
  } : {}

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const fd = new FormData(e.target)

    const price = Number(fd.get('price'))
    const stockQuantity = Number(fd.get('stockQuantity'))
    if (isNaN(price) || price < 0) {
      setError('Please enter a valid price.')
      setLoading(false)
      return
    }
    if (isNaN(stockQuantity) || stockQuantity < 0) {
      setError('Please enter a valid stock quantity.')
      setLoading(false)
      return
    }

    const additionalImageUrls = [1, 2, 3, 4]
      .map((i) => fd.get(`additionalImageUrl${i}`))
      .filter((u) => u && String(u).trim())
      .map((u) => String(u).trim())

    const payload = {
      productName: fd.get('productName')?.trim() || '',
      category: fd.get('category')?.trim() || '',
      brand: fd.get('brand')?.trim() || '',
      condition: fd.get('condition')?.trim() || 'New',
      description: fd.get('description')?.trim() || '',
      price,
      stockQuantity,
      sku: fd.get('sku')?.trim() || '',
      availability: fd.get('availability')?.trim() || 'In Stock',
      warrantyPeriod: fd.get('warrantyPeriod')?.trim() || '',
      mainImageUrl: fd.get('mainImageUrl')?.trim() || '',
      additionalImageUrls,
      processor: fd.get('processor')?.trim() || '',
      ram: fd.get('ram')?.trim() || '',
      storage: fd.get('storage')?.trim() || '',
      displaySize: fd.get('displaySize')?.trim() || '',
      otherSpecs: fd.get('otherSpecs')?.trim() || '',
    }

    try {
      const url = isEdit ? `/api/products/${productId}` : '/api/products'
      const method = isEdit ? 'PATCH' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || (isEdit ? 'Failed to update product.' : 'Failed to create product.'))
        setLoading(false)
        return
      }
      router.push('/manageList')
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-800">
          {error}
        </div>
      )}

      {form.steps.map((step) => (
        <div
          key={step.id}
          className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden"
        >
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-300">
            <h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">
              {step.title}
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {step.type === 'images' ? (
              <>
                <div>
                  <ImageUpload
                    name="mainImageUrl"
                    defaultValue={defaultValues.mainImageUrl}
                    label={step.mainImage.label}
                    hint={`${step.mainImage.formatHint} (Upload via ImageKit or enter image URL)`}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">
                    {step.additionalLabel}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i}>
                        <ImageUpload
                          name={`additionalImageUrl${i}`}
                          defaultValue={defaultValues[`additionalImageUrl${i}`]}
                          placeholder={`Image ${i} URL`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              step.fieldGroups.map((group, gi) => (
                <div
                  key={gi}
                  className={`grid grid-cols-1 gap-6 ${
                    group.gridCols === 2
                      ? 'md:grid-cols-2'
                      : group.gridCols === 3
                        ? 'md:grid-cols-3'
                        : ''
                  }`}
                >
                  {group.fields.map((field) => (
                    <div key={field.name || field.label}>
                      <label className="block text-sm font-bold mb-1">
                        {field.label}
                        {field.required && <span className="text-red-600 ml-0.5">*</span>}
                      </label>
                      {renderField(field, defaultValues)}
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      ))}

      <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
        {form.actions.map((action) =>
          action.type === 'button' ? (
            <Link
              key={action.label}
              href={action.href}
              className="px-6 py-2 border border-gray-400 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors text-center"
            >
              {action.label}
            </Link>
          ) : (
            <button
              key={action.label}
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-amazon-yellow hover:bg-amazon-yellow_hover border border-amazon-secondary rounded-md text-sm font-bold shadow-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (isEdit ? 'Saving...' : 'Publishing...') : (isEdit ? 'Save Changes' : action.label)}
            </button>
          )
        )}
      </div>
    </form>
  )
}
