import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const read = (p: string) => readFileSync(join(root, p), 'utf8');

test('TabIndicator.tsx existe e respeita R-03', () => {
  const path = 'src/components/telemetry-demo/TabIndicator.tsx';
  assert.ok(existsSync(join(root, path)));
  const src = read(path);
  assert.ok(src.includes('tab-indicator'));
  assert.ok(src.includes('bg-telemetry-volt'));
  assert.ok(src.split('\n').length <= 100);
});

test('StatBar.tsx inicia em width: 0% e preenche com useInViewOnce', () => {
  const src = read('src/components/telemetry-demo/StatBar.tsx');
  assert.ok(src.includes('useInViewOnce'));
  assert.ok(src.includes("inView ? `${p1Pct}%` : '0%'"));
  assert.ok(src.includes('duration-[520ms]'));
  assert.ok(src.includes('aria-label'));
});

test('TelemetryPanel.tsx utiliza TabIndicator e classes de crossfade tab-pane-enter', () => {
  const src = read('src/components/telemetry-demo/TelemetryPanel.tsx');
  assert.ok(src.includes('TabIndicator'));
  assert.ok(src.includes('tab-pane-enter'));
  assert.ok(src.split('\n').length <= 100, 'TelemetryPanel deve respeitar R-03');
});

test('MomentumDots.tsx integra useInViewOnce e transição sequencial por ponto', () => {
  const src = read('src/components/telemetry-demo/MomentumDots.tsx');
  assert.ok(src.includes('useInViewOnce'));
  assert.ok(src.includes('momentum-dot'));
  assert.ok(src.includes('transitionDelay'));
});

test('globals.css possui estilos e neutralização da Fase 4', () => {
  const css = read('src/app/globals.css');
  assert.ok(css.includes('tab-fade-in'));
  assert.ok(css.includes('tab-pane-enter'));
  assert.ok(css.includes('telemetry-header-badge'));

  const reduced = css.slice(css.indexOf('@media (prefers-reduced-motion: reduce)'));
  assert.ok(reduced.includes('.tab-pane-enter'));
  assert.ok(reduced.includes('.tab-indicator'));
  assert.ok(reduced.includes('.momentum-dot'));
});

