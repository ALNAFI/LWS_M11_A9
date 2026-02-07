import React from 'react'
import { TruckIcon, ShieldCheckIcon } from 'lucide-react'
import { paymentOrderSummaryData } from '@/app/data'
import Link from 'next/link'
const footerIconMap = {
    Truck: TruckIcon,
    ShieldCheck: ShieldCheckIcon,
}

export default function OrderSummary() {
    const {
        formId,
        submitButton,
        disclaimer,
        title,
        rows,
        footerItems,
    } = paymentOrderSummaryData

    return (
        <div className="w-full lg:w-[300px]">
            <div className="box p-4 sticky top-10">
                <button
                    type="submit"
                    form={formId}
                    className="w-full py-2 mb-4 rounded-md btn-primary text-sm font-normal shadow-sm"
                >
                    {submitButton.label}
                </button>

                <p className="text-[10px] text-gray-500 text-center mb-4 border-b border-gray-300 pb-4 leading-tight">
                    {disclaimer.text}{' '}
                    {disclaimer.links.map((link, i) => (
                        <React.Fragment key={link.label}>
                            <Link
                                href={link.href}
                                className="text-amazon-blue text-xs hover:underline hover:text-amazon-orange"
                            >
                                {link.label}
                            </Link>
                            {i < disclaimer.links.length - 1 && ' and '}
                        </React.Fragment>
                    ))}
                    {disclaimer.suffix}
                </p>

                <h3 className="font-bold text-lg mb-4">{title}</h3>
                <div className="space-y-2 text-xs text-gray-600">
                    {rows.map((row) => (
                        <div
                            key={row.label}
                            className={`flex justify-between ${row.borderBottom ? 'border-b border-gray-200 pb-2' : ''
                                } ${row.total ? 'text-amazon-orange text-lg font-bold pt-2' : ''}`}
                        >
                            <span>{row.label}</span>
                            <span className={row.valueClassName ?? ''}>{row.value}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 text-xs">
                    {footerItems.map((item) => {
                        const IconComponent = footerIconMap[item.icon]
                        return (
                            <p key={item.text} className={item.className}>
                                {IconComponent && (
                                    <IconComponent className="w-4 h-4 inline mr-1" />
                                )}
                                {item.text}
                            </p>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
