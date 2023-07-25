/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        allyMinionAttack: {
          "25%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5rem)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        allyMinionAttack: "allyMinionAttack 0.5s ease-out",
      },
    },
  },
  variants: {
    extend: {},
  },
};
