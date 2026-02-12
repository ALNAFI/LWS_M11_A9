'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AuthBackButton({ href = '/' }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm text-amazon-blue hover:text-amazon-orange hover:underline mb-4"
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </Link>
  )
}
