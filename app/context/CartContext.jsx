'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { cartItemsData } from '@/app/data'

function parsePrice(str) {
  if (typeof str === 'number') return str
  if (!str) return 0
  const num = String(str).replace(/[^\d.]/g, '')
  return Number(num) || 0
}

function toCartItem(item, index) {
  return {
    id: item.id ?? index,
    title: item.title,
    image: item.image,
    price: parsePrice(item.price),
    priceDisplay: typeof item.price === 'string' ? item.price : `৳${Number(item.price).toLocaleString('en-BD')}`,
    seller: item.seller,
    href: item.href ?? '/details',
    quantity: item.quantity ?? 1,
    selected: true,
  }
}

const defaultItems = (cartItemsData.items || []).map(toCartItem)

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(defaultItems)

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
