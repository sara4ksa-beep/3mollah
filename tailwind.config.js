/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'cairo': ['var(--font-cairo)', 'sans-serif'],
        'inter': ['var(--font-inter)', 'sans-serif'],
        'poppins': ['var(--font-poppins)', 'sans-serif'],
        'sans': ['var(--font-cairo)', 'sans-serif'],
        'arabic': ['var(--font-cairo)', 'sans-serif'],
        'english': ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: 'var(--font-cairo)',
            h1: {
              fontFamily: 'var(--font-cairo)',
              fontWeight: '700',
            },
            h2: {
              fontFamily: 'var(--font-cairo)',
              fontWeight: '600',
            },
            h3: {
              fontFamily: 'var(--font-cairo)',
              fontWeight: '600',
            },
            h4: {
              fontFamily: 'var(--font-cairo)',
              fontWeight: '500',
            },
            h5: {
              fontFamily: 'var(--font-cairo)',
              fontWeight: '500',
            },
            h6: {
              fontFamily: 'var(--font-cairo)',
              fontWeight: '500',
            },
            p: {
              fontFamily: 'var(--font-cairo)',
              lineHeight: '1.6',
            },
            strong: {
              fontFamily: 'var(--font-cairo)',
              fontWeight: '600',
            },
            code: {
              fontFamily: 'var(--font-inter)',
            },
            pre: {
              fontFamily: 'var(--font-inter)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 