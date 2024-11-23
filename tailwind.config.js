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
      backgroundImage: {
        'gradient-hero': 'linear-gradient(180deg, #04152d00, #212529 80%)',
        'gradient-hero_2': 'linear-gradient(270deg, #04152d00, #212529 73.5%)',
      },
    },
  },
  plugins: [],
};
