export const metadata = {
    title: "Sign In - Gadgets BD",
    description: "Buy and Sell Premium Tech Products",
  };
  
  export default function LoginLayout({ children }) {
    return (
      <div className="bg-[#FFFFFF] text-amazon-text flex flex-col min-h-screen items-center pt-8">
        {children}
      </div>
    );
  }
  