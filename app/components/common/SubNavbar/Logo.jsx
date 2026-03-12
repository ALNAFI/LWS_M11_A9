import React from 'react'
import Link from 'next/link'
export default function Logo() {
    return (
        <Link
            href="/"
            className="flex items-center hover:outline hover:outline-1 hover:outline-white rounded-sm p-1"
        >
            <span className="text-2xl font-bold tracking-tighter">
                Gadgets <span className="italic text-amazon-secondary">Hub</span>
            </span>
        </Link>
    )
}
