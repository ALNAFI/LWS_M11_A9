import "./globals.css";
import AuthProvider from "./components/auth/AuthProvider";
import { CartProvider } from "./context/CartContext";

export const metadata = {
  title: "Gadgets BD - Premium Tech Marketplace",
  description: "Buy and Sell Premium Tech Products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-amazon-background text-amazon-text flex flex-col min-h-screen">
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
