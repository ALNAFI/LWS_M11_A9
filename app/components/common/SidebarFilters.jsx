import React from 'react'
import Condition from './SubSidebarFilters/Condition'
import Availability from './SubSidebarFilters/Availability'
import Price from './SubSidebarFilters/Price'
import Category from './SubSidebarFilters/Category'
import Brand from './SubSidebarFilters/Brand'
import CustomerReviews from './SubSidebarFilters/CustomerReviews'
export default function SidebarFilters() {
    return (
        <div className="w-64 hidden lg:block flex-shrink-0 border-r pr-4">
            <Category/>
            

            <Brand/>

            <CustomerReviews/>

            <Price/>

            <Availability/>

            <Condition/>

        </div>
    )
}
