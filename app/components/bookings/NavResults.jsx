import React from 'react'
import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
export default function NavResults() {
    return (
        <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="#" className="text-amazon-blue hover:underline"
            >Your Account</Link
            >
            <ChevronRightIcon className="w-3 h-3 text-gray-400" />
            <span className="text-amazon-orange">Your Orders</span>
        </div>
    )
}
