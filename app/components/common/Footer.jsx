import React from 'react'
import { footerData, footerBrand, footerCopyrightText } from '@/app/data'
import { getCurrentYear } from '@/app/utils'
import BackToTop from './SubFooter/BackToTop'
import Link from 'next/link'
export default function Footer() {
  return (
    <footer className="bg-amazon-light text-white mt-8">
      <BackToTop />
      <div className="max-w-[1000px] mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {footerData.map((section) => (
          <div key={section.title}>
            <h3 className="font-bold mb-4">{section.title}</h3>
            <ul className="space-y-2 text-gray-300">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-600 text-center py-8">
        <div className="flex justify-center items-center gap-4 mb-4">
          <span className="text-2xl font-bold tracking-tighter">
            {footerBrand.name}
            <span className="italic text-gray-400">{footerBrand.suffix}</span>
          </span>
        </div>
        <p className="text-xs text-gray-400">© {getCurrentYear()} {footerCopyrightText}</p>
      </div>
    </footer>
  )
}
