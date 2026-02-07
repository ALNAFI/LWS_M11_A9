import React from 'react'
import Link from 'next/link'
import { footerBrand } from '@/app/data'

export default function AuthLogo() {
  return (
    <div className="mb-4">
      <Link href="/" className="flex items-center">
        <span className="text-3xl font-bold tracking-tighter text-black">
          {footerBrand.name}
          <span className="italic text-amazon-secondary">{footerBrand.suffix}</span>
        </span>
      </Link>
    </div>
  )
}
