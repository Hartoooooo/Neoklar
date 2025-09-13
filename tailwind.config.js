/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neo: {
          50: '#f0f3ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        cyber: {
          50: '#edfaff',
          100: '#d6f2ff',
          200: '#b5e9ff',
          300: '#83dcff',
          400: '#48c5ff',
          500: '#1ea7ff',
          600: '#0689ff',
          700: '#0070f3',
          800: '#085bc4',
          900: '#0d4d9a',
          950: '#0e305d',
        },
        quantum: {
          50: '#f0fdf9',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        futura: ['Futura', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-cyber': 'linear-gradient(45deg, #0070f3, #1ea7ff, #22c55e, #6366f1)',
        'gradient-neo': 'radial-gradient(ellipse at center, #1e1b4b 0%, #0e305d 50%, #052e16 100%)',
        'mesh-gradient': 'radial-gradient(circle at 20% 80%, #6366f1 0%, transparent 50%), radial-gradient(circle at 80% 20%, #1ea7ff 0%, transparent 50%), radial-gradient(circle at 40% 40%, #22c55e 0%, transparent 50%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'morph': 'morph 8s ease-in-out infinite',
        'grid': 'grid 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { 'box-shadow': '0 0 20px #6366f1' },
          '100%': { 'box-shadow': '0 0 40px #1ea7ff, 0 0 60px #22c55e' },
        },
        morph: {
          '0%, 100%': { 'border-radius': '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { 'border-radius': '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        grid: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neo': '0 0 50px rgba(99, 102, 241, 0.3)',
        'cyber': '0 0 30px rgba(30, 167, 255, 0.5)',
        'quantum': '0 0 40px rgba(34, 197, 94, 0.4)',
      }
    },
  },
  plugins: [],
}
