'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

export default function Account() {
  const router = useRouter()
  const { data: session } = useSession()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : { user: null }))
      .then((data) => setUser(data?.user ?? null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const displayName = session?.user?.name ?? user?.name

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    if (session) {
      await signOut({ callbackUrl: '/' })
    } else {
      setUser(null)
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href={displayName ? '/profile' : '/auth/login'}
        className="hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 cursor-pointer"
      >
        <div className="text-xs leading-none text-gray-300">
          {loading ? 'Hello' : displayName ? `Hello, ${displayName}` : 'Hello, Sign in'}
        </div>
        <div className="font-bold text-sm">Account & Lists</div>
      </Link>
      {displayName && (
        <button
          type="button"
          onClick={handleLogout}
          className="text-xs font-bold text-white hover:underline whitespace-nowrap"
        >
          Log out
        </button>
      )}
    </div>
  )
}
