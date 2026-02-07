'use client'

import React, { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { forgetPasswordData } from '@/app/data'

export default function ForgetPasswordForm() {
  const [showSuccess, setShowSuccess] = useState(false)
  const { form, successMessage } = forgetPasswordData

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowSuccess(true)
  }

  return (
    <div className="w-full max-w-[350px] p-6 a-box mb-6">
      <h1 className="text-2xl font-normal mb-2">{form.title}</h1>
      <p className="text-sm mb-4">{form.description}</p>

      <form
        action="#"
        method="POST"
        id={form.formId}
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        {form.fields.map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="block text-sm font-bold mb-1"
            >
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.id}
              required={field.required}
              className="w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-1.5 rounded-sm a-button-primary text-sm shadow-sm"
        >
          {form.submitLabel}
        </button>
      </form>

      {showSuccess && (
        <div className="mt-4 bg-green-50 border border-green-200 p-3 rounded-sm text-xs text-green-800">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <strong>{successMessage.title}</strong>
              <p className="mt-1">{successMessage.text}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
