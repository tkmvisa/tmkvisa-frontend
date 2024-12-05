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
        'primary': `var(--primary)`,
        'pure': `var(--pure)`,
        'danger': `var(--danger)`,
        'success': `var(--success)`,
        'border': `var(--border)`,
        'light-gray': `var(--light-gray)`,
        "--text-gray" : `var(--text-gray)`,
      }
    },
  },
  plugins: [],
};
export default config;