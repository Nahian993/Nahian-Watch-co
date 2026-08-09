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
        crown: {
          canvas: '#0B0F19',
          dark: '#0B0F19',
          surface: '#111827',
          surfaceElevated: '#172033',
          surfaceMuted: '#0F1522',
          border: 'rgba(148, 163, 184, 0.16)',
          borderStrong: 'rgba(212, 175, 55, 0.42)',
          brand: '#D4AF37',
          brandHover: '#F3E5AB',
          surfaceLight: '#1F2937',
          gold: {
            DEFAULT: '#D4AF37',
            light: '#F3E5AB',
            dark: '#B38F28',
            border: '#3A3018',
          },
          primary: '#F8FAFC',
          secondary: '#CBD5E1',
          muted: '#94A3B8',
          text: {
            main: '#F9FAFB',
            muted: '#9CA3AF',
          },
          mfs: {
            bkash: '#E2136E',
            nagad: '#F7941D',
            rocket: '#8C3494',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'Hind Siliguri', 'Noto Sans Bengali', 'sans-serif'],
        serif: ['Playfair Display', 'Noto Serif Bengali', 'Georgia', 'serif'],
        bangla: ['Hind Siliguri', 'Noto Sans Bengali', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 15px rgba(212, 175, 55, 0.25)',
        'gold-glow-lg': '0 0 25px rgba(212, 175, 55, 0.4)',
      },
    },
  },
  plugins: [],
};
