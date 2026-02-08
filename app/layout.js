import "./globals.css";
import AuthProvider from "./components/auth/AuthProvider";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/common/Navbar";
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
            <Navbar />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
