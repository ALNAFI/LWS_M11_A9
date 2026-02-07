import React from "react";
import { Navbar, Footer } from "@/app/components/common";
import Breadcrumbs from "@/app/components/common/Breadcrumbs";
import RelatedProducts from "@/app/components/details/RelatedProducts";
import ImageGallery from "@/app/components/details/ImageGallery";
import ProductInfo from "@/app/components/details/ProductInfo";
import BuyBox from "@/app/components/details/BuyBox";
import TabsSection from "@/app/components/details/TabsSection";
export default function DetailsPage() {
  return (
    <>
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 max-w-[1500px] mx-auto w-full p-4">
        {/* Breadcrumbs */}
        <Breadcrumbs />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Image Gallery */}
          <ImageGallery />

          {/* Center: Product Info */}
          <ProductInfo />

          {/* Right: Buy Box */}
          <BuyBox />
        </div>

        {/* Tabs Section */}
        <TabsSection />

        {/* Related Products */}
        <RelatedProducts />
      </main>

      <Footer />
    </>
  );
}
