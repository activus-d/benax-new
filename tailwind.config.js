/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '400px',
      extraSm: '500px',
      md: '750px',
      // => @media (min-width: 640px) { ... }
      xl: '1024px',
      // => @media (min-width: 1024px) { ... }
      lg: '1280px',
      // => @media (min-width: 1280px) { ... }
      "2xl": '1300px',
      "3xl": '1900px',
    },
    extend: {
      colors: {
        "lightGrey": "#6c6c6c",
        "veryLightGrey": "#e2e4e3",
        "deepBlue": "#031F3C",
        "veryDeepBlue": "#031E39",
        "fav": "#2C474B",
      },
      backgroundSize: {
        "100%": "100% 100%",
        "35%": "30% 35%"
      },
      keyframes: {
        scale: {
          from: { transform: 'scale(1.2)' },
          to: { transform: 'scale(1.2)' },
        }
      },
      animation: {
        scale: 'scale 1s ease-in-out infinite',
      },
      fontFamily: {
        'logo': ["'Teko', sans-serif"]
      },
    },
  },
  plugins: [
     require("@tailwindcss/forms")({
      strategy: 'class',
     })
  ],
}
