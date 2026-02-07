export const metadata = {
    title: "Shopping Cart - Gadgets BD",
    description: "Buy and Sell Premium Tech Products",
  };
  
  export default function CartLayout({ children }) {
    return (
      <div className="bg-[#EAEDED] min-h-screen text-amazon-text flex flex-col">
        {children}
      </div>
    );
  }
  