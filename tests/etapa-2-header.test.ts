import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SITE_CONFIG, buildSignupUrl } from '../src/config/site.config.ts';
import { hashToId, pickActiveSection } from '../src/lib/scroll-spy.ts';
import { oppositeTheme, resolveTheme, THEME_INIT_SCRIPT, THEME_STORAGE_KEY } from '../src/lib/theme.ts';

const ORDER = ['o-que-e', 'como-funciona', 'para-quem'];

test('Scroll-spy: sem interseção, nenhuma seção ativa', () => {
  assert.equal(pickActiveSection(ORDER, new Set()), null);
});

test('Scroll-spy: uma seção visível fica ativa', () => {
  assert.equal(pickActiveSection(ORDER, new Set(['como-funciona'])), 'como-funciona');
});

test('Scroll-spy: com duas seções visíveis vence a que está entrando (a posterior)', () => {
  assert.equal(pickActiveSection(ORDER, new Set(['o-que-e', 'como-funciona'])), 'como-funciona');
});

test('Scroll-spy: ids fora do menu são ignorados', () => {
  assert.equal(pickActiveSection(ORDER, new Set(['hero'])), null);
});

test('Menu: hashes únicos, com "#", e na mesma ordem da página', () => {
  const ids = SITE_CONFIG.navLinks.map((link) => hashToId(link.href));
  assert.ok(SITE_CONFIG.navLinks.every((link) => link.href.startsWith('#')));
  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual(ids, ['o-que-e', 'como-funciona', 'para-quem', 'telemetria', 'faq']);
});

test('Tema: preferência salva vence o dispositivo; sem ela, segue o dispositivo', () => {
  assert.equal(resolveTheme('dark', true), 'dark');
  assert.equal(resolveTheme('light', false), 'light');
  assert.equal(resolveTheme(null, true), 'light');
  assert.equal(resolveTheme(null, false), 'dark');
  assert.equal(resolveTheme('azul', true), 'light', 'valor inválido é ignorado');
});

test('Tema: alternância e script anti-flash usam a mesma chave', () => {
  assert.equal(oppositeTheme('dark'), 'light');
  assert.equal(oppositeTheme('light'), 'dark');
  assert.ok(THEME_INIT_SCRIPT.includes(THEME_STORAGE_KEY));
});

test('Header: CTA "Criar conta" envia origem=lp_header', () => {
  assert.ok(buildSignupUrl({ origem: 'lp_header' }).endsWith('/signup?origem=lp_header'));
});
