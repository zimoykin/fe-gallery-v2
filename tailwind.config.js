/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-col": `var(--main-cl)`,
        "secondary-col": `var(--secondary-cl)`,
        "main-bg": `var(--main-bg)`,
        "main-bg-75": `var(--main-bg-75)`,
        "secondary-bg": `var(--secondary-bg)`,
        "secondary-bg-75": `var(--secondary-bg-75)`,
        "primary-bg": `var(--primary-bg)`,
        "primary-cl": `var(--primary-cl)`,
      },
      maxWidth: {
        "normal-screen": "1280px",
      },
    },
  },
  plugins: [],
};
