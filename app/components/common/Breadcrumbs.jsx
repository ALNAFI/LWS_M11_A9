import React from 'react'
import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
export default function Breadcrumbs() {
    return (
        <div className="text-xs text-gray-500 mb-4 flex items-center gap-1">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <Link href="/products" className="hover:underline">Electronics</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <Link href="/products" className="hover:underline"
            >Laptops & Computers</Link
            >
            <ChevronRightIcon className="w-3 h-3" />
            <span className="text-amazon-text font-bold">MacBook Pro</span>
        </div>
    )
}
