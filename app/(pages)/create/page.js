'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Footer from '@/app/components/paymentProcess/Footer'
import { CreateHeader, CreatePageIntro, CreateForm } from '@/app/components/create'
import { createPageData } from '@/app/data'

export default function CreatePage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [accessDenied, setAccessDenied] = useState(false)

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : { user: null }))
      .then((data) => {
        const u = data?.user ?? null
        setUser(u)
        if (!u) {
          router.replace('/auth/login')
          return
        }
        if (u.userType !== 'shopOwner') {
          setAccessDenied(true)
        }
      })
      .catch(() => router.replace('/auth/login'))
      .finally(() => setLoading(false))
  }, [router])

  if (loading) {
    return (
      <div className="bg-[#F0F2F2] min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  if (accessDenied) {
    return (
      <div className="bg-[#F0F2F2] min-h-screen flex flex-col items-center justify-center p-6">
        <div className="bg-white border border-gray-300 rounded shadow-sm p-8 max-w-md text-center">
          <h1 className="text-xl font-bold text-gray-800 mb-2">Access denied</h1>
          <p className="text-gray-600 mb-4">Only Shop Owners can add products. Please sign in with a Shop Owner account.</p>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-amazon-yellow border border-amazon-secondary rounded font-medium"
          >
            Go to home
          </button>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <>
      <CreateHeader user={user} />
      <main className="max-w-[1000px] mx-auto w-full p-6">
        <CreatePageIntro />
        <CreateForm />
      </main>
      <Footer
        copyrightText={`{{year}} ${createPageData.footer.copyrightText}`}
        className="mt-auto py-6 bg-white border-t border-gray-300"
        innerClassName="max-w-[1000px] mx-auto text-center text-xs text-gray-500"
      />
    </>
  )
}
