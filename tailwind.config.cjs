module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "route-enter": {
          from: { opacity: "0", transform: "translateY(5px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "route-enter": "route-enter 180ms ease-out both",
      },
    },
  },
  plugins: [],
};