/**
 * theme-fade-transition.test.ts
 *
 * Verifica que a transição global de tema (claro ↔ escuro) foi implementada
 * corretamente em globals.css, sem quebrar os overrides de interação existentes
 * nem o bloco prefers-reduced-motion.
 *
 * Runner: Node.js test runner nativo (node:test) — mesmo padrão do projeto.
 * Não requer DOM, browser ou dependências extras.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const css = readFileSync(join(root, 'src/app/globals.css'), 'utf8');

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

/**
 * Retorna o conteúdo de todos os blocos @media (prefers-reduced-motion: reduce)
 * concatenados, para facilitar asserções de cobertura.
 */
function reducedMotionContent(): string {
  return css
    .split('@media (prefers-reduced-motion: reduce)')
    .slice(1)
    .join('\n');
}

/**
 * Encontra a posição (índice de caractere) da primeira ocorrência de `marker`
 * em `source`. Lança se não encontrar.
 */
function posOf(source: string, marker: string, label: string): number {
  const idx = source.indexOf(marker);
  assert.ok(idx >= 0, `Esperado encontrar "${label}" em globals.css`);
  return idx;
}

// ─────────────────────────────────────────────────────────────
// Bloco 1 — Presença do bloco global de transição de tema
// ─────────────────────────────────────────────────────────────

describe('Bloco global de transição de tema', () => {
  test('seletor * está presente', () => {
    // O bloco deve cobrir *, *::before e *::after
    assert.ok(
      css.includes('*,') && css.includes('*::before,') && css.includes('*::after'),
      'Seletor global *, *::before, *::after deve estar declarado'
    );
  });

  test('transition inclui background-color com duração de 2s', () => {
    assert.match(
      css,
      /background-color\s+2s\s+ease/,
      'transition deve incluir background-color 2s ease'
    );
  });

  test('transition inclui color com duração de 2s', () => {
    assert.match(
      css,
      /\bcolor\s+2s\s+ease/,
      'transition deve incluir color 2s ease'
    );
  });

  test('transition inclui border-color com duração de 2s', () => {
    assert.match(
      css,
      /border-color\s+2s\s+ease/,
      'transition deve incluir border-color 2s ease'
    );
  });

  test('transition inclui fill com duração de 2s', () => {
    assert.match(css, /\bfill\s+2s\s+ease/, 'transition deve incluir fill 2s ease');
  });

  test('transition inclui stroke com duração de 2s', () => {
    assert.match(css, /\bstroke\s+2s\s+ease/, 'transition deve incluir stroke 2s ease');
  });

  test('transition inclui box-shadow com duração de 2s', () => {
    assert.match(css, /box-shadow\s+2s\s+ease/, 'transition deve incluir box-shadow 2s ease');
  });

  test('bloco global aparece após o bloco body (ordem de cascata correta)', () => {
    // Usa indexOf de strings simples sem quebras de linha para ser agnóstico
    // a \n vs \r\n (Windows / Unix).
    const bodyPos   = posOf(css, 'body {', 'body {');
    // O seletor global sempre começa com "*," seguido de espaço ou quebra de linha.
    // Localizamos via regex para não depender do tipo de EOL.
    const globalMatch = css.match(/\*,[\r\n]+\*::before,[\r\n]+\*::after/);
    assert.ok(globalMatch?.index !== undefined, 'Seletor global *, *::before, *::after deve existir');
    assert.ok(
      globalMatch!.index! > bodyPos,
      'Bloco global de transition deve vir após o bloco body'
    );
  });

  test('bloco global aparece antes do primeiro @keyframes (não polui animações)', () => {
    const globalMatch = css.match(/\*,[\r\n]+\*::before,[\r\n]+\*::after/);
    assert.ok(globalMatch?.index !== undefined, 'Seletor global *, *::before, *::after deve existir');
    const keyframePos = posOf(css, '@keyframes', '@keyframes');
    assert.ok(
      globalMatch!.index! < keyframePos,
      'Bloco global de transition deve aparecer antes dos @keyframes'
    );
  });
});

// ─────────────────────────────────────────────────────────────
// Bloco 2 — Overrides de interação (não devem herdar 2s)
// ─────────────────────────────────────────────────────────────

