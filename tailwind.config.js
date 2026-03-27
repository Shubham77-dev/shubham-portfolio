/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        dark: {
          bg:      '#080B12',
          bg2:     '#0D1017',
          bg3:     '#121620',
          surface: '#181D27',
        },
        accent: {
          DEFAULT: '#5B8BFF',
          hi:      '#85AAFF',
          dim:     'rgba(91,139,255,0.10)',
        },
        cyan: {
          DEFAULT: '#30E5D0',
          dim:     'rgba(48,229,208,0.09)',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [],
}
