'use client'

import React, { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { forgetPasswordData } from '@/app/data'

const inputClassName =
  'w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary'

export default function ForgetPasswordForm() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { form, successMessage } = forgetPasswordData

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setShowSuccess(false)
    setLoading(true)
    const email = e.target.email?.value?.trim()
    if (!email) {
      setError('Please enter your email address.')
      setLoading(false)
      return
    }
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong.')
        setLoading(false)
        return
      }
      setShowSuccess(true)
    } catch {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="w-full max-w-[350px] p-6 a-box mb-6">
      <h1 className="text-2xl font-normal mb-2">{form.title}</h1>
      <p className="text-sm mb-4">{form.description}</p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-sm text-sm text-red-800">
          {error}
        </div>
      )}

      <form
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
              type="email"
              id={field.id}
              name={field.id}
              required={field.required}
              autoComplete="email"
              className={inputClassName}
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-1.5 rounded-sm a-button-primary text-sm shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? 'Sending...' : form.submitLabel}
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
