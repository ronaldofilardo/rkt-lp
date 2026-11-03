// Camada 1 — Tokens de Tipografia (R-12)
// Baseado no tailwind.config.ts e globals.css

export const TYPOGRAPHY = {
  fontFamily: {
    display: ['Haas Groot Disp', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
    body: ['Haas', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
    mono: ['ui-monospace', 'SF Mono', 'Cascadia Code', 'Segoe UI Mono', 'monospace'],
  },
  fontSize: {
    'xs-extra': ['10px', { lineHeight: '1.2' }],
    'sm-extra': ['11px', { lineHeight: '1.3' }],
    xs: ['0.75rem', { lineHeight: '1' }],
    sm: ['0.875rem', { lineHeight: '1.25' }],
    base: ['1rem', { lineHeight: '1.5' }],
    lg: ['1.125rem', { lineHeight: '1.75' }],
    xl: ['1.25rem', { lineHeight: '1.75' }],
    '2xl': ['1.5rem', { lineHeight: '2' }],
    '3xl': ['1.875rem', { lineHeight: '2.25' }],
    '4xl': ['2.25rem', { lineHeight: '2.5' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  lineHeight: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
  },
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
  },
} as const;

export type FontSizeToken = keyof typeof TYPOGRAPHY.fontSize;
export type FontWeightToken = keyof typeof TYPOGRAPHY.fontWeight;
