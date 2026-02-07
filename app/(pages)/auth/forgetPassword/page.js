import React from 'react'
import Footer from '@/app/components/paymentProcess/Footer'
import {
  AuthLogo,
  ForgetPasswordForm,
  ForgetPasswordHelpSection,
} from '@/app/components/auth/forgetPassword'

export default function ForgetPasswordPage() {
  return (
    <>
      <AuthLogo />
      <ForgetPasswordForm />
      <ForgetPasswordHelpSection />
      <Footer
        copyrightText="1996-{{year}}, GadgetsBD.com, Inc. or its affiliates"
        className="w-full max-w-[1000px] border-t border-gray-200 mt-auto py-8"
      />
    </>
  )
}
