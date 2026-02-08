'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ShoppingCartIcon } from 'lucide-react'
import { useCart } from '@/app/context/CartContext'
import { useSession } from 'next-auth/react'

export default function Cart() {
  const { data: session } = useSession()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const { items } = useCart()

  useEffect(() => {
    if (session?.user) {
      setUser({ userType: session.user.userType })
      setLoading(false)
      return
    }
    fetch('/api/auth/me', { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : { user: null }))
      .then((data) => setUser(data?.user ?? null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [session])

  const isLoggedIn = !!(session?.user || user)
  const isShopOwner = user?.userType === 'shopOwner' || session?.user?.userType === 'shopOwner'
  if (loading || !isLoggedIn || isShopOwner) return null

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
