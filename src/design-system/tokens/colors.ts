// Camada 1 — Tokens de Cor Semântica (R-12)
// Baseado nas CSS variables de src/app/globals.css

export const COLORS = {
  // Superfície
  surfaceBase: 'rgb(var(--telemetry-base) / <alpha-value>)',
  surfaceCard: 'rgb(var(--telemetry-card) / <alpha-value>)',
  surfaceElevated: 'rgb(var(--telemetry-elevated) / <alpha-value>)',
  surfaceActive: 'rgb(var(--telemetry-active) / <alpha-value>)',
  surfaceBorder: 'rgb(var(--telemetry-border) / <alpha-value>)',

  // Texto
  textPrimary: 'rgb(var(--telemetry-text-primary) / <alpha-value>)',
  textMuted: 'rgb(var(--telemetry-text-muted) / <alpha-value>)',

  // Ação / Marca
  brandPrimary: 'rgb(var(--telemetry-blue) / <alpha-value>)',
  brandPrimaryHover: 'rgb(var(--telemetry-blue-light) / <alpha-value>)',
  brandVolt: 'rgb(var(--telemetry-volt) / <alpha-value>)',

  // Feedback
  feedbackError: 'rgb(var(--telemetry-error) / <alpha-value>)',
  feedbackAlert: 'rgb(var(--telemetry-alert) / <alpha-value>)',
  feedbackAlertLight: 'rgb(var(--telemetry-alert-light) / <alpha-value>)',

  // Court
  courtClay: 'rgb(var(--telemetry-court-clay) / <alpha-value>)',
  courtGrass: 'rgb(var(--telemetry-court-grass) / <alpha-value>)',
  courtHard: 'rgb(var(--telemetry-court-hard) / <alpha-value>)',
} as const;

export type ColorToken = keyof typeof COLORS;
