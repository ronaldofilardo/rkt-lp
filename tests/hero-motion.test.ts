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

test('Hero.tsx exibe o replay demonstrativo no CTA no lugar dos cards', () => {
  const hero = read('src/components/hero/Hero.tsx');
  const replay = read('src/components/hero/HeroMatchReplay.tsx');
  const matchReplay = read('src/components/telemetry-demo/MatchReplay.tsx');
  const page = read('src/app/page.tsx');

  assert.ok(hero.includes('<HeroMatchReplay />'));
  assert.ok(!hero.includes('HeroArtifacts'));
  assert.ok(replay.includes('onReportClick={() => setModalOpen(true)}'));
  assert.ok(matchReplay.includes('{onReportClick && ('));
  assert.ok(!page.includes('TelemetryDemo'));
  assert.ok(!page.includes('<TelemetryDemo />'));
});

test('Hero alinha o replay ao título para que a altura cresça para baixo', () => {
  const hero = read('src/components/hero/Hero.tsx');
  const page = read('src/app/page.tsx');

  assert.ok(hero.includes('md:col-start-1 md:row-start-3'));
  assert.ok(hero.includes('md:col-start-2 md:row-start-3 md:row-span-3'));
  assert.ok(hero.includes('min-h-[90vh] overflow-hidden'));
  assert.ok(!hero.includes('absolute'));
  assert.ok(page.indexOf('<Hero />') < page.indexOf('<KeyTakeaways />'));
});

test('MatchReplay destaca o confronto e alinha botão ao status da partida', () => {
  const replay = read('src/components/telemetry-demo/MatchReplay.tsx');
  const events = read('src/components/telemetry-demo/ReplayEvent.tsx');
  const statusRow = replay.slice(
    replay.indexOf('<div className="flex items-center justify-between gap-3">'),
    replay.indexOf('{/* ── Placar'),
  );

  assert.ok(statusRow.includes('Ao vivo'));
  assert.ok(statusRow.includes('onClick={onReportClick}'));
  assert.ok(replay.includes('text-center'));
  assert.ok(replay.includes('font-mono text-base font-semibold'));
  assert.ok(replay.includes('<span className="text-telemetry-text-primary">{p1.name}</span>'));
  assert.ok(replay.includes('<span className="text-telemetry-volt">{p2.name}</span>'));
  assert.ok(replay.includes('text-telemetry-volt">{p2.name}</p>'));
  assert.ok(replay.includes('Último ponto'));
  assert.ok(replay.includes('justify-between gap-3 border-b'));
  assert.ok(events.includes("event.winner === 'p1' ? 'text-left' : 'text-right'"));
  assert.ok(events.includes("event.winner === 'p1' ? 'justify-start' : 'justify-end'"));
  assert.ok(events.includes("event.winner === 'p1' ? 'text-telemetry-text-primary' : 'text-telemetry-volt'"));
  assert.ok(events.includes('font-mono text-sm text-telemetry-text-primary'));
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
