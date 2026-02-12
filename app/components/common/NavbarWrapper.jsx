'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Navbar from './Navbar'

export default function NavbarWrapper() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
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
  }, [session, pathname])

  // Hide navbar on auth pages (login, register, etc.)
  if (pathname?.startsWith('/auth/')) return null

  // Determine if current route is a Seller Central page
  const sellerCentralPaths = ['/create', '/manageList', '/profile']
  const isSellerCentralPath = sellerCentralPaths.some((p) => pathname?.startsWith(p))
  const isShopOwner = user?.userType === 'shopOwner' || session?.user?.userType === 'shopOwner'

  // Hide main navbar only on Seller Central pages for shop owners
  if (isShopOwner && isSellerCentralPath) return null

  return <Navbar />
}
