import React from 'react'

export default function Header({ itemCount = 0 }) {
  const count = Number(itemCount) || 0
  const label = count === 1 ? '1 item' : `${count} items`
  return (
    <header className="bg-amazon p-4 border-b border-gray-300">
      <div className="checkout-container flex justify-center items-center text-white">
        <h1 className="text-2xl font-normal hidden md:block">
          Checkout (<span className="text-amazon-secondary">{label}</span>)
        </h1>
      </div>
    </header>
  )
}
