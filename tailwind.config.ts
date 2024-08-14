import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        // Custom breakpoint for devices with width < 500px and height < 1000px
        'mobile-very-small': { 'raw': '(max-height: 600px) and (max-width: 400px)' },
        'tablet-medium': { 'raw': '(min-width: 500px) and (max-width: 900px) and (max-height: 1500px)' }
      },
    },
  },
  plugins: [],
};
export default config;