describe('Overrides de interação', () => {
  test('button e a têm override de transition com var(--rkt-dur-fast)', () => {
    // Deve existir um bloco "button, a" ou "button," com --rkt-dur-fast
    assert.ok(
      css.includes('button,') && css.includes('--rkt-dur-fast'),
      'button e a devem ter override usando --rkt-dur-fast'
    );
  });

  test('.faq-body tem override com !important para grid-template-rows', () => {
    // Busca ocorrência de .faq-body com !important — garante que o override
    // prevalece sobre o * global
    const faqOverrideRegex = /\.faq-body\s*\{[^}]*grid-template-rows[^}]*!important/s;
    assert.match(css, faqOverrideRegex, '.faq-body deve ter !important no override de transition');
  });

  test('.hero-cta-button tem override com !important', () => {
    const heroCtaRegex = /\.hero-cta-button\s*\{[^}]*!important/s;
    assert.match(css, heroCtaRegex, '.hero-cta-button deve ter !important no override');
  });

  test('.scroll-progress-fill tem override com transition: transform 75ms', () => {
    const fillOverrideRegex = /\.scroll-progress-fill\s*\{[^}]*transform\s+75ms[^}]*!important/s;
    assert.match(
      css,
      fillOverrideRegex,
      '.scroll-progress-fill deve ter override com transform 75ms !important'
    );
  });

  test('.scroll-progress-track tem override com --rkt-dur-base', () => {
    const trackOverrideRegex = /\.scroll-progress-track\s*\{[^}]*--rkt-dur-base[^}]*!important/s;
    assert.match(
      css,
      trackOverrideRegex,
      '.scroll-progress-track deve ter override de transition com --rkt-dur-base !important'
    );
  });

  test('.hero-serve-card tem override de transition', () => {
    const serveCardRegex = /\.hero-serve-card\s*\{[^}]*!important/s;
    assert.match(css, serveCardRegex, '.hero-serve-card deve ter !important no override');
  });
});

// ─────────────────────────────────────────────────────────────
// Bloco 3 — prefers-reduced-motion cobre a transition global
// ─────────────────────────────────────────────────────────────

describe('prefers-reduced-motion', () => {
  test('bloco prefers-reduced-motion existe', () => {
    const reduced = reducedMotionContent();
    assert.ok(reduced.length > 0, 'Deve existir pelo menos um bloco prefers-reduced-motion');
  });

  test('bloco prefers-reduced-motion zera transition-duration com !important', () => {
    const reduced = reducedMotionContent();
    assert.ok(
      reduced.includes('transition-duration: 0.01ms !important'),
      'prefers-reduced-motion deve zerar transition-duration com !important'
    );
  });

  test('bloco prefers-reduced-motion usa seletor * para cobrir o override global', () => {
    // O seletor "*, ::before, ::after" deve aparecer dentro de um bloco reduced-motion
    const reduced = reducedMotionContent();
    assert.ok(
      reduced.includes('*, ::before, ::after') || reduced.includes('*,\n  ::before'),
      'prefers-reduced-motion deve usar seletor * para cobrir transition global'
    );
  });

  test('transition-duration 0.01ms aparece antes de qualquer transition: 2s (prioridade correta)', () => {
    // O bloco reduced-motion (que zera) deve aparecer APÓS o bloco global (que define 2s),
    // garantindo que !important o sobrescreve pela cascata normal.
    const globalPos  = posOf(css, 'background-color 2s ease', 'background-color 2s ease');
    const reducedPos = posOf(css, 'transition-duration: 0.01ms', 'transition-duration: 0.01ms');
    assert.ok(
      reducedPos > globalPos,
      'Bloco de zeragem (0.01ms) deve aparecer após a declaração global de 2s na cascata'
    );
  });
});

// ─────────────────────────────────────────────────────────────
// Bloco 4 — Integridade do arquivo (regressão)
// ─────────────────────────────────────────────────────────────

