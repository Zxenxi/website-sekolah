import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Di v4, theme didefinisikan di CSS, jadi bagian theme di sini kosong.
  theme: {},
  plugins: [], // Kosongkan plugins untuk sementara
}

export default config