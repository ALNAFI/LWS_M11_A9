'use client'

import React from 'react'
import Link from 'next/link'
import { Upload, Plus } from 'lucide-react'
import { createPageData } from '@/app/data'

const inputClassName =
  'w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue'

function renderField(field) {
  if (field.type === 'select') {
    return (
      <select key={field.label} className={inputClassName}>
        {field.options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    )
  }
  if (field.type === 'textarea') {
    return (
      <textarea
        key={field.label}
        rows={field.rows ?? 3}
        placeholder={field.placeholder}
        className={inputClassName}
      />
    )
  }
  return (
    <input
      key={field.label}
      type={field.type}
      placeholder={field.placeholder}
      className={inputClassName}
    />
  )
}

export default function CreateForm() {
  const { form } = createPageData

  return (
    <form
      action={form.action}
      method={form.method}
      encType="multipart/form-data"
      className="space-y-6"
    >
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
                  <label className="block text-sm font-bold mb-1">
                    {step.mainImage.label}
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center hover:border-amazon-blue transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2 block" />
                    <p className="text-sm text-gray-600 mb-1">{step.mainImage.hint}</p>
                    <p className="text-xs text-gray-500">{step.mainImage.formatHint}</p>
                    <input type="file" accept="image/*" className="hidden" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">
                    {step.additionalLabel}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: step.additionalSlots }, (_, i) => (
                      <div
                        key={i}
                        className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-amazon-blue transition-colors cursor-pointer aspect-square flex items-center justify-center"
                      >
                        <Plus className="w-8 h-8 text-gray-400" />
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
                    <div key={field.label}>
                      <label className="block text-sm font-bold mb-1">
                        {field.label}
                      </label>
                      {renderField(field)}
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
              className="px-6 py-2 bg-amazon-yellow hover:bg-amazon-yellow_hover border border-amazon-secondary rounded-md text-sm font-bold shadow-sm transition-colors"
            >
              {action.label}
            </button>
          )
        )}
      </div>
    </form>
  )
}
