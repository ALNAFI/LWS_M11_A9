/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 80s linear infinite',
      },
      colors: {
        amazon: {
          background: "#E3E6E6",
          light: "#232F3E",
          DEFAULT: "#131921",
          text: "#333333",
          blue: "#007185",
          orange: "#C7511F",
          yellow: "#FFD814",
          yellow_hover: "#F7CA00",
          secondary: "#FFA41C",
          secondary_hover: "#FA8900",
        },
      },
      fontFamily: {
        sans: ["Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
