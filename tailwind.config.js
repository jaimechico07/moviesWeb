/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{html,ts}"],
  theme: {
    extend: {
      keyframes: {
        scaleUpDown: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
      },
      animation: {
        scaleUpDown: 'scaleUpDown 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
