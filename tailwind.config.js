/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-col": `var(--main-cl)`,
        "secondary-col": `var(--secondary-cl)`,
        "main-bg": `var(--main-bg)`,
        "secondary-bg": `var(--secondary-bg)`,
      },
      maxWidth: {
        "normal-screen": "1280px",
      },
    },
  },
  plugins: [],
};
