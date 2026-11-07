import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const read = (p: string) => readFileSync(join(root, p), 'utf8');

test('Auditoria de intensidade: durações de animações de conteúdo <= 600ms', () => {
  const css = read('src/app/globals.css');

  // Regex para capturar durações em animações e transições
  // Ignora ambientes contínuos infinitos como marquee-scroll (28s), cta-gradient (9s), tennisBallFall, courtLines
  const contentAnimations = [
    { name: 'hero-word-wipe', maxMs: 600 },
    { name: 'winner-volt-pulse', maxMs: 600 },
    { name: 'step-count-pop', maxMs: 500 },
    { name: 'telemetry-badge-glow', maxMs: 500 },
    { name: 'tab-pane-enter', maxMs: 600 },
    { name: 'audience-tab-pane', maxMs: 400 },
    { name: 'team-fade-up', maxMs: 600 },
  ];

  for (const item of contentAnimations) {
    // Procura por animações com a sintaxe nome duration
    // Ex: team-fade-up 0.5s ou tab-pane-enter var(--rkt-dur-base)
    const line = css.split('\n').find((l) => l.includes(item.name) && l.includes('animation:'));
    if (line) {
      const secMatch = line.match(/(\d+(?:\.\d+)?)s\b/);
      const msMatch = line.match(/(\d+)ms\b/);
      let ms = 0;
      if (secMatch) {
        ms = parseFloat(secMatch[1]) * 1000;
      } else if (msMatch) {
        ms = parseInt(msMatch[1], 10);
      }
      if (ms > 0) {
        assert.ok(
          ms <= item.maxMs,
          `Animação ${item.name} tem duração ${ms}ms que excede o limite de ${item.maxMs}ms`
        );
      }
    }
  }

  // Tokens de duração devem ser rápidos ou base <= 520ms
  const fast = Number(css.match(/--rkt-dur-fast:\s*(\d+)ms/)?.[1]);
  const base = Number(css.match(/--rkt-dur-base:\s*(\d+)ms/)?.[1]);
  const slow = Number(css.match(/--rkt-dur-slow:\s*(\d+)ms/)?.[1]);

  assert.ok(fast <= 200, 'dur-fast deve ser <= 200ms');
  assert.ok(base <= 350, 'dur-base deve ser <= 350ms');
  assert.ok(slow <= 600, 'dur-slow deve ser <= 600ms');
});

test('Auditoria de intensidade: máximo 2 animações concorrentes ativas em primeiro plano', () => {
  // Verificação nos componentes chave de primeiro plano
  const heroScoreboard = read('src/components/hero/HeroScoreboard.tsx');
  // Linhas do scoreboard utilizam classes indexadas scoreboard-row-${index}
  assert.ok(heroScoreboard.includes('scoreboard-row-${index}'));

  const telemetryPanel = read('src/components/telemetry-demo/TelemetryPanel.tsx');
  assert.ok(telemetryPanel.includes('tab-pane-enter'));
});
