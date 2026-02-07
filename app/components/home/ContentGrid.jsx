import React from 'react'
import FeaturedProduct from './FeaturedProduct'
import CardGrid from './CardGrid'
export default function ContentGrid() {
    return (
        <div className="relative z-10 -mt-32 px-4">
            <CardGrid />
            {/* Featured Product Carousel (Horizontal Scroll) */}
            <FeaturedProduct />
        </div>
    )
}
