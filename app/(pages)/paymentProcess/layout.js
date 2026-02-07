export const metadata = {
    title: "Payment Process - Gadgets BD",
    description: "Buy and Sell Premium Tech Products",
  };
  
  export default function PaymentProcessLayout({ children }) {
    return (
      <div className="bg-[#F0F2F2] min-h-screen text-amazon-text flex flex-col">
        {children}
      </div>
    );
  }
  