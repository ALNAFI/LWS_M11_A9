import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { loginData } from '@/app/data'
import ContinueWithGoogle from '@/app/components/auth/ContinueWithGoogle'

const inputClassName =
  'w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary'

export default function LoginForm() {
  const { form, disclaimer, helpLink } = loginData

  return (
    <div className="w-full max-w-[350px] p-6 a-box mb-6">
      <h1 className="text-2xl font-normal mb-4">{form.title}</h1>

      <form action={form.action} method={form.method} className="space-y-4">
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
            <input
              type={field.type}
              id={field.id}
              required={field.required}
              className={inputClassName}
            />
          </div>
        ))}

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
