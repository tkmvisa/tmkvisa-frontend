import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'lite-gray': '#F0F0F0',
        'dark': '#111',
        'gray-40': 'rgba(0, 0, 0, 0.4)',
        'gray-60': 'rgba(0, 0, 0, 0.6)',
        'dark-red': 'rgba(255, 51, 51, 1)',
        'lite-red': 'rgba(255, 51, 51, 0.1)'
      }
    },
  },
  plugins: [],
};
export default config;
