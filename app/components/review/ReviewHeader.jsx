import React from 'react'
import Link from 'next/link'
import { User } from 'lucide-react'
import { footerBrand, reviewPageData } from '@/app/data'

export default function ReviewHeader() {
  const { header } = reviewPageData

  return (
    <nav className="bg-amazon text-white p-3 shadow-md">
      <div className="max-w-[1000px] mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold tracking-tighter">
            {footerBrand.name}
            <span className="italic text-amazon-secondary">{footerBrand.suffix}</span>
          </span>
        </Link>
        <div className="flex items-center gap-2 cursor-pointer">
          <User className="w-4 h-4" />
          <span className="text-sm">{header.userName}</span>
        </div>
      </div>
    </nav>
  )
}
