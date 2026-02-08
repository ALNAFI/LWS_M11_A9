import React from 'react'
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

export default function ProductTableRow({ product }) {
  const { table } = manageListPageData
  const statusStyle = STATUS_STYLES[product.status] ?? STATUS_STYLES.inStock
  const availableStyle = AVAILABLE_STYLES[product.status] ?? AVAILABLE_STYLES.inStock

  return (
    <tr className="hover:bg-gray-50">
      <td className="p-3 text-center">
        <input type="checkbox" />
      </td>
      <td className="p-3">
        <span className={`inline-block px-2 py-1 text-xs font-bold rounded ${statusStyle}`}>
          {product.statusLabel}
        </span>
      </td>
      <td className="p-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-12 h-12 object-cover rounded border border-gray-200"
        />
      </td>
      <td className="p-3">
        <div className="font-medium">{product.name}</div>
        <div className="text-xs text-gray-500">SKU: {product.sku}</div>
      </td>
      <td className="p-3 text-gray-600">{product.category}</td>
      <td className="p-3 text-gray-600">{product.brand}</td>
      <td className="p-3 font-bold">{product.price}</td>
      <td className="p-3">
        <span className={`font-bold ${availableStyle}`}>{product.available}</span>
      </td>
      <td className="p-3">
        <div className="flex items-center justify-end gap-2">
          {table.rowActions.map((action) => {
            const iconName = action.id === 'visibility'
              ? (product.isPublished ? action.icon : action.iconPublished)
              : action.icon
            const Icon = ACTION_ICONS[iconName]
            const title = action.id === 'visibility'
              ? (product.isPublished ? action.titleUnpublish : action.titlePublish)
              : action.title
            return (
              <button
                key={action.id}
                className="p-1.5 hover:bg-gray-100 rounded"
                title={title}
              >
                {Icon && <Icon className={`w-4 h-4 ${action.colorClass}`} />}
              </button>
            )
          })}
        </div>
      </td>
    </tr>
  )
}
