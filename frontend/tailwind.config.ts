import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050B18',
          900: '#070F22',
          850: '#0A142B',
          800: '#0D1A35',
          700: '#122344',
          600: '#1A2F57',
        },
        teal: {
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
        },
        violet: {
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(45, 212, 191, 0.45)',
        'glow-violet': '0 0 40px -8px rgba(139, 92, 246, 0.45)',
        glass: '0 24px 60px -20px rgba(0, 0, 0, 0.65)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #2DD4BF 0%, #14B8A6 45%, #8B5CF6 100%)',
        'brand-gradient-soft':
          'linear-gradient(135deg, rgba(45,212,191,0.16) 0%, rgba(139,92,246,0.16) 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.75' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.5s ease-out both',
        float: 'float 7s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 5s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
