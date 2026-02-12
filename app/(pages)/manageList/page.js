'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Footer from '@/app/components/paymentProcess/Footer'
import {
  ManageListHeader,
  ManageListPageIntro,
  ManageListFilters,
  ManageListTable,
  ManageListPagination,
} from '@/app/components/manageList'
import { manageListPageData } from '@/app/data'

export default function ManageListPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [accessDenied, setAccessDenied] = useState(false)
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    category: 'All Categories',
    brand: 'All Brands',
  })

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
      .finally(() => setLoading(false))
  }, [router])

  useEffect(() => {
    if (!user || user.userType !== 'shopOwner') return
    const params = new URLSearchParams()
    params.set('view', 'manage')
    if (filters.search) params.set('search', filters.search)
    if (filters.status !== 'All') params.set('status', filters.status)
    if (filters.category !== 'All Categories') params.set('category', filters.category)
    if (filters.brand !== 'All Brands') params.set('brand', filters.brand)
    fetch(`/api/products?${params}`, { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : { products: [] }))
      .then((data) => setProducts(data.products || []))
      .catch(() => setProducts([]))
  }, [user, filters])

  const refreshProducts = () => {
    if (!user || user.userType !== 'shopOwner') return
    const params = new URLSearchParams()
    params.set('view', 'manage')
    if (filters.search) params.set('search', filters.search)
    if (filters.status !== 'All') params.set('status', filters.status)
    if (filters.category !== 'All Categories') params.set('category', filters.category)
    if (filters.brand !== 'All Brands') params.set('brand', filters.brand)
    fetch(`/api/products?${params}`, { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : { products: [] }))
      .then((data) => setProducts(data.products || []))
  }

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
          <p className="text-gray-600 mb-4">Only Shop Owners can manage products.</p>
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
      <ManageListHeader user={user} />
      <main className="w-full p-6">
        <div className="max-w-[1500px] mx-auto">
          <ManageListPageIntro />
          <ManageListFilters filters={filters} onFiltersChange={setFilters} />
          <ManageListTable
            products={products}
            onEdit={(id) => router.push(`/create/edit/${id}`)}
            onPublishToggle={(id, published) => {
              fetch(`/api/products/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ published }),
              }).then(() => refreshProducts())
            }}
            onDelete={(id) => {
              if (!confirm('Delete this product?')) return
              fetch(`/api/products/${id}`, { method: 'DELETE', credentials: 'include' }).then(() => refreshProducts())
            }}
          />
          <ManageListPagination total={products.length} />
        </div>
      </main>
      <Footer
        copyrightText={manageListPageData.footer.copyrightText}
        className="mt-auto py-6 bg-white border-t border-gray-300"
        innerClassName="max-w-[1500px] mx-auto text-center text-xs text-gray-500"
      />
    </>
  )
}
