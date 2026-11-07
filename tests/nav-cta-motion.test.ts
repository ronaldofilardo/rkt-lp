import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const read = (p: string) => readFileSync(join(root, p), 'utf8');

test('FAQ está configurado em 3 colunas e ocupa container amplo', () => {
  const src = read('src/components/faq/FAQ.tsx');
  assert.ok(src.includes('md:grid-cols-3'), 'deve ter 3 colunas em tela md/desktop');
  assert.ok(!src.includes('max-w-2xl'), 'não deve restringir o container de 3 colunas a max-w-2xl');
});

test('FinalCTA alinha elementos sem deslocamento órfão', () => {
  const src = read('src/components/cta/FinalCTA.tsx');
  assert.ok(src.includes('max-w-2xl space-y-4'));
  assert.ok(!src.includes('mx-auto mt-3 max-w-xl text-3xl'));
});

test('Header e HeaderNav possuem suporte a scroll reativo e pílula de navegação', () => {
  const header = read('src/components/layout/Header.tsx');
  assert.ok(header.includes('window.scrollY > 40'));
  assert.ok(header.includes('scrolled'));

  const nav = read('src/components/layout/HeaderNav.tsx');
  assert.ok(nav.includes('nav-active'));
  assert.ok(nav.includes('aria-current'));
});

test('MobileStickyCTA possui animação com overshoot bounce', () => {
  const cta = read('src/components/cta/MobileStickyCTA.tsx');
  assert.ok(cta.includes('cubic-bezier(0.34,1.4,0.64,1)'));
});

test('globals.css possui animações da Fase 7 (volt shimmer e gradient)', () => {
  const css = read('src/app/globals.css');
  assert.ok(css.includes('btn-volt-shimmer'));
  assert.ok(css.includes('cta-gradient'));
  assert.ok(css.includes('will-change: background-position'));
});

