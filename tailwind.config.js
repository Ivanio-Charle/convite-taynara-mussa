/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FDFBF7',
          100: '#F7F3EE',
          200: '#EFE8DE',
          300: '#E4D7C7',
          400: '#CDBAA3',
          500: '#B09B82',
        },
        blush: {
          50: '#FAF4F2',
          100: '#F7EBE8',
          200: '#F1D5D0',
          300: '#E8B4B8',
          400: '#DA8A92',
          500: '#C7636E',
        },
        champagne: {
          100: '#F9F5EC',
          200: '#EFE6D3',
          300: '#DFCFAB',
          400: '#D4AF37',
          500: '#C5A059',
          600: '#9E7D37',
        },
        ocean: {
          700: '#1F3A56',
          800: '#14273E',
          900: '#0C1829',
        },
        charcoal: {
          800: '#3A3230',
          900: '#2C2523',
        }
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'Inter', 'sans-serif'],
        script: ['var(--font-alex-brush)', 'cursive'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'float-slow': 'float-slow 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      }
    },
  },
  plugins: [],
}
