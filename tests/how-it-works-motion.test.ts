import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const read = (p: string) => readFileSync(join(root, p), 'utf8');

test('ProgressBall.tsx existe e está estruturado conforme especificação', () => {
  const path = 'src/components/how-it-works/ProgressBall.tsx';
  assert.ok(existsSync(join(root, path)), 'ProgressBall deve existir');
  const src = read(path);
  assert.ok(src.includes('progress-ball'));
  assert.ok(src.includes('bg-telemetry-volt'));
});

test('globals.css possui animações e keyframes da Fase 3 (Linha Viva)', () => {
  const css = read('src/app/globals.css');
  const required = [
    'step-count-pop',
    'line-scroll-fill',
    'ball-scroll-travel',
    'how-progress-line',
    'how-progress-fill',
    'progress-ball',
    'step-item-active',
  ];
  for (const token of required) {
    assert.ok(css.includes(token), `deve conter ${token} em globals.css`);
  }
});

test('prefers-reduced-motion neutraliza linha e bola animadas', () => {
  const css = read('src/app/globals.css');
  const reducedIndex = css.indexOf('@media (prefers-reduced-motion: reduce)');
  assert.ok(reducedIndex !== -1);
  const reduced = css.slice(reducedIndex);

  assert.ok(reduced.includes('.how-progress-line .how-progress-fill'));
  assert.ok(reduced.includes('.how-progress-line .progress-ball'));
  assert.ok(reduced.includes('.step-item-active .step-number'));
});

test('ProgressLine.tsx move checagem de reduced-motion para useEffect', () => {
  const src = read('src/components/how-it-works/ProgressLine.tsx');
  assert.ok(!/const reducedMotion\s*=\s*typeof window !== 'undefined'/.test(src),
    'não deve checar window no corpo da função');
  assert.ok(src.includes('useEffect'));
  assert.ok(src.includes('matchMedia'));
  assert.ok(src.includes('<ProgressBall'));
});

test('StepItem.tsx integra useInViewOnce e classes do passo', () => {
  const src = read('src/components/how-it-works/StepItem.tsx');
  assert.ok(src.includes('useInViewOnce'));
  assert.ok(src.includes('step-item-active'));
  assert.ok(src.includes('step-number'));
});

