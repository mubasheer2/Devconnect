/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        background: "var(--bg-primary)",
        surface: "var(--bg-secondary)",
        primary: "var(--primary-color)",
        "base-content": "var(--text-primary)",
        "secondary-content": "var(--text-secondary)",
        border: "var(--border-color)",

        /* ✅ ADD THIS */
        "card-bg": "var(--card-bg)",

        "neon-purple": "#a855f7",
        "neon-blue": "#3b82f6",
      },

      boxShadow: {
        neon: "0 0 10px rgba(37, 99, 235, 0.5), 0 0 20px rgba(37, 99, 235, 0.3)",
      },
    },
  },

  plugins: [],
};
