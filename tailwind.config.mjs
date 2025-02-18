/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        title: "#050505",
        subTitle: "#333",
        primaryBtn: "rgba(0, 0, 0, 0.90)",
        lightGreen: "#B9FF66",
        borderColor: "#191A23",
        gray: "#F3F3F3",
        footerBg: "#292A32",
        solid: "#443F3F",
        white: "#fff",
        graySlide:"#BBB",
        placeholderText:"#898989",
        darkForm:"#292A32",
        darkFormHover:"#1F2027"
      },
      boxShadow: {
        raised:
          "0px 2px 4px -2px rgba(0, 0, 0, 0.08), 0px 4px 8px -2px rgba(0, 0, 0, 0.04)",
      },
      screens: {
        custom: "869px",
      },
      lineHeight: {
        64: "64px",
      },
      spacing: {
        60: "60px",
        120: "120px",
        50: "50px",
      },
      backgroundImage: {
        // Note: Adjust the path to your image if needed.
        'blog-card': "linear-gradient(180deg, rgba(25,26,35,0) 0.12%, rgba(25,26,35,0.49) 48.59%, #191A23 99.88%), lightgray url('/images/blog/blog-card.png') 50% / cover no-repeat",
      },
      
    },
  },
  plugins: [],
};
