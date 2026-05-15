/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sys: {
          bg: 'var(--sys-bg)',
          panel: 'rgba(255, 255, 255, 0.03)',
          cyan: '#06b6d4',
          purple: '#8b5cf6',
          darkPurple: '#7c3aed',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}