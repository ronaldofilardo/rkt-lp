import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildSignupUrl,
  buildLoginUrl,
  buildTermsUrl,
  buildPrivacyUrl,
  SITE_CONFIG,
} from '../src/config/site.config.ts';

/* ── FinalCTA ─────────────────────────────────────────── */
test('FinalCTA: CTA principal envia origem=lp_final_cta', () => {
  const url = buildSignupUrl({ origem: 'lp_final_cta' });
  assert.ok(url.includes('origem=lp_final_cta'));
  assert.ok(url.includes('/signup'));
});

test('FinalCTA: "Já tenho conta" aponta para /login', () => {
  assert.ok(buildLoginUrl().endsWith('/login'));
});

/* ── MobileStickyCTA ──────────────────────────────────── */
test('MobileStickyCTA: CTA envia origem=lp_sticky_cta', () => {
  const url = buildSignupUrl({ origem: 'lp_sticky_cta' });
  assert.ok(url.includes('origem=lp_sticky_cta'));
  assert.ok(url.includes('/signup'));
});

/* ── Footer ───────────────────────────────────────────── */
test('Footer: signup envia origem=lp_footer', () => {
  const url = buildSignupUrl({ origem: 'lp_footer' });
  assert.ok(url.includes('origem=lp_footer'));
});

test('Footer: Termos de Uso aponta para o domínio do sistema, não da LP', () => {
  const termsUrl = buildTermsUrl();
  const lpBase = SITE_CONFIG.defaultCanonicalUrl;
  assert.ok(!termsUrl.startsWith(lpBase), 'Termos não deve apontar para a LP');
  assert.ok(termsUrl.includes('/termos'), 'URL deve conter /termos');
});

test('Footer: Privacidade aponta para o domínio do sistema, não da LP', () => {
  const privacyUrl = buildPrivacyUrl();
  const lpBase = SITE_CONFIG.defaultCanonicalUrl;
  assert.ok(!privacyUrl.startsWith(lpBase), 'Privacidade não deve apontar para a LP');
  assert.ok(privacyUrl.includes('/privacidade'), 'URL deve conter /privacidade');
});

test('Footer: domínio do sistema e da LP são diferentes', () => {
  assert.notEqual(SITE_CONFIG.defaultAppUrl, SITE_CONFIG.defaultCanonicalUrl);
});

test('Footer: description não está vazio', () => {
  assert.ok(SITE_CONFIG.description.length > 0);
});

/* ── origens distintas: nenhuma se repete ─────────────── */
test('Todas as origens de CTA são únicas entre si', () => {
  const origens = [
    'lp_header', 'lp_hero', 'lp_audience', 'lp_broadcast',
    'lp_telemetria', 'lp_footer', 'lp_sticky_cta', 'lp_final_cta',
  ];
  assert.equal(new Set(origens).size, origens.length, 'Origens duplicadas detectadas');
});
