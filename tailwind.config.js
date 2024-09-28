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
        "danger-bg": `var(--danger-bg)`,
        "danger-cl": `var(--danger-cl)`,
        "command-panel-bg": `var(--command-panel-bg)`,
        "highlight-bg": `var(--highlight-bg)`,
        "highlight-bg-75": `var(--highlight-bg-75)`,
        "highlight-cl": "var(--highlight-cl)",
      },
      maxWidth: {
        "normal-screen": "1600px",
      },
      scale: {
        101: "1.01",
        102: "1.02",
        103: "1.03",
        104: "1.04",
      },
      textShadow: {
        default: "2px 2px 0 rgba(0, 0, 0, 0.7)",
        md: "3px 3px 0 rgba(0, 0, 0, 0.7)",
        lg: "4px 4px 0 rgba(0, 0, 0, 0.7)",
      },
    },
  },
  plugins: [require("tailwindcss-textshadow")],
};
