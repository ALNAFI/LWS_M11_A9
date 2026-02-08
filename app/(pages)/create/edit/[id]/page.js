'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/app/components/paymentProcess/Footer'
import { CreateHeader, CreatePageIntro, CreateForm } from '@/app/components/create'
import { createPageData } from '@/app/data'

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id
  const [user, setUser] = useState(null)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : { user: null }))
      .then((data) => {
        setUser(data?.user ?? null)
        if (!data?.user) router.replace('/auth/login')
        else if (data.user.userType !== 'shopOwner') router.replace('/')
      })
      .finally(() => {})
  }, [router])

  useEffect(() => {
    if (!id) return
    fetch(`/api/products/${id}`, { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setProduct(data?.product ?? null))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    if (!loading && user && !product && id) {
      router.replace('/manageList')
    }
  }, [loading, user, product, id, router])

  if (loading || !user || (user.userType === 'shopOwner' && !product)) {
    return (
      <div className="bg-[#F0F2F2] min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  if (user.userType !== 'shopOwner') return null

  return (
    <>
      <CreateHeader user={user} />
      <main className="max-w-[1000px] mx-auto w-full p-6">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-normal">Edit Product</h1>
            <p className="text-sm text-gray-600">Update your product listing.</p>
          </div>
          <Link
            href="/manageList"
            className="text-amazon-blue hover:underline text-sm flex items-center gap-1"
          >
            Back to Manage List
          </Link>
        </div>
        <CreateForm initialProduct={product} productId={id} />
      </main>
      <Footer
        copyrightText={createPageData.footer.copyrightText}
        className="mt-auto py-6 bg-white border-t border-gray-300"
        innerClassName="max-w-[1000px] mx-auto text-center text-xs text-gray-500"
      />
    </>
  )
}
