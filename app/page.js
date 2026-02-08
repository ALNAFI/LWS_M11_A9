import React from "react";
import { Footer } from "./components/common";
import BrandSection from "./components/home/BrandSection";
import CategoriesSection from "./components/home/CategoriesSection";
import WhyUsSection from "./components/home/WhyUsSection";
import HeroBanner from "./components/home/HeroBanner";
import ContentGrid from "./components/home/ContentGrid";
export default function HomePage() {
  return (
    <>
      {/* Main Content */}
      <main className="flex-1 max-w-[1500px] mx-auto w-full">
        {/* Hero Banner */}
        <HeroBanner />

        {/* Categories & Content Grid */}
        <ContentGrid />

        {/* Why Shop With Us Section */}
        <WhyUsSection />

        {/* Popular Categories Section */}
        <CategoriesSection />

        {/* Shop by Brand Section */}
        <BrandSection />
      </main>

      {/* Footer */}
      <Footer/>
    </>
  );
}
