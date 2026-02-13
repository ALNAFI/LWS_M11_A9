'use client'

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'

function parsePrice(str) {
  if (typeof str === 'number') return str
  if (!str) return 0
  const num = String(str).replace(/[^\d.]/g, '')
  return Number(num) || 0
}

function normalizeCartItem(item) {
  const price = parsePrice(item.price)
  return {
    id: item.id,
    title: item.title,
    image: item.image || '',
    price,
    priceDisplay: typeof item.priceDisplay === 'string' ? item.priceDisplay : `৳${Number(price).toLocaleString('en-BD')}`,
    seller: item.seller || '',
    href: item.href || '/details',
    quantity: Number(item.quantity) || 1,
    selected: item.selected !== false,
  }
}

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { data: session, status } = useSession()
  const [items, setItems] = useState([])
  const hasLoadedRef = useRef(false)
  const syncTimeoutRef = useRef(null)

  const isCustomer = session?.user?.userType === 'customer'
  const isLoggedInCustomer = !!(session?.user && isCustomer)

  // Load cart from API when user is logged-in customer
  useEffect(() => {
    if (status === 'loading') return
    if (!isLoggedInCustomer) {
      setItems([])
      hasLoadedRef.current = true
      return
    }
    hasLoadedRef.current = false
    fetch('/api/cart', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data?.items) ? data.items : []
        setItems(list.map(normalizeCartItem))
        hasLoadedRef.current = true
      })
      .catch(() => {
        setItems([])
        hasLoadedRef.current = true
      })
  }, [status, isLoggedInCustomer])

  // Sync cart to API when items change (logged-in customer only), debounced
  useEffect(() => {
    if (!hasLoadedRef.current || !isLoggedInCustomer || typeof window === 'undefined') return
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current)
    syncTimeoutRef.current = setTimeout(() => {
      fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ items }),
      }).catch(() => {})
      syncTimeoutRef.current = null
    }, 400)
    return () => {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current)
    }
  }, [items, isLoggedInCustomer])

  const setItemSelected = useCallback((id, selected) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected } : item))
    )
  }, [])

  const setAllSelected = useCallback((selected) => {
    setItems((prev) => prev.map((item) => ({ ...item, selected })))
  }, [])

  const setQuantity = useCallback((id, quantity) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Number(quantity) || 1 } : item))
    )
  }, [])

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const addItem = useCallback((product, quantity = 1) => {
    const price = typeof product.price === 'number' ? product.price : parsePrice(product.price)
    const newItem = {
      id: product.id,
      title: product.productName ?? product.title,
      image: product.mainImageUrl ?? product.image ?? '',
      price,
      priceDisplay: typeof product.price === 'string' ? product.price : `৳${Number(price).toLocaleString('en-BD')}`,
      seller: product.seller ?? '',
      href: `/details?productId=${product.id}`,
      quantity: Number(quantity) || 1,
      selected: true,
    }
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id)
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + newItem.quantity } : i
        )
      }
      return [...prev, newItem]
    })
  }, [])

  const selectedItems = items.filter((i) => i.selected)
  const selectedSubtotal = selectedItems.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const value = {
    items,
    setItemSelected,
    setAllSelected,
    setQuantity,
    removeItem,
    addItem,
    setItems, // expose for advanced flows like clearing after checkout
    selectedItems,
    selectedSubtotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
