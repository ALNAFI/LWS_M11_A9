import React from 'react'
import { paymentProcessFooterData } from '@/app/data'
import { getCurrentYear } from '@/app/utils'
import Link from 'next/link'
export default function Footer() {
  const { links, copyrightText } = paymentProcessFooterData

  return (
    <footer className="bg-amazon-background py-10 border-t border-gray-300">
      <div className="checkout-container text-center text-[10px] text-gray-500 space-y-2">
        <div className="flex justify-center gap-6 text-amazon-blue text-xs mb-2">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p>
          &copy; {getCurrentYear()} {copyrightText}
        </p>
      </div>
    </footer>
  )
}
