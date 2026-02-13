'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User, ChevronDown } from 'lucide-react'
import { signOut } from 'next-auth/react'

const MENU_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Add Product', href: '/create' },
  { label: 'Orders', href: '/shop/orders' },
  { label: 'Manage Products', href: '/manageList' },
  { label: 'Logout', href: null, isLogout: true },
]

export default function ShopOwnerNavUser({ displayName }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  async function handleLogout() {
    setOpen(false)
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    await signOut({ callbackUrl: '/' })
    router.push('/')
    router.refresh()
    if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('auth:logout'))
  }

  return (
    <div className="relative flex items-center" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 cursor-pointer hover:opacity-90 text-white text-sm font-medium py-1 px-2 rounded focus:outline-none focus:ring-1 focus:ring-white/50"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <User className="w-4 h-4 flex-shrink-0" />
        <span className="max-w-[140px] truncate">{displayName || 'Shop Owner'}</span>
        <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-48 py-1 bg-white rounded shadow-lg border border-gray-200 z-50 text-amazon-text">
          {MENU_ITEMS.map((item) =>
            item.isLogout ? (
              <button
                key="logout"
                type="button"
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm font-medium hover:bg-gray-100 border-t border-gray-100 text-red-700"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
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
