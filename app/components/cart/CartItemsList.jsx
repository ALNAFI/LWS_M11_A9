'use client'

import React from 'react'
import Link from 'next/link'
import { useCart } from '@/app/context/CartContext'

export default function CartItemsList() {
  const { items, setItemSelected, setAllSelected, setQuantity, removeItem } = useCart()

  if (items.length === 0) {
    return (
      <div className="bg-white p-8 border border-gray-300 rounded text-center">
        <p className="text-gray-600 mb-4">Your cart is empty.</p>
        <Link href="/products" className="text-amazon-blue hover:underline">
          Continue shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-300 rounded">
      <div className="p-3 border-b border-gray-300 flex items-center gap-2">
        <input
          type="checkbox"
          checked={items.length > 0 && items.every((i) => i.selected)}
          onChange={(e) => setAllSelected(e.target.checked)}
          className="rounded border-gray-400"
        />
        <span className="text-sm text-gray-600">Select all</span>
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          className="p-4 border-b border-gray-300 flex gap-4 hover:bg-gray-50 items-start"
        >
          <input
            type="checkbox"
            checked={!!item.selected}
            onChange={(e) => setItemSelected(item.id, e.target.checked)}
            className="mt-4 rounded border-gray-400"
          />
          <div className="w-32 h-32 flex-shrink-0">
            <img
              src={item.image}
              className="w-full h-full object-cover rounded border border-gray-200"
              alt="Product"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-base mb-1">
              <Link
                href={item.href}
                className="text-amazon-blue hover:text-amazon-orange hover:underline"
              >
                {item.title}
              </Link>
            </h3>
            <p className="text-sm text-green-700 font-medium">In Stock</p>
            <p className="text-xs text-gray-600 mt-1">Sold by: {item.seller}</p>
            <p className="text-xs text-gray-600">Eligible for FREE Shipping</p>

            <div className="flex items-center gap-4 mt-3 flex-wrap">
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-600">Qty:</label>
                <select
                  value={item.quantity}
                  onChange={(e) => setQuantity(item.id, e.target.value)}
                  className="border border-gray-400 rounded-md px-2 py-1 text-sm bg-gray-50 outline-none focus:ring-1 focus:ring-amazon-blue"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <span className="text-gray-300">|</span>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <p className="text-lg font-bold text-amazon-orange">{item.priceDisplay}</p>
          </div>
        </div>
      ))}

      <div className="p-4 text-right border-t border-gray-200">
        <p className="text-lg">
          Subtotal ({items.length} items):{' '}
          <span className="font-bold text-amazon-orange">
            ৳{items.reduce((s, i) => s + i.price * i.quantity, 0).toLocaleString('en-BD')}
          </span>
        </p>
      </div>
    </div>
  )
}
