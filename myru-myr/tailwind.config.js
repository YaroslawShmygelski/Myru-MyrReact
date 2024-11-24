module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        press: {
          "0%": {
            transform: "scale(1)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
          "50%": {
            transform: "scale(0.95)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          },
          "100%": {
            transform: "scale(1)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
        },
      },
      animation: {
        press: "press 0.25s ease-in-out",
      },
      colors: {
        customBlue: "#2667FF", // Blue color
        customBlue700: "#1A53CC", // Action blue
        mainText: "#363842",
      },
      boxShadow: {
        bottom: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Bottom shadow only
      },
      fontSize: {
        xxs: "0.7rem",
      },
    },
  },
  plugins: [],
};
