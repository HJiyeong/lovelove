/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Ownglyph_ParkDaHyun', 'sans-serif'],
      },
      animation: {
        popupModal: "popupModal 0.35s ease-out forwards",
        wiggle: "wiggle 1s ease-in-out infinite", 
        fadeInOut: 'fadeInOut 1s ease-in-out infinite',
      },
      keyframes: {
        popupModal: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        fadeInOut: {
      '0%, 100%': { transform: "scale(1)" },
      '50%': { transform: "scale(1.1)"},
        }
      },
    },
  },
  plugins: [],
};
