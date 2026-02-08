'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/app/components/paymentProcess/Footer'
import { ProfileHeader, ProfileContent } from '@/app/components/profile'
import { profilePageData } from '@/app/data'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : { user: null }))
      .then((data) => {
        setUser(data?.user ?? null)
        if (!data?.user) router.replace('/auth/login')
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

  if (!user) return null

  if (user.userType !== 'shopOwner') {
    return (
      <div className="bg-[#F0F2F2] min-h-screen flex flex-col">
        <main className="max-w-[600px] mx-auto w-full p-6 flex-1">
          <div className="bg-white border border-gray-300 rounded shadow-sm p-6">
            <h1 className="text-2xl font-normal mb-4">Your account</h1>
            <p className="text-gray-600 mb-2"><strong>Name:</strong> {user.name}</p>
            <p className="text-gray-600 mb-4"><strong>Email:</strong> {user.email}</p>
            <Link href="/" className="text-amazon-blue hover:underline">Back to home</Link>
          </div>
        </main>
        <Footer
          copyrightText={profilePageData.footer.copyrightText}
          className="mt-auto py-6 bg-white border-t border-gray-300"
          innerClassName="max-w-[1200px] mx-auto text-center text-xs text-gray-500"
        />
      </div>
    )
  }

  return (
    <>
      <ProfileHeader user={user} />
      <main className="max-w-[1200px] mx-auto w-full p-6">
        <ProfileContent user={user} onUserUpdate={setUser} />
      </main>
      <Footer
        copyrightText={profilePageData.footer.copyrightText}
        className="mt-auto py-6 bg-white border-t border-gray-300"
        innerClassName="max-w-[1200px] mx-auto text-center text-xs text-gray-500"
      />
    </>
  )
}
