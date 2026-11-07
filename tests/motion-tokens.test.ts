import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const read = (p: string) => readFileSync(join(root, p), 'utf8');

test('globals.css define todos os tokens de movimento', () => {
  const css = read('src/app/globals.css');
  const tokens = [
    '--rkt-ease-rally',
    '--rkt-ease-bounce',
    '--rkt-ease-exit',
    '--rkt-dur-fast',
    '--rkt-dur-base',
    '--rkt-dur-slow',
  ];
  for (const token of tokens) {
    assert.ok(css.includes(token), `deve definir ${token}`);
  }
});

test('tokens de duração usam ms e são estritamente crescentes', () => {
  const css = read('src/app/globals.css');
  const fast = Number(css.match(/--rkt-dur-fast:\s*(\d+)ms/)?.[1]);
  const base = Number(css.match(/--rkt-dur-base:\s*(\d+)ms/)?.[1]);
  const slow = Number(css.match(/--rkt-dur-slow:\s*(\d+)ms/)?.[1]);

  assert.ok(Number.isFinite(fast) && Number.isFinite(base) && Number.isFinite(slow));
  assert.ok(fast < base, 'fast deve ser menor que base');
  assert.ok(base < slow, 'base deve ser menor que slow');
});

test('stagger do .reveal usa animation-range, não animation-delay', () => {
  const css = read('src/app/globals.css');
  assert.ok(!/\.reveal-delay-\d\s*\{[^}]*animation-delay/.test(css),
    '.reveal-delay-* não deve depender de animation-delay');

  for (const n of [1, 2, 3]) {
    const block = css.match(new RegExp(`\\.reveal-delay-${n}\\s*\\{([^}]*)\\}`))?.[1];
    assert.ok(block, `.reveal-delay-${n} deve existir`);
    assert.ok(block.includes('animation-range'), `.reveal-delay-${n} deve usar animation-range`);
  }
});

test('stagger é progressivo: pontos de partida crescentes', () => {
  const css = read('src/app/globals.css');
  const starts = [1, 2, 3].map((n) => {
    const block = css.match(new RegExp(`\\.reveal-delay-${n}\\s*\\{([^}]*)\\}`))?.[1] ?? '';
    return Number(block.match(/entry\s*(\d+)%/)?.[1]);
  });
  assert.ok(starts[0] < starts[1] && starts[1] < starts[2],
    `pontos de partida devem crescer: ${starts.join(' < ')}`);
});

test('reveal tem fallback sem animation-timeline e respeita reduced-motion', () => {
  const css = read('src/app/globals.css');
  assert.ok(css.includes('@supports not (animation-timeline: scroll())'), 'deve ter fallback estático');

  const reduced = css.slice(css.indexOf('@media (prefers-reduced-motion: reduce)'));
  assert.ok(reduced.includes('.reveal'), 'reduced-motion deve cobrir .reveal');
});

test('useInViewOnce existe, é client component e não anima em loop', () => {
  const path = 'src/hooks/useInViewOnce.ts';
  assert.ok(existsSync(join(root, path)), 'hook deve existir');

  const src = read(path);
  assert.ok(src.includes("'use client'"), 'deve ser client component');
  assert.ok(src.includes('IntersectionObserver'), 'deve usar IntersectionObserver');
  assert.ok(src.includes('observer.disconnect()'), 'deve desconectar o observer');
  assert.ok(src.includes('setInView(true)'), 'deve ligar a flag ao entrar na viewport');
});
