// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        lato: ['var(--font-lato)'],
      },
      colors: {
        'sekolah': {
          'primary': '#0D47A1',   // Biru Tua
          'secondary': '#1976D2', // Biru Sedang
          'accent': '#FFC107',    // Kuning
          'light': '#F5F5F5',     // Abu-abu Sangat Terang
        }
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;