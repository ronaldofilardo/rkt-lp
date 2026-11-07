import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const read = (p: string) => readFileSync(join(root, p), 'utf8');

test('AudienceTable.tsx possui classes de hover reativo e indicador lateral volt', () => {
  const src = read('src/components/audience/AudienceTable.tsx');
  assert.ok(src.includes('audience-table-row'));
  assert.ok(src.includes('group-hover:translate-x-0.5'));
  assert.ok(src.includes('bg-telemetry-volt'));
  assert.ok(src.includes('group-hover:opacity-100'));
});

test('AudienceTabs.tsx aplica audience-tab-pane com crossfade na troca', () => {
  const src = read('src/components/audience/AudienceTabs.tsx');
  assert.ok(src.includes('audience-tab-pane'));
  assert.ok(src.includes('key={card.id}'));
});

test('AudienceCard.tsx utiliza requestAnimationFrame e easing do tênis', () => {
  const src = read('src/components/audience/AudienceCard.tsx');
  assert.ok(src.includes('requestAnimationFrame'));
  assert.ok(src.includes('cancelAnimationFrame'));
  assert.ok(src.includes('duration-[240ms]'));
  assert.ok(src.includes('cubic-bezier(0.22,1,0.36,1)'));
});

test('globals.css possui animação audience-tab-fade e fallback reduced-motion', () => {
  const css = read('src/app/globals.css');
  assert.ok(css.includes('audience-tab-fade'));
  assert.ok(css.includes('audience-tab-pane'));

  const reduced = css.slice(css.indexOf('@media (prefers-reduced-motion: reduce)'));
  assert.ok(reduced.includes('.audience-tab-pane'));
  assert.ok(reduced.includes('.audience-table-row'));
});

