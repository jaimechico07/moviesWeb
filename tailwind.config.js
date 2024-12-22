/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{html,ts}"],
  theme: {
    extend: {
      keyframes: {
        scaleUpDown: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
        // efecto subMenuItemsMovies
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(0px)" },
          "100%": { opacity: "1", transform: "translateY(30px)" },
        },
        fadeOut: {
          "0%": { opacity: "1", transform: "translateY(30px)" },
          "100%": { opacity: "0", transform: "translateY(0px)" },
        },
      },
      colors: {
        //textos
        "primary-100": "#F8F8FF",
        "secondary-100": "#9EA2A8",
        "tertiary-100": "#dc2626",

        //fondos
        "bg-100": "#1B1B1B",
        "bg-200": "#212020",
      },
      animation: {
        scaleUpDown: "scaleUpDown 1.2s ease-in-out infinite",
        "fade-in": "fadeIn 0.5s ease-in-out forwards",
        "fade-out": "fadeOut 2.5s ease-in-out forwards",
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(180deg, #04152d00, #212529 80%)",
        "gradient-hero_2": "linear-gradient(270deg, #04152d00, #212529 73.5%)",
      },
      fontSize: {
        "dynamic-p": "clamp(0.875rem, 0.875rem + 0vw, 0.875rem);",
        "dynamic-a": "clamp(1rem, 0.9286rem + 0.3571vw, 1.25rem);",
        "dynamic-li": "clamp(1rem, 1rem + 0vw, 1rem)",
        "dynamic-h2": "clamp(1.5rem, 1.2143rem + 1.4286vw, 2.5rem);",
        "dynamic-h4": "clamp(1.125rem, 0.9107rem + 1.0714vw, 1.875rem);",
        "dynamic-h6": "clamp(1rem, 0.9286rem + 0.3571vw, 1.25rem);",
      },
    },
  },
  plugins: [],
};
