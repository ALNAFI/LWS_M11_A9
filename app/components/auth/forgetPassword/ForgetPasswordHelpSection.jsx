import React from 'react'
import Link from 'next/link'
import { forgetPasswordData } from '@/app/data'

export default function ForgetPasswordHelpSection() {
  const { helpSection } = forgetPasswordData

  return (
    <div className="w-full max-w-[350px]">
      <h2 className="text-lg font-bold mb-2">{helpSection.title}</h2>
      <p className="text-sm mb-4">
        {helpSection.text}{' '}
        <Link
          href={helpSection.link.href}
          className="text-amazon-blue hover:underline"
        >
          {helpSection.link.label}
        </Link>
        {helpSection.linkSuffix}
      </p>
    </div>
  )
}
