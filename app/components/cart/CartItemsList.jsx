import React from 'react'
import Link from 'next/link'
import { cartItemsData } from '@/app/data'

export default function CartItemsList() {
  return (
    <div className="bg-white">
      {cartItemsData.items.map((item) => (
        <div
          key={item.id}
          className="p-4 border-b border-gray-300 flex gap-4 hover:bg-gray-50"
        >
          <div className="w-32 h-32 flex-shrink-0">
            <img
              src={item.image}
              className="w-full h-full object-cover rounded border border-gray-200"
              alt="Product"
            />
          </div>

          <div className="flex-1">
            <h3 className="font-medium text-base mb-1">
              <Link
                href={item.href}
                className="text-amazon-blue hover:text-amazon-orange hover:underline"
              >
                {item.title}
              </Link>
            </h3>

            <p className="text-sm text-green-700 font-medium">
              In Stock
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Sold by: {item.seller}
            </p>
            <p className="text-xs text-gray-600">
              Eligible for FREE Shipping
            </p>

            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-600">
                  Qty:
                </label>
                <select className="border border-gray-400 rounded-md px-2 py-1 text-sm bg-gray-50 outline-none focus:ring-1 focus:ring-amazon-blue">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>

              <span className="text-gray-300">|</span>

              <button className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline">
                Delete
              </button>

              <span className="text-gray-300">|</span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold text-amazon-orange">
              {item.price}
            </p>
          </div>
        </div>
      ))}

      {/* Subtotal */}
      <div className="p-4 text-right">
        <p className="text-lg">
          {cartItemsData.subtotal.label}{' '}
          <span className="font-bold text-amazon-orange">
            {cartItemsData.subtotal.amount}
          </span>
        </p>
      </div>
    </div>
  )
}
