export const metadata = {
    title: "Create Review - Gadgets BD",
    description: "Buy and Sell Premium Tech Products",
  };
  
  export default function ShopLayout({ children }) {
    return (
      <div className="bg-[#EAEDED] text-amazon-text flex flex-col min-h-screen">
        {children}
      </div>
    );
  }
  