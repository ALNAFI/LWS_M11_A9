export const metadata = {
    title: "Manage Inventory - Gadgets BD Seller Central",
    description: "Buy and Sell Premium Tech Products",
  };
  
  export default function ManageListLayout({ children }) {
    return (
      <div className="bg-[#F0F2F2]  text-amazon-text flex flex-col min-h-screen">
        {children}
      </div>
    );
  }
  