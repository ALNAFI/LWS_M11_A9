import React from 'react'
import { AuthLogo } from '@/app/components/auth/forgetPassword'
import { LoginForm, AuthDivider, CreateAccountCta } from '@/app/components/auth/login'
import Footer from '@/app/components/paymentProcess/Footer'

export default function LoginPage() {
  return (
    <>
      
        <AuthLogo />
        <LoginForm />
        <AuthDivider />
        <CreateAccountCta />
     
      <Footer
        className="w-full border-t border-gray-300 bg-gray-50"
        innerClassName="max-w-[1000px] mx-auto py-6 px-4 text-center text-xs text-gray-600"
      />
    </>
  )
}
