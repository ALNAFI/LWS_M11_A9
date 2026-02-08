import React from 'react'
import Link from 'next/link'
export default function Account() {
    return (
        <Link
            href="/auth/login"
            className="hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 cursor-pointer"
        >
            <div className="text-xs leading-none text-gray-300">
                Hello, Sign in
            </div>
            <div className="font-bold text-sm">Account & Lists</div>
        </Link>
    )
}
