export const metadata = {
    title: "Your Orders - Gadgets BD",
    description: "Buy and Sell Premium Tech Products",
  };
  
  export default function BookingsLayout({ children }) {
    return (
      <div className="bg-[#FFFFFF] min-h-screen text-amazon-text flex flex-col">
        {children}
      </div>
    );
  }
  