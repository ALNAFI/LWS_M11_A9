'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

const inputClassName =
  'w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary'

export default function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!token) {
      setError('Invalid reset link. Please request a new password reset.')
      return
    }
    setError('')
    setLoading(true)
    const password = e.target.password?.value
    const passwordConfirm = e.target.passwordConfirm?.value
    if (password?.length < 6) {
      setError('Password must be at least 6 characters.')
      setLoading(false)
      return
    }
    if (password !== passwordConfirm) {
      setError('Passwords do not match.')
      setLoading(false)
      return
    }
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          password,
          passwordConfirm,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong.')
        setLoading(false)
        return
      }
      setSuccess(true)
      setTimeout(() => router.push('/auth/login'), 2000)
    } catch {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  if (!token) {
    return (
      <div className="w-full max-w-[350px] p-6 a-box mb-6">
        <h1 className="text-2xl font-normal mb-2">Invalid reset link</h1>
        <p className="text-sm mb-4 text-gray-600">
          This password reset link is invalid or has expired. Please request a new one.
        </p>
        <Link
          href="/auth/forgetPassword"
          className="inline-block py-1.5 px-4 rounded-sm a-button-primary text-sm"
        >
          Request new link
        </Link>
      </div>
    )
  }

  if (success) {
    return (
      <div className="w-full max-w-[350px] p-6 a-box mb-6">
        <h1 className="text-2xl font-normal mb-2">Password reset</h1>
        <p className="text-sm text-green-700">
          Your password has been reset. Redirecting you to sign in...
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[350px] p-6 a-box mb-6">
      <h1 className="text-2xl font-normal mb-2">Create new password</h1>
      <p className="text-sm mb-4 text-gray-600">
        Enter your new password below. It must be at least 6 characters.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-sm text-sm text-red-800">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-bold mb-1">
            New password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            minLength={6}
            autoComplete="new-password"
            placeholder="At least 6 characters"
            className={inputClassName}
          />
        </div>
        <div>
          <label htmlFor="passwordConfirm" className="block text-sm font-bold mb-1">
            Re-enter password
          </label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            required
            minLength={6}
            autoComplete="new-password"
            className={inputClassName}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-1.5 rounded-sm a-button-primary text-sm shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? 'Resetting...' : 'Reset password'}
        </button>
      </form>

      <p className="mt-4 text-sm">
        <Link href="/auth/login" className="text-amazon-blue hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  )
}
