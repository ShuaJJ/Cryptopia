import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'social': 'url(/background.png)'
      },
      colors: {
        'gray-bgd': '#F6F9FB',
        'gray-dark': '#E8F0F4',
        'blue-light': '#06F3F7',
        'blue-dark': '#032F96'
      }
    },
  },
  plugins: [],
}
export default config
