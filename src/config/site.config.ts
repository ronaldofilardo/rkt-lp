import { SEO } from './seo.config';
import { COMPANY } from './entity.config';

export type UserProfile = 'ATLETA' | 'TREINADOR' | 'GESTOR' | 'ESPECTADOR';

/** Sufijo canônico das tags de título (`template` do root layout). Marca canônica: RKT. */
export const TITLE_SUFFIX = ' | RKT';

export function formatTitle(base: string): string {
  return `${base}${TITLE_SUFFIX}`;
}

export interface SignupUrlParams {
  perfil?: UserProfile;
  origem: string;
}

export const SITE_CONFIG = {
  name: 'RKT Tennis',
  tagline: 'Telemetria e Inteligência Tática no Tênis',
  description: SEO.description,
  seoTitle: SEO.title,
  supportEmail: COMPANY.supportEmail,
  defaultAppUrl: 'https://sistema.rkt-app.com',
  defaultCanonicalUrl: 'https://rkt-app.com',
  navLinks: [
    { label: 'O que é', href: '#o-que-e' },
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Para Quem', href: '#para-quem' },
    { label: 'Telemetria', href: '#telemetria' },
    { label: 'FAQ', href: '#faq' },
  ],
} as const;

export function getAppBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!envUrl) return SITE_CONFIG.defaultAppUrl;
  return envUrl.replace(/\/+$/, '');
}

export function getCanonicalUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_CANONICAL_URL;
  if (!envUrl) return SITE_CONFIG.defaultCanonicalUrl;
  return envUrl.replace(/\/+$/, '');
}

export function buildSignupUrl(params: SignupUrlParams): string {
  const baseUrl = getAppBaseUrl();
  const searchParams = new URLSearchParams();
  if (params.perfil) {
    searchParams.set('perfil', params.perfil);
  }
  searchParams.set('origem', params.origem);
  return `${baseUrl}/signup?${searchParams.toString()}`;
}

export function buildLoginUrl(): string {
  return `${getAppBaseUrl()}/login`;
}

export function buildTermsUrl(): string {
  return `${getAppBaseUrl()}/termos`;
}

export function buildPrivacyUrl(): string {
  return `${getAppBaseUrl()}/privacidade`;
}

export function buildSupportMailto(subject?: string): string {
  const base = `mailto:${SITE_CONFIG.supportEmail}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}
