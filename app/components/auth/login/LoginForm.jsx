'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronRight, Eye, EyeOff } from 'lucide-react'
import { loginData } from '@/app/data'
import ContinueWithGoogle from '@/app/components/auth/ContinueWithGoogle'

const inputClassName =
  'w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary'

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { form, disclaimer, helpLink } = loginData
  const redirect = searchParams.get('redirect')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const fd = new FormData(e.target)
    const email = fd.get('email')
    const password = fd.get('password')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Login failed.')
        setLoading(false)
        return
      }
      const isShopOwner = data.user?.userType === 'shopOwner'
      const defaultUrl = isShopOwner ? '/profile' : '/'
      router.push(redirect || defaultUrl)
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[350px] p-6 a-box mb-6">
      <h1 className="text-2xl font-normal mb-4">{form.title}</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-sm text-sm text-red-800">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {form.fields.map((field) => (
          <div key={field.id}>
            {field.rightLink ? (
              <div className="flex justify-between mb-1">
                <label
                  htmlFor={field.id}
                  className="text-sm font-bold"
                >
                  {field.label}
                </label>
                <Link
                  href={field.rightLink.href}
                  className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline"
                >
                  {field.rightLink.label}
                </Link>
              </div>
            ) : (
              <label
                htmlFor={field.id}
                className="block text-sm font-bold mb-1"
              >
                {field.label}
              </label>
            )}
            {field.type === 'password' ? (
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id={field.id}
                  name={field.id}
                  required={field.required}
                  className={`${inputClassName} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            ) : (
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                required={field.required}
                className={inputClassName}
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-1.5 a-button-primary text-sm font-medium rounded-sm cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing in...' : form.submitLabel}
        </button>
      </form>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-2 text-gray-500">or</span>
        </div>
      </div>

      <ContinueWithGoogle callbackUrl={redirect || '/'} />

      <div className="mt-4 text-xs">
        <p>
          {disclaimer.text}{' '}
          {disclaimer.links.map((link, i) => (
            <React.Fragment key={link.label}>
              <Link
                href={link.href}
                className="text-amazon-blue hover:underline"
              >
                {link.label}
              </Link>
              {i < disclaimer.links.length - 1 ? disclaimer.linkJoin : ''}
            </React.Fragment>
          ))}
          {disclaimer.suffix}
        </p>
      </div>

      <div className="mt-4">
        <Link
          href={helpLink.href}
          className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline flex items-center gap-1"
        >
          <ChevronRight className="w-3 h-3" />
          {helpLink.label}
        </Link>
      </div>
    </div>
  )
}
