/** @type {import('tailwindcss').Config} */

//eslint-disable-next-line
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Roboto Mono, monospace",
    },
    extend: {
      fontSize: {
        huge: ["80rem", { lineHeight: "1" }],
      },
      height: {
        screen: "100dvh",
      },

      colors: {
        Color1OnBoarding: "#FD813D",
        Color2OnBoarding: "#E47986",
        Color3OnBoarding: "#CF72C0",
        Color4OnBoarding: "#BC6FFB",
      },
    },
  },
  plugins: [],
};
