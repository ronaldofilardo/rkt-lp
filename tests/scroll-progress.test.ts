import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const read = (p: string) => readFileSync(join(root, p), 'utf8');

test('ScrollProgressBar: componente existe e está configurado corretamente', () => {
  const componentPath = join(root, 'src/components/layout/ScrollProgressBar.tsx');
  assert.ok(existsSync(componentPath), 'Arquivo ScrollProgressBar.tsx deve existir');

  const content = read('src/components/layout/ScrollProgressBar.tsx');
  assert.ok(content.includes("'use client'"), 'Deve ser um client component');
  assert.ok(content.includes('aria-hidden="true"'), 'Deve ter aria-hidden="true"');
  assert.ok(content.includes('fixed top-0'), 'Deve ficar fixo no topo');
  assert.ok(content.includes('z-[100]'), 'Deve ter z-index alto para ficar acima de headers');
  assert.ok(content.includes('scroll-progress-track'), 'Deve usar classe do track de rolagem');
  assert.ok(content.includes('scroll-progress-fill'), 'Deve usar classe do preenchimento');
  assert.ok(content.includes('scaleX'), 'Deve usar transform scaleX para performance');

  const css = read('src/app/globals.css');
  assert.ok(css.includes('.scroll-progress-track'), 'CSS deve definir track com visibilidade no escuro');
  assert.ok(css.includes('.scroll-progress-fill'), 'CSS deve definir gradiente e brilho volt');
  assert.ok(css.includes('CCFF00'), 'CSS deve conter volt neon #CCFF00');
  assert.ok(css.includes('animation-timeline: scroll(root)'), 'CSS deve usar animation-timeline nativo');
});

test('Layout: inclui ScrollProgressBar no topo do body', () => {
  const layout = read('src/app/layout.tsx');
  assert.ok(layout.includes("import { ScrollProgressBar } from '@/components/layout/ScrollProgressBar'"));
  assert.ok(layout.includes('<ScrollProgressBar />'));
  const bodyIdx = layout.indexOf('<body');
  const barIdx = layout.indexOf('<ScrollProgressBar />');
  assert.ok(barIdx > bodyIdx, 'ScrollProgressBar deve estar dentro do body');
});
