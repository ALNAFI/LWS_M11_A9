import {
  Footer,
  Navbar,
  ResultsHeader,
  SidebarFilters,
} from "@/app/components/common";
import ProductGrid from "@/app/components/product/ProductGrid";

import React from "react";

export default function ProductsPage() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 max-w-[1500px] mx-auto w-full p-4">
        {/* Results Header */}
        <ResultsHeader />

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <SidebarFilters />

          {/* Product Grid */}
          <ProductGrid />
        </div>
      </main>

      <Footer />
    </>
  );
}
