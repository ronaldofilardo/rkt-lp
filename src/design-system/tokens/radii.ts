// Camada 1 — Tokens de Raios de Borda (R-12)
// Baseado no tailwind.config.ts borderRadius

export const RADII = {
  'radius-sm': '12px',
  'radius-md': '16px',
  'radius-lg': '20px',
  'radius-xl': '24px',
  'radius-pill': '9999px',
} as const;

export type RadiusToken = keyof typeof RADII;
