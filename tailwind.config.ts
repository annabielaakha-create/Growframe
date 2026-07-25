import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#06040C',
          soft: '#0A0614',
          raised: '#100A1E',
        },
        violet: {
          50: '#F5F0FF',
          100: '#EDE4FF',
          200: '#DCCBFF',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#4C1D95',
          900: '#2E1065',
        },
        chalk: '#F6F4FB',
        muted: '#A79DBE',
      },
      fontFamily: {
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        // floors are set for a 320px viewport — no clipped or overflowing display type
        display: ['clamp(2.6rem, 8.8vw, 10rem)', { lineHeight: '0.94', letterSpacing: '-0.04em' }],
        headline: ['clamp(1.95rem, 5vw, 4.75rem)', { lineHeight: '1.05', letterSpacing: '-0.032em' }],
        title: ['clamp(1.35rem, 2.6vw, 2.35rem)', { lineHeight: '1.18', letterSpacing: '-0.022em' }],
      },
      screens: {
        xs: '400px',
      },
      borderRadius: {
        glass: '28px',
        pill: '999px',
      },
      backdropBlur: {
        glass: '14px',
      },
      boxShadow: {
        glass:
          'inset 0 1px 0 0 rgba(255,255,255,0.18), inset 0 -1px 0 0 rgba(255,255,255,0.05), 0 32px 80px -32px rgba(0,0,0,0.85)',
        'glass-hover':
          'inset 0 1px 0 0 rgba(255,255,255,0.28), inset 0 -1px 0 0 rgba(255,255,255,0.08), 0 44px 110px -30px rgba(76,29,149,0.7)',
        glow: '0 24px 70px -18px rgba(124,58,237,0.65)',
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.22, 1, 0.36, 1)',
        smooth: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-22px) rotate(2deg)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(4%, -6%, 0) scale(1.1)' },
          '66%': { transform: 'translate3d(-5%, 4%, 0) scale(0.95)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 50%' },
          '100%': { backgroundPosition: '-200% 50%' },
        },
        blink: {
          '50%': { opacity: '0.2' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        drift: 'drift 26s ease-in-out infinite',
        marquee: 'marquee 42s linear infinite',
        'marquee-slow': 'marquee 70s linear infinite',
        shimmer: 'shimmer 6s linear infinite',
        blink: 'blink 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
