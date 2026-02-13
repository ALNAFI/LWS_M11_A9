'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { ChevronDown } from 'lucide-react'

const MENU_SHOP_OWNER = [
  { label: 'Profile', href: '/profile' },
  { label: 'Add Product', href: '/create' },
  { label: 'Orders', href: '/shop/orders' },
  { label: 'Manage Products', href: '/manageList' },
  { label: 'Logout', href: null, isLogout: true },
]

const MENU_NORMAL_USER = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Shops', href: '/shop' },
  { label: 'My Orders', href: '/bookings' },
  { label: 'Logout', href: null, isLogout: true },
]

export default function Account() {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session } = useSession()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    setLoading(true)
    fetch('/api/auth/me', { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : { user: null }))
      .then((data) => setUser(data?.user ?? null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [session, pathname])

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const isAuthenticated = !!(session?.user || user)
  const displayName = session?.user?.name ?? user?.name
  const profileImage = session?.user?.image ?? null
  const userType = session?.user?.userType ?? user?.userType ?? 'customer'
  const menuItems = userType === 'shopOwner' ? MENU_SHOP_OWNER : MENU_NORMAL_USER

  async function handleLogout() {
    setMenuOpen(false)
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    if (session) {
      await signOut({ callbackUrl: '/' })
    } else {
      setUser(null)
      router.push('/')
      router.refresh()
    }
    if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('auth:logout'))
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-gray-300 text-sm">
        <span>Loading...</span>
      </div>
    )
  }

  // Unauthenticated: show only Sign In button
  if (!isAuthenticated) {
    return (
      <Link
        href="/auth/login"
        className="inline-flex items-center px-3 py-1.5 bg-amazon-yellow hover:bg-amazon-yellow_hover text-amazon-secondary font-bold text-sm rounded border border-amazon-secondary shadow-sm transition-colors"
      >
        Sign In
      </Link>
    )
  }

  // Authenticated: profile image + name + dropdown menu (role-based)
  return (
    <div className="relative flex items-center gap-2" ref={menuRef}>
      <button
        type="button"
        onClick={() => setMenuOpen((o) => !o)}
        className="flex items-center gap-2 hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 cursor-pointer"
        aria-expanded={menuOpen}
        aria-haspopup="true"
      >
        <span className="h-8 w-8 rounded-full border-2 border-white overflow-hidden bg-gray-400 flex-shrink-0">
          {profileImage ? (
            <img src={profileImage} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="h-full w-full flex items-center justify-center text-white text-xs font-bold">
              {displayName ? displayName.charAt(0).toUpperCase() : '?'}
            </span>
          )}
        </span>
        <span className="text-sm font-bold text-white max-w-[120px] truncate hidden sm:inline">
          {displayName || 'Account'}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-white hidden sm:inline transition-transform ${
            menuOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {menuOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 py-1 bg-white rounded shadow-lg border border-gray-200 z-50 text-amazon-text">
          {menuItems.map((item) =>
            item.isLogout ? (
              <button
                key="logout"
                type="button"
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm font-medium hover:bg-gray-100 border-t border-gray-100"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-sm font-medium hover:bg-gray-100"
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      )}
    </div>
  )
}
