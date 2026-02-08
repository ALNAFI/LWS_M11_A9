'use client'

import React from 'react'
import Link from 'next/link'
import { ShoppingCartIcon } from 'lucide-react'
import { useCart } from '@/app/context/CartContext'

export default function Cart() {
  const { items } = useCart()
  const count = items.length

  return (
    <Link
      href="/cart"
      className="flex items-end hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 cursor-pointer relative"
    >
      <ShoppingCartIcon className="w-8 h-8" />
      {count > 0 && (
        <span className="font-bold text-amazon-secondary absolute top-0 left-1/2 -translate-x-1/2 text-sm">
          {count}
        </span>
      )}
      <span className="font-bold text-sm hidden md:block">Cart</span>
    </Link>
  )
}
