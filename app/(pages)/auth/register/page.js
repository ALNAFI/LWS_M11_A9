import React from "react";
import { AuthLogo } from "@/app/components/auth/forgetPassword";
import { RegisterForm } from "@/app/components/auth/register";
import Footer from "@/app/components/paymentProcess/Footer";

export default function RegisterPage() {
  return (
    <>
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <AuthLogo />
        <RegisterForm />
      </div>
      <Footer
        className="w-full border-t border-gray-300 bg-gray-50 mt-auto"
        innerClassName="max-w-[1000px] mx-auto py-6 px-4 text-center text-xs text-gray-600"
      />
    </>
  );
}
