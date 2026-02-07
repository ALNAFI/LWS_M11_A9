import React from 'react'
import Link from 'next/link'
import { ShoppingCartIcon } from 'lucide-react'
export default function Cart() {
    return (
        <Link
            href="/cart"
            className="flex items-end hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 cursor-pointer relative"
        >
            <ShoppingCartIcon className="w-8 h-8" />
            <span className="font-bold text-amazon-secondary absolute top-0 left-1/2 -translate-x-1/2 text-sm">
                3
            </span>
            <span className="font-bold text-sm hidden md:block">Cart</span>
        </Link>
    )
}
