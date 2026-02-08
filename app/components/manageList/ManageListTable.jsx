import React from 'react'
import { manageListPageData } from '@/app/data'
import ProductTableRow from './ProductTableRow'

export default function ManageListTable() {
  const { table, products } = manageListPageData

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
                {col.id === 'checkbox' ? <input type="checkbox" /> : col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <ProductTableRow key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
