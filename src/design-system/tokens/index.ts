// Facade imutável de tokens do Design System (R-12)
// Re-exporta todos os tokens em um único ponto de acesso

import { COLORS } from './colors';
import { TYPOGRAPHY } from './typography';
import { SPACING } from './spacing';
import { RADII } from './radii';

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './radii';

export const DESIGN_SYSTEM_TOKENS = {
  colors: COLORS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
  radii: RADII,
} as const;
