import React from "react";
import { AuthLogo } from "@/app/components/auth/forgetPassword";
import {
  LoginForm,
  AuthDivider,
  CreateAccountCta,
} from "@/app/components/auth/login";
import AuthBackButton from "@/app/components/auth/AuthBackButton";
import Footer from "@/app/components/paymentProcess/Footer";

export default function LoginPage() {
  return (
    <>
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-[400px] flex justify-start">
          <AuthBackButton />
        </div>
        <AuthLogo />
        <LoginForm />
        <AuthDivider />
        <CreateAccountCta />
      </div>
      <Footer
        className="w-full border-t border-gray-300 bg-gray-50 mt-auto"
        innerClassName="max-w-[1000px] mx-auto py-6 px-4 text-center text-xs text-gray-600"
      />
    </>
  );
}
