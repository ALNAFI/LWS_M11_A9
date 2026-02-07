import { Navbar } from '@/app/components/common'
import Footer from '@/app/components/paymentProcess/Footer'
import SuccessOrderInfo from '@/app/components/success/SuccessOrderInfo'
import OrderPlaced from '@/app/components/success/OrderPlaced'
import React from 'react'

export default function SuccessPage() {
  return (
    < >
        {/* Navbar */}
        <Navbar/>

        {/* Main Content */}
        <main className="max-w-[800px] mx-auto w-full p-8 py-12">
            <OrderPlaced/>

            {/* Success Order Info */}
            <SuccessOrderInfo/>
        </main>

        {/* Footer */}
        <Footer/>

        
    </>
  )
}
