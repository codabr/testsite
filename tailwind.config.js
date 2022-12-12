/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        "hs-black": "#0f172a",
        "hs-gray": "#334155",
        "hs-blue": "#003B5C",
        "hs-text": "#444444",
        "hs-heading": "#222222",
        "hs-light": "#F5F5F5",
        "hs-bg": "#ECF1F8",
      },
      fontSize: {
        pageTitle: "60px",
        bannerText: "18px",
        title: "50px",
        mobileTitle: "40px",
        text: "12px",
      },
      animation: {
        fade: "fadeIn 1s ease-in",
        slideRight: "slideRight 1s ease-in",
        slideUp: "slideUp 1s ease-out",
      },
      keyframes: (theme) => ({
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideRight: {
          "0%": { opacity: 0, marginLeft: "-30%" },
          "100%": { opacity: 1, marginLeft: "0" },
        },
        slideUp: {
          "0%": { opacity: 0, marginBottom: "-10%" },
          "25%": { opacity: 0 },
          "50%": { opacity: 0.1 },
          "75%": { opacity: 0.5 },
          "100%": { opacity: 1, marginBottom: "0" },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate")],
};
