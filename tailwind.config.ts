import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pinkLight: "#ffeef7",
        pinkMain: "#ff2d7a",
      },
      boxShadow: {
        card: "0 12px 25px rgba(18, 18, 18, 0.06)",
      },
      borderRadius: {
        "xl-2": "18px",
      },
    },
  },
  plugins: [],
};

export default config;