describe('Integridade do globals.css', () => {
  test('tokens de movimento continuam definidos', () => {
    const tokens = [
      '--rkt-ease-rally',
      '--rkt-ease-bounce',
      '--rkt-ease-exit',
      '--rkt-dur-fast',
      '--rkt-dur-base',
      '--rkt-dur-slow',
    ];
    for (const token of tokens) {
      assert.ok(css.includes(token), `Token ${token} deve continuar definido`);
    }
  });

  test('variáveis de tema dark continuam definidas em :root', () => {
    const darkVars = [
      '--telemetry-base',
      '--telemetry-card',
      '--telemetry-text-primary',
      '--telemetry-text-muted',
      '--telemetry-volt',
      '--telemetry-blue',
    ];
    const rootBlock = css.slice(css.indexOf(':root {'), css.indexOf('}', css.indexOf(':root {')));
    for (const v of darkVars) {
      assert.ok(rootBlock.includes(v), `Variável ${v} deve estar no bloco :root`);
    }
  });

  test('variáveis de tema light continuam definidas em html[data-theme="light"]', () => {
    const lightBlock = css.slice(
      css.indexOf('html[data-theme="light"]'),
      css.indexOf('}', css.indexOf('html[data-theme="light"]'))
    );
    assert.ok(lightBlock.includes('--telemetry-base'), 'tema light deve definir --telemetry-base');
    assert.ok(lightBlock.includes('--telemetry-text-primary'), 'tema light deve definir --telemetry-text-primary');
  });

  test('ThemeToggle.tsx não foi alterado — lógica de toggle intacta', () => {
    const toggle = readFileSync(join(root, 'src/components/telemetry-ui/ThemeToggle.tsx'), 'utf8');
    assert.ok(
      toggle.includes("document.documentElement.setAttribute('data-theme', theme)"),
      'applyTheme deve continuar usando setAttribute — sem lógica de animação JS'
    );
    assert.ok(
      toggle.includes("localStorage.setItem(THEME_STORAGE_KEY, next)"),
      'toggle deve continuar persistindo o tema no localStorage'
    );
  });

  test('lib/theme.ts não foi alterado — exports intactos', () => {
    const theme = readFileSync(join(root, 'src/lib/theme.ts'), 'utf8');
    assert.ok(theme.includes('THEME_STORAGE_KEY'), 'deve exportar THEME_STORAGE_KEY');
    assert.ok(theme.includes('THEME_INIT_SCRIPT'), 'deve exportar THEME_INIT_SCRIPT');
    assert.ok(theme.includes('resolveTheme'), 'deve exportar resolveTheme');
    assert.ok(theme.includes('oppositeTheme'), 'deve exportar oppositeTheme');
  });

  test('layout.tsx não foi alterado — THEME_INIT_SCRIPT continua no head', () => {
    const layout = readFileSync(join(root, 'src/app/layout.tsx'), 'utf8');
    assert.ok(
      layout.includes('THEME_INIT_SCRIPT'),
      'layout deve injetar THEME_INIT_SCRIPT no head para evitar flash de tema'
    );
    assert.ok(
      layout.includes('suppressHydrationWarning'),
      'html deve ter suppressHydrationWarning para evitar mismatch SSR/client'
    );
  });

  test('nenhum @keyframes foi removido por acidente', () => {
    const keyframes = [
      'reveal-up', 'hero-enter-a', 'hero-enter-b', 'hero-float',
      'court-breathe', 'line-draw', 'ball-trace', 'ball-glow-pulse', 'ball-trail',
      'pc-rally-line', 'pc-impact-ring', 'pc-impact-dot',
      'pc-ripple', 'pc-dot-pulse', 'pc-data-run', 'pc-bar-grow',
      'pillar-pulse', 'pillar-ring', 'pillar-bar',
      'step-glow', 'step-count-pop', 'line-scroll-fill', 'ball-scroll-travel',
      'hero-chip-in', 'hero-word-wipe',
      'scoreboard-row-slide', 'winner-volt-pulse',
      'tab-fade-in', 'telemetry-badge-glow',
      'audience-tab-fade',
      'marquee-scroll',
      'cta-gradient', 'btn-pulse-ring', 'btn-volt-shimmer',
      'team-fade-up',
      'tennisBallFall',
      'grow-x',
    ];
    for (const kf of keyframes) {
      assert.ok(css.includes(`@keyframes ${kf}`), `@keyframes ${kf} não deve ter sido removido`);
    }
  });
});
