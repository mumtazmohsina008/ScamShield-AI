/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          950: '#070a12',
          900: '#0B0F19',
          850: '#101726',
          800: '#162035',
          700: '#1E2C48',
          600: '#2C3E63',
          accent: '#00F0FF',
          shield: '#3B82F6',
          danger: '#FF3366',
          warning: '#F59E0B',
          success: '#10B981',
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -5px rgba(0, 240, 255, 0.35)',
        'glow-danger': '0 0 25px -5px rgba(255, 51, 102, 0.4)',
        'glow-shield': '0 0 25px -5px rgba(59, 130, 246, 0.35)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 3s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
}
