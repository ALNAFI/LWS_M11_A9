'use client'

import React from 'react'
import Link from 'next/link'
import { Upload } from 'lucide-react'
import { profilePageData } from '@/app/data'

const inputClassName =
  'w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue'

function renderEditField(field) {
  if (field.type === 'select') {
    return (
      <select key={field.name} className={inputClassName} defaultValue={field.defaultValue}>
        {field.options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    )
  }
  if (field.type === 'textarea') {
    return (
      <textarea
        key={field.name}
        name={field.name}
        rows={field.rows ?? 3}
        defaultValue={field.defaultValue}
        placeholder={field.placeholder}
        className={inputClassName}
      />
    )
  }
  return (
    <input
      key={field.name}
      type={field.type}
      name={field.name}
      defaultValue={field.defaultValue}
      placeholder={field.placeholder}
      className={inputClassName}
    />
  )
}

export default function ProfileEditForm({ onCancel }) {
  const { editSections, formActions } = profilePageData

  return (
    <form className="space-y-6">
      {editSections.map((section) => (
        <div
          key={section.id}
          className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden"
        >
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-300">
            <h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">
              {section.title}
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {section.type === 'banner' ? (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Current Banner</label>
                  <div className="h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 rounded-md border border-gray-300">
                    <img
                      src={section.currentImage}
                      className="w-full h-full object-cover"
                      alt="Current Banner"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Upload New Banner</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center hover:border-amazon-blue transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2 block" />
                    <p className="text-sm text-gray-600 mb-1">{section.uploadHint}</p>
                    <p className="text-xs text-gray-500">{section.formatHint}</p>
                    <input type="file" accept="image/*" className="hidden" />
                  </div>
                </div>
              </>
            ) : (
              section.fieldGroups.map((group, gi) => (
                <div
                  key={gi}
                  className={`grid grid-cols-1 gap-6 ${
                    group.gridCols === 2 ? 'md:grid-cols-2' : ''
                  }`}
                >
                  {group.fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-bold mb-1">
                        {field.label}
                      </label>
                      {renderEditField(field)}
                      {field.hint && (
                        <p className="text-xs text-gray-500 mt-1">{field.hint}</p>
                      )}
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      ))}

      <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
        {formActions.map((action) =>
          action.type === 'button' ? (
            <button
              key={action.label}
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-400 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              {action.label}
            </button>
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
