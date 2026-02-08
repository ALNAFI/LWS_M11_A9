'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Info } from 'lucide-react'
import { registerData } from '@/app/data'
import ContinueWithGoogle from '@/app/components/auth/ContinueWithGoogle'

const inputClassName =
  'w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary'
const selectClassName =
  'px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary'

export default function RegisterForm() {
  const [accountType, setAccountType] = useState('customer')
  const { form, disclaimer, signIn, shopOwnerInfo } = registerData
  const isShopOwner = accountType === 'shopOwner'

  return (
    <div className="w-full max-w-[350px] p-6 a-box mb-6">
      <h1 className="text-2xl font-normal mb-4">{form.title}</h1>

      <form action={form.action} method={form.method} className="space-y-4">
        {/* Account Type Toggle */}
        <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-sm">
          {form.accountTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setAccountType(type.id)}
              className={`flex-1 py-1 text-xs font-bold rounded-sm ${
                accountType === type.id
                  ? 'bg-white shadow-sm'
                  : 'text-gray-500'
              }`}
            >
              {type.label}
            </button>
          ))}
          <input
            type="hidden"
            name={form.hiddenInputName}
            value={accountType}
            readOnly
          />
        </div>

        {form.fields.map((field) => {
          if (field.showForShopOwner && !isShopOwner) return null
          const showField =
            !field.showForShopOwner || (field.showForShopOwner && isShopOwner)

          if (field.countrySelect) {
            return (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="block text-sm font-bold mb-1"
                >
                  {field.label}
                </label>
                <div className="flex gap-2">
                  <select className={selectClassName}>
                    {field.countrySelect.options.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                  <input
                    type={field.type}
                    id={field.id}
                    required={field.required}
                    placeholder={field.placeholder}
                    className={`flex-1 ${inputClassName}`}
                  />
                </div>
              </div>
            )
          }

          return (
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
                required={field.showForShopOwner ? isShopOwner : field.required}
                placeholder={field.placeholder}
                className={inputClassName}
              />
              {field.hint && (
                <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                  <Info className="w-3 h-3 inline" />
                  {field.hint}
                </p>
              )}
            </div>
          )
        })}

        <button
          type="submit"
          className="w-full py-1.5 a-button-primary text-sm font-medium rounded-sm cursor-pointer"
        >
          {form.submitLabel}
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

      <ContinueWithGoogle />

      <div className="mt-4 text-xs">
        <p>
          {disclaimer.text}{' '}
          {disclaimer.links.map((link, i) => (
            <React.Fragment key={link.label}>
              <Link href={link.href} className="text-amazon-blue hover:underline">
                {link.label}
              </Link>
              {i < disclaimer.links.length - 1 ? disclaimer.linkJoin : ''}
            </React.Fragment>
          ))}
          {disclaimer.suffix}
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-300">
        <p className="text-sm">
          {signIn.text}{' '}
          <Link
            href={signIn.link.href}
            className="text-amazon-blue hover:text-amazon-orange hover:underline"
          >
            {signIn.link.label}
          </Link>
        </p>
      </div>

      {isShopOwner && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-sm">
          <div className="flex gap-2">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900">
              <p className="font-bold mb-1">{shopOwnerInfo.title}</p>
              <p>{shopOwnerInfo.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
