import React from 'react'
import { paymentProcessFooterData } from '@/app/data'
import { getCurrentYear } from '@/app/utils'
import Link from 'next/link'

const defaultClassName = 'bg-amazon-background py-10 border-t border-gray-300'

export default function Footer({
  copyrightText: copyrightTextOverride,
  className: classNameOverride,
  innerClassName: innerClassNameOverride,
} = {}) {
  const { links, copyrightText: defaultCopyright } = paymentProcessFooterData
  const year = getCurrentYear()
  const displayCopyright =
    copyrightTextOverride != null
      ? copyrightTextOverride.includes('{{year}}')
        ? copyrightTextOverride.replace('{{year}}', String(year))
        : copyrightTextOverride
      : `${year} ${defaultCopyright}`

  const innerClassName =
    innerClassNameOverride ?? 'checkout-container text-center text-[10px] text-gray-500 space-y-2'

  return (
    <footer className={classNameOverride ?? defaultClassName}>
      <div className={innerClassName}>
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
        <p>&copy; {displayCopyright}</p>
      </div>
    </footer>
  )
}
