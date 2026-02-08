import React from 'react'
import Link from 'next/link'
export default function OrderHeader({ order }) {
  const { orderPlaced, total, shipTo, id, viewDetailsHref } = order

  return (
    <div className="bg-gray-100 p-4 flex flex-wrap justify-between items-center text-xs text-gray-600 border-b border-gray-300">
      <div className="flex gap-10">
        <div>
          <div className="uppercase tracking-tighter">Order Placed</div>
          <div className="font-normal text-sm text-gray-900 mt-1">{orderPlaced}</div>
        </div>
        <div>
          <div className="uppercase tracking-tighter">Total</div>
          <div className="font-normal text-sm text-gray-900 mt-1">{total}</div>
        </div>
        <div>
          <div className="uppercase tracking-tighter">Ship to</div>
          <div className="font-normal text-sm text-amazon-blue mt-1 hover:underline cursor-pointer">
            {shipTo}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="uppercase tracking-tighter mb-1">Order # {id}</div>
        <Link href={viewDetailsHref} className="text-amazon-blue hover:underline">
          View order details
        </Link>
      </div>
    </div>
  )
}
