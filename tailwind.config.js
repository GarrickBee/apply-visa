/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "neon-green": "#11fbfb",
        "light-gray": "#c9d3e7",
      },
      fontFamily: {
        "roboto-mono": "Roboto Mono, monospace",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("flowbite/plugin")],
};
