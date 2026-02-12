import React from "react";
import dynamic from "next/dynamic";
import { Footer } from "./components/common";
import CategoriesSection from "./components/home/CategoriesSection";

const BrandSection = dynamic(
  () => import("./components/home/BrandSection"),
  { ssr: false }
);
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
