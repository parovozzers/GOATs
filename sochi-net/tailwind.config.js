/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: {
          base: '#000000',
          surface: '#080808',
          card: '#0f0f0f',
          hover: '#161616',
        },
        border: {
          DEFAULT: '#1f1f1f',
          light: '#2a2a2a',
        },
        primary: {
          DEFAULT: '#ffffff',
          light: '#ffffff',
          dark: '#e5e5e5',
        },
        accent: {
          DEFAULT: '#a3a3a3',
          light: '#d4d4d4',
          dark: '#737373',
        },
        success: '#22c55e',
        warning: '#eab308',
        danger: '#ef4444',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #ffffff 0%, #a3a3a3 100%)',
        'gradient-dark': 'linear-gradient(180deg, #000000 0%, #080808 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        'glow-white': 'radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'spin-reverse': 'spin-reverse 18s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'spin-reverse': {
          from: { transform: 'rotateX(75deg) rotateZ(0deg)' },
          to: { transform: 'rotateX(75deg) rotateZ(-360deg)' },
        },
      },
    },
  },
  plugins: [],
}
