import React from 'react'
import { buyBoxData } from '@/app/data'
import { ShieldCheckIcon, TruckIcon, PackageIcon } from 'lucide-react'
export default function BuyBox() {
  return (
    <div className="lg:col-span-3">
      <div className="border border-gray-200 rounded p-4">
        <div className="text-3xl text-amazon-orange mb-2">
          {buyBoxData.price}
        </div>

        <p className="text-sm mb-3">
          <span className="font-bold">FREE delivery</span>{' '}
          <strong>{buyBoxData.delivery}</strong>
        </p>

        <p className="text-green-600 font-bold text-sm mb-4">
          {buyBoxData.stockStatus}
        </p>

        <div className="mb-4">
          <label className="text-sm font-bold block mb-2">
            Quantity:
          </label>
          <select className="border border-gray-300 rounded px-3 py-1 text-sm w-20">
            {buyBoxData.quantityOptions.map((qty) => (
              <option key={qty}>{qty}</option>
            ))}
          </select>
        </div>

        <button className="w-full bg-amazon-yellow hover:bg-amazon-yellow_hover py-2 rounded-md shadow-sm mb-2 text-sm font-medium border border-amazon-secondary">
          Add to Cart
        </button>

        <button className="w-full bg-amazon-secondary hover:bg-amazon-secondary_hover py-2 rounded-md shadow-sm text-sm font-medium text-white">
          Buy Now
        </button>

        <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-600">
          <p className="mb-1">
            <ShieldCheckIcon
              className="w-4 h-4 inline mr-1"
            />
            {buyBoxData.sellerInfo.secureText}
          </p>
          <p className="mb-1">
            <TruckIcon
              className="w-4 h-4 inline mr-1"
            />
            {buyBoxData.sellerInfo.shippedBy}
          </p>
          <p>
            <PackageIcon
              className="w-4 h-4 inline mr-1"
            />
            {buyBoxData.sellerInfo.soldBy}
          </p>
        </div>
      </div>
    </div>
  )
}
