import Footer from "@/app/components/paymentProcess/Footer";
import Header from "@/app/components/paymentProcess/Header";
import PaymentMethod from "@/app/components/paymentProcess/PaymentMethod";
import OrderSummary from "@/app/components/paymentProcess/OrderSummary";
import ProductsList from "@/app/components/paymentProcess/ProductsList";
import AddressSummary from "@/app/components/paymentProcess/AddressSummary";
import React from "react";

export default function PaymentProcessPage() {
  return (
    <>
      {/* Minimal Header */}
      <Header />

      {/* Content */}
      <main className="checkout-container flex-1 py-10 px-4 flex flex-col lg:flex-row gap-8">
        {/* Left Side: Steps */}
        <div className="flex-1 space-y-6">
          {/* 1. Shipping Address Summary */}
          <AddressSummary />

          {/* 2. Selected Products List */}
          <ProductsList />

          {/* 3. Payment Method */}
          <PaymentMethod />
        </div>

        {/* Right Side: Order Summary */}
        <OrderSummary />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
