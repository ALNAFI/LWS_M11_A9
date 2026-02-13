'use client'

import React from 'react'
import Image from 'next/image'
import { Pencil, Eye, EyeOff, Trash2 } from 'lucide-react'
import { manageListPageData } from '@/app/data'

const STATUS_STYLES = {
  inStock: 'bg-green-100 text-green-700',
  lowStock: 'bg-yellow-100 text-yellow-700',
  outOfStock: 'bg-red-100 text-red-700',
}

const AVAILABLE_STYLES = {
  inStock: 'text-green-600',
  lowStock: 'text-yellow-600',
  outOfStock: 'text-red-600',
}

const ACTION_ICONS = { Pencil, Eye, EyeOff, Trash2 }

function getStatus(product) {
  const qty = product.stockQuantity ?? 0
  if (qty === 0) return { status: 'outOfStock', statusLabel: 'Out of Stock' }
  if (qty <= 5) return { status: 'lowStock', statusLabel: 'Low Stock' }
  return { status: 'inStock', statusLabel: 'In Stock' }
}

export default function ProductTableRow({ product, onEdit, onPublishToggle, onDelete }) {
  const { table } = manageListPageData
  const { status, statusLabel } = getStatus(product)
  const statusStyle = STATUS_STYLES[status] ?? STATUS_STYLES.inStock
  const availableStyle = AVAILABLE_STYLES[status] ?? AVAILABLE_STYLES.inStock
  const imageUrl = product.mainImageUrl || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100'
  const priceFormatted = typeof product.price === 'number' ? product.price.toLocaleString('en-BD') : product.price

  return (
    <tr className="hover:bg-gray-50">
      <td className="p-3 text-center">
        <input type="checkbox" />
      </td>
      <td className="p-3">
        <span className={`inline-block px-2 py-1 text-xs font-bold rounded ${statusStyle}`}>
          {product.published ? statusLabel : 'Unpublished'}
        </span>
      </td>
      <td className="p-3">
        <div className="relative w-12 h-12 rounded border border-gray-200 overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.productName}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
      </td>
      <td className="p-3">
        <div className="font-medium">{product.productName}</div>
        <div className="text-xs text-gray-500">SKU: {product.sku || '—'}</div>
      </td>
      <td className="p-3 text-gray-600">{product.category}</td>
      <td className="p-3 text-gray-600">{product.brand}</td>
      <td className="p-3 font-bold">{priceFormatted}</td>
      <td className="p-3">
        <span className={`font-bold ${availableStyle}`}>{product.stockQuantity ?? 0}</span>
      </td>
      <td className="p-3">
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => onEdit?.(product.id)}
            className="p-1.5 hover:bg-gray-100 rounded"
            title="Edit"
          >
            <Pencil className="w-4 h-4 text-amazon-blue" />
          </button>
          <button
            type="button"
            onClick={() => onPublishToggle?.(product.id, !product.published)}
            className="p-1.5 hover:bg-gray-100 rounded"
            title={product.published ? 'Unpublish' : 'Publish'}
          >
            {product.published ? (
              <EyeOff className="w-4 h-4 text-gray-600" />
            ) : (
              <Eye className="w-4 h-4 text-gray-600" />
            )}
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(product.id)}
            className="p-1.5 hover:bg-gray-100 rounded"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </td>
    </tr>
  )
}
