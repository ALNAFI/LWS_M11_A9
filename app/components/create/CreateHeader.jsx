import React from 'react'
import Link from 'next/link'
import { footerBrand, createPageData } from '@/app/data'
import ShopOwnerNavUser from '@/app/components/common/ShopOwnerNavUser'

export default function CreateHeader({ user }) {
  const { header } = createPageData
  const displayLabel = user?.name ?? header.userLabel

  return (
    <nav className="bg-amazon text-white p-3 shadow-md">
      <div className="max-w-[1500px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tighter">
              {footerBrand.name}
              <span className="italic text-amazon-secondary">{footerBrand.suffix}</span>
              <span className="text-sm font-normal ml-2 bg-gray-700 px-2 py-0.5 rounded">
                {header.sellerBadge}
              </span>
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          {header.navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="hover:underline">
              {link.label}
            </Link>
          ))}
          <div className="h-4 w-px bg-gray-600" />
          <ShopOwnerNavUser displayName={displayLabel} />
        </div>
      </div>
    </nav>
  )
}
