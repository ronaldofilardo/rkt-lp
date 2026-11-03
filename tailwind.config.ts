import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        telemetry: {
          base: 'rgb(var(--telemetry-base) / <alpha-value>)',
          surface: 'rgb(var(--telemetry-surface) / <alpha-value>)',
          card: 'rgb(var(--telemetry-card) / <alpha-value>)',
          elevated: 'rgb(var(--telemetry-elevated) / <alpha-value>)',
          active: 'rgb(var(--telemetry-active) / <alpha-value>)',
          border: 'rgb(var(--telemetry-border) / <alpha-value>)',
          volt: 'rgb(var(--telemetry-volt) / <alpha-value>)',
          blue: {
            DEFAULT: 'rgb(var(--telemetry-blue) / <alpha-value>)',
            light: 'rgb(var(--telemetry-blue-light) / <alpha-value>)',
          },
          orange: {
            DEFAULT: 'rgb(var(--telemetry-orange) / <alpha-value>)',
            light: 'rgb(var(--telemetry-orange-light) / <alpha-value>)',
          },
          error: 'rgb(var(--telemetry-error) / <alpha-value>)',
          alert: {
            DEFAULT: 'rgb(var(--telemetry-alert) / <alpha-value>)',
            light: 'rgb(var(--telemetry-alert-light) / <alpha-value>)',
          },
          text: {
            primary: 'rgb(var(--telemetry-text-primary) / <alpha-value>)',
            muted: 'rgb(var(--telemetry-text-muted) / <alpha-value>)',
          },
          court: {
            clay: 'rgb(var(--telemetry-court-clay) / <alpha-value>)',
            grass: 'rgb(var(--telemetry-court-grass) / <alpha-value>)',
            hard: 'rgb(var(--telemetry-court-hard) / <alpha-value>)',
          },
        },
      },
      fontFamily: {
        display: ['Haas Groot Disp', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        body: ['Haas', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['ui-monospace', 'SF Mono', 'Cascadia Code', 'Segoe UI Mono', 'monospace'],
      },
      fontSize: {
        'xs-extra': ['10px', { lineHeight: '1.2' }],
        'sm-extra': ['11px', { lineHeight: '1.3' }],
      },
      borderRadius: {
        'radius-sm': '12px',
        'radius-md': '16px',
        'radius-lg': '20px',
        'radius-xl': '24px',
        'radius-pill': '9999px',
      },
      boxShadow: {
        'telemetry-float': '0 0 0 1px rgba(var(--telemetry-border), 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
        'telemetry-volt': 'var(--telemetry-glow-volt)',
        'telemetry-blue': 'var(--telemetry-glow-blue)',
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
};

export default config;

