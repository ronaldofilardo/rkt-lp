import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const read = (p: string) => readFileSync(join(root, p), 'utf8');

test('varre globals.css e valida cobertura de prefers-reduced-motion para keyframes', () => {
  const css = read('src/app/globals.css');

  // Encontra todos os nomes de @keyframes
  const keyframeRegex = /@keyframes\s+([a-zA-Z0-9_-]+)/g;
  const keyframes = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = keyframeRegex.exec(css)) !== null) {
    keyframes.add(match[1]);
  }

  assert.ok(keyframes.size >= 10, 'deve ter pelo menos 10 @keyframes definidos');

  // Coleta todos os blocos @media (prefers-reduced-motion: reduce)
  const reducedMotionBlocks: string[] = [];
  const mediaRegex = /@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)\s*\{([\s\S]*?)(?=\n\s*@media|\n\s*\/\* ═══|\n\s*\}\s*$)/g;
  while ((match = mediaRegex.exec(css)) !== null) {
    reducedMotionBlocks.push(match[1]);
  }

  // Também pega o bloco geral de prefers-reduced-motion se houver
  const joinedReduced = css
    .split('@media (prefers-reduced-motion: reduce)')
    .slice(1)
    .join('\n');

  assert.ok(joinedReduced.length > 0, 'deve haver blocos prefers-reduced-motion em globals.css');

  // Lista dos keyframes das fases de motion design da LP
  const motionKeyframes = [
    'hero-chip-in',
    'hero-word-wipe',
    'scoreboard-row-slide',
    'winner-volt-pulse',
    'court-exit-parallax',
    'step-glow',
    'step-count-pop',
    'line-scroll-fill',
    'ball-scroll-travel',
    'tab-fade-in',
    'telemetry-badge-glow',
    'audience-tab-fade',
    'marquee-scroll',
    'cta-gradient',
    'btn-volt-shimmer',
    'btn-pulse-ring',
  ];

  for (const kf of motionKeyframes) {
    assert.ok(keyframes.has(kf), `@keyframes ${kf} deve estar definido em globals.css`);
  }

  // Garante que classes/efeitos vinculados a animação são neutralizados em reduced-motion
  const requiredNeutralizations = [
    '.reveal',
    '.hero-chip',
    '.hero-word-wipe',
    '.scoreboard-animated',
    '.court-parallax-layer',
    '.step-circle',
    '.progress-ball',
    '.tab-pane-enter',
    '.tab-indicator',
    '.momentum-dot',
    '.audience-tab-pane',
    '.audience-card',
    '.faq-body',
    '.faq-chevron',
    '.final-cta-bg',
    '.btn-cta-primary',
    '.marquee-track',
  ];

  for (const selector of requiredNeutralizations) {
    assert.ok(
      joinedReduced.includes(selector),
      `seletor ${selector} deve ser neutralizado no bloco prefers-reduced-motion`
    );
  }
});

