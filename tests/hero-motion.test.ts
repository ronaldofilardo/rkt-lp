import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const read = (p: string) => readFileSync(join(root, p), 'utf8');

test('globals.css define animações da Fase 2 (Hero: Abertura de Partida)', () => {
  const css = read('src/app/globals.css');
  const requiredClasses = [
    'hero-chip',
    'hero-chip-1',
    'hero-chip-2',
    'hero-chip-3',
    'hero-word-wipe',
    'hero-word-wipe-delay',
    'hero-cta-button',
    'scoreboard-animated',
    'scoreboard-row-0',
    'scoreboard-row-1',
    'winner-pulse',
    'hero-serve-card',
    'serve-stat-line',
    'court-parallax-layer',
  ];

  for (const cls of requiredClasses) {
    assert.ok(css.includes(cls), `deve conter classe ou seletor ${cls}`);
  }
});

test('prefers-reduced-motion neutraliza animações novas do Hero', () => {
  const css = read('src/app/globals.css');
  const reducedIndex = css.indexOf('@media (prefers-reduced-motion: reduce)');
  assert.ok(reducedIndex !== -1, 'deve existir bloco prefers-reduced-motion');
  const reduced = css.slice(reducedIndex);

  assert.ok(reduced.includes('.hero-chip'), 'reduced-motion deve cobrir .hero-chip');
  assert.ok(reduced.includes('.hero-word-wipe'), 'reduced-motion deve cobrir .hero-word-wipe');
  assert.ok(reduced.includes('.scoreboard-animated'), 'reduced-motion deve cobrir scoreboard');
  assert.ok(reduced.includes('.court-parallax-layer'), 'reduced-motion deve cobrir court parallax');
});

test('Hero.tsx aplica classes de stagger e wipe sem split de texto quebrando SEO', () => {
  const hero = read('src/components/hero/Hero.tsx');
  assert.ok(hero.includes('hero-chip-1'));
  assert.ok(hero.includes('hero-chip-2'));
  assert.ok(hero.includes('hero-chip-3'));
  assert.ok(hero.includes('hero-word-wipe'));
  assert.ok(hero.includes('hero-cta-button'));
  assert.ok(hero.includes('<span className="hero-word-wipe text-telemetry-volt">RKT</span>'));
});

test('HeroScoreboard.tsx integra useInViewOnce e classes de animação', () => {
  const sb = read('src/components/hero/HeroScoreboard.tsx');
  assert.ok(sb.includes("'use client'"));
  assert.ok(sb.includes('useInViewOnce'));
  assert.ok(sb.includes('scoreboard-animated'));
  assert.ok(sb.includes('winner-pulse'));
});

test('HeroServeCard.tsx integra classes de hover reativo', () => {
  const sc = read('src/components/hero/HeroServeCard.tsx');
  assert.ok(sc.includes('hero-serve-card'));
  assert.ok(sc.includes('serve-stat-line'));
  assert.ok(sc.includes('serve-stat-label'));
});

