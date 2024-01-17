/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        baseColor: "#65412C",
      },
      animation: {
        main: "up 0.5s ease-in 1 forwards",
      },
      keyframes: {
        up: {
          "0%": { transform: "translate(0,24rem)" },
          "100%": { transform: "translate(0,0)" },
        },
      },
    },
  },
  plugins: [],
};
