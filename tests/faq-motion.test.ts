import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const read = (p: string) => readFileSync(join(root, p), 'utf8');

test('FaqItem.tsx encapsula parágrafo de resposta com wrapper animado .faq-body', () => {
  const src = read('src/components/faq/FaqItem.tsx');
  assert.ok(src.includes('faq-body'));
  assert.ok(src.includes('faq-chevron'));
  assert.ok(src.includes('overflow-hidden'));
  assert.ok(src.split('\n').length <= 100);
});

test('globals.css possui transição de grid-template-rows e regra exit-faster-than-enter', () => {
  const css = read('src/app/globals.css');
  assert.ok(css.includes('.faq-body'));
  assert.ok(css.includes('grid-template-rows: 0fr'));
  assert.ok(css.includes('details[open] .faq-body'));
  assert.ok(css.includes('grid-template-rows: 1fr'));
  assert.ok(css.includes('var(--rkt-dur-fast)'));
  assert.ok(css.includes('var(--rkt-dur-base)'));
});

test('prefers-reduced-motion remove transições do FAQ', () => {
  const css = read('src/app/globals.css');
  const reduced = css.slice(css.indexOf('@media (prefers-reduced-motion: reduce)'));
  assert.ok(reduced.includes('.faq-body'));
  assert.ok(reduced.includes('.faq-chevron'));
});

