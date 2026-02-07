import React from 'react'
import { descriptionTabData } from '@/app/data'

export default function DescriptionTab() {
    return (
        <div
            className="tab-content"
            role="tabpanel"
            aria-labelledby="tab-description"
        >
            <h2 className="text-xl font-bold mb-4">
                {descriptionTabData.title}
            </h2>

            <div className="prose max-w-none text-sm">
                {descriptionTabData.paragraphs.map((text, index) => (
                    <p key={index} className="mb-4">
                        {text}
                    </p>
                ))}

                <h3 className="font-bold mt-6 mb-2">
                    {descriptionTabData.featuresTitle}
                </h3>

                <ul className="list-disc list-inside space-y-1">
                    {descriptionTabData.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
