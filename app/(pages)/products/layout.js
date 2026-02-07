export const metadata = {
  title: "Products - Gadgets BD",
  description: "Buy and Sell Premium Tech Products",
};

export default function ProductsLayout({ children }) {
  return (
    <div className="bg-[#FFFFFF] min-h-screen text-amazon-text flex flex-col">
      {children}
    </div>
  );
}
