import React, { Suspense } from 'react'
import Footer from '@/app/components/paymentProcess/Footer'
import { AuthLogo, ResetPasswordForm } from '@/app/components/auth/forgetPassword'

export default function ResetPasswordPage() {
  return (
    <>
      <AuthLogo />
      <Suspense fallback={<div className="w-full max-w-[350px] p-6 a-box mb-6">Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
      <Footer
        copyrightText="1996-{{year}}, GadgetsBD.com, Inc. or its affiliates"
        className="w-full max-w-[1000px] border-t border-gray-200 mt-auto py-8"
      />
    </>
  )
}
