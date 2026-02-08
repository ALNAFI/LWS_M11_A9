'use client'

import React from 'react'
import { manageListPageData } from '@/app/data'
import ProductTableRow from './ProductTableRow'

export default function ManageListTable({ products = [], onEdit, onPublishToggle, onDelete }) {
  const { table } = manageListPageData

  return (
    <div className="bg-white border border-gray-300 rounded shadow-sm overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100 border-b border-gray-300 text-gray-600 font-bold uppercase tracking-wider text-[11px]">
          <tr>
            {table.columns.map((col) => (
              <th
                key={col.id}
                className={`p-3 ${col.align === 'center' ? 'text-center' : ''} ${col.align === 'right' ? 'text-right' : ''} ${col.width ?? ''}`}
              >
                {col.id === 'checkbox' ? '' : col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.length === 0 ? (
            <tr>
              <td colSpan={table.columns.length} className="p-8 text-center text-gray-500">
                No products found. Add a product to get started.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <ProductTableRow
                key={product.id}
                product={product}
                onEdit={onEdit}
                onPublishToggle={onPublishToggle}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
