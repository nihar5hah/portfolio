import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['selector', '[data-theme="light"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
          elevated: 'var(--bg-elevated)',
        },
        foreground: {
          DEFAULT: 'var(--fg-primary)',
          secondary: 'var(--fg-secondary)',
          muted: 'var(--fg-muted)',
        },
        accent: {
          // Neural Brutalism: Electric indigo (works in both themes)
          DEFAULT: '#6366f1', // indigo-500
          light: '#818cf8',   // indigo-400
          dark: '#4f46e5',    // indigo-600
          glow: 'rgba(99, 102, 241, 0.4)',
        },
        border: {
          DEFAULT: 'var(--border-primary)',
          light: 'var(--border-light)',
          glass: 'var(--border-glass)',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        display: ['var(--font-display)', 'var(--font-geist-mono)', 'monospace'],
        serif: ['var(--font-serif)', 'serif'], // Instrument Serif for refined headings
      },
      backdropBlur: {
        xs: '2px',
        '2xl': '24px',
        '3xl': '32px',
      },
      animation: {
        // Legacy animations (keeping for compatibility)
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'draw': 'draw 1.5s ease-out forwards',

        // Neural Brutalism: Algorithmic, mechanical animations
        'scanline': 'scanline 8s linear infinite',
        'grid-reveal': 'gridReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'glitch': 'glitch 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite',
        'flicker': 'flicker 0.15s infinite',
        'pulse-hard': 'pulseHard 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-left': 'slideLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-right': 'slideRight 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'data-flow': 'dataFlow 20s linear infinite',
      },
      keyframes: {
        // Legacy keyframes
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(99, 102, 241, 0.6)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)' },
          '50%': { boxShadow: '0 0 35px rgba(99, 102, 241, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        draw: {
          '0%': { strokeDashoffset: '1' },
          '100%': { strokeDashoffset: '0' },
        },

        // Neural Brutalism: Algorithmic animations
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        gridReveal: {
          '0%': {
            opacity: '0',
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
          },
          '100%': {
            opacity: '1',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        pulseHard: {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.6',
            transform: 'scale(0.98)',
          },
        },
        slideLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        dataFlow: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
