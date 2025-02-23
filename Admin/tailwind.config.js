/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enables dark mode based on class
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        foreground: "var(--foreground)",
        background: "var(--background)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          dark: "var(--primary-dark)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        border: "var(--border)",
        error: {
          DEFAULT: "var(--error)",
          foreground: "var(--error-foreground)",
        },
        link: "var(--link)",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        sm: "calc(var(--radius) - 25%)",
        md: "calc(var(--radius) + 0.10rem)",
        lg: "calc(var(--radius) + 0.25rem)",
      },
    },
  },
  plugins: [],
};
