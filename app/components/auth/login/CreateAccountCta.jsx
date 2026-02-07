import React from 'react'
import Link from 'next/link'
import { loginData } from '@/app/data'

export default function CreateAccountCta() {
  const { createAccount } = loginData

  return (
    <div className="w-full max-w-[350px] mb-8">
      <Link
        href={createAccount.href}
        className="block w-full py-1.5 border border-gray-400 rounded-sm text-center text-sm hover:bg-gray-50 transition-colors"
      >
        {createAccount.label}
      </Link>
    </div>
  )
}
