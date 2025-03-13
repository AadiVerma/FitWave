/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      "space": ["Space Grotesk", "sans-serif"],
    },
    extend: {
      boxShadow: {
        'text-glow': '0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.3)',
      },
      animation: {
        slideIn: 'slideIn 1s ease-out forwards',  // Add custom animation
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)' }, // Start from the left
          '100%': { transform: 'translateX(0)' },   // End at the normal position
        },
      },
    },
  },
  plugins: [],
}

