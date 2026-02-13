import "./globals.css";
import React, { Suspense } from "react";
import AuthProvider from "./components/auth/AuthProvider";
import { CartProvider } from "./context/CartContext";
import NavbarWrapper from "./components/common/NavbarWrapper";
import { getMetadataForPath } from "./config/metadata";
import { headers } from "next/headers";

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";
  return getMetadataForPath(pathname);
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-amazon-background text-amazon-text flex flex-col min-h-screen">
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={null}>
              <NavbarWrapper />
            </Suspense>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
