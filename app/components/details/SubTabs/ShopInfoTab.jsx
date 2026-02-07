import React from 'react'
import Link from 'next/link'
import { CheckCircleIcon } from 'lucide-react'
import { shopInfoTabData } from '@/app/data'

export default function ShopInfoTab() {
    return (
        <div className="tab-content" role="tabpanel" aria-labelledby="tab-shop">
            <h2 className="text-xl font-bold mb-4">
                {shopInfoTabData.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-bold mb-2">
                        {shopInfoTabData.shop.name}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4">
                        {shopInfoTabData.shop.description}
                    </p>

                    <div className="space-y-2 text-sm">
                        {shopInfoTabData.shop.stats.map((item) => (
                            <p key={item.label}>
                                <span className="font-bold">{item.label}:</span>{' '}
                                {item.value}
                            </p>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-bold mb-2">Policies</h3>

                    <div className="space-y-2 text-sm">
                        {shopInfoTabData.policies.map((policy, index) => (
                            <p key={index}>
                                <CheckCircleIcon className="w-4 h-4 inline text-green-600 mr-1" />
                                {policy}
                            </p>
                        ))}
                    </div>

                    <Link
                        href={shopInfoTabData.shopLink.href}
                        className="inline-block mt-4 text-amazon-blue hover:underline text-sm"
                    >
                        {shopInfoTabData.shopLink.label}
                    </Link>
                </div>
            </div>
        </div>
    )
}
