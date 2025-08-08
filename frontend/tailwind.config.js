/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // fixed path
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
