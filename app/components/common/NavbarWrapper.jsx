'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Navbar from './Navbar'

/**
 * Renders the customer Navbar only when the user is NOT a shop owner.
 * Shop owner pages (create, manageList, profile) have their own header; we hide the main nav there to avoid two navbars.
 */
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

  const isShopOwner = user?.userType === 'shopOwner' || session?.user?.userType === 'shopOwner'
  if (isShopOwner) return null
  return <Navbar />
}
