/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        oksap: {
          primary: 'rgb(var(--oksap-primary) / <alpha-value>)',
          accent: 'rgb(var(--oksap-accent) / <alpha-value>)',
          navy: 'rgb(var(--oksap-navy) / <alpha-value>)',
          silver: 'rgb(var(--oksap-silver) / <alpha-value>)',
          dark: 'rgb(var(--oksap-dark) / <alpha-value>)',
          light: 'rgb(var(--oksap-background) / <alpha-value>)',
          lightgray: 'rgb(var(--oksap-primary) / <alpha-value>)',
          mediumgray: 'rgb(var(--oksap-accent) / <alpha-value>)',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}