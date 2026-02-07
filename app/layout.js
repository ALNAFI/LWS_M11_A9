import "./globals.css";

export const metadata = {
  title: "Gadgets BD - Premium Tech Marketplace",
  description: "Buy and Sell Premium Tech Products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-amazon-background text-amazon-text flex flex-col min-h-screen">{children}</body>
    </html>
  );
}
