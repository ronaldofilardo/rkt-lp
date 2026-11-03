import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();

test('TennisBallRain: componente existe e está integrado na Home', () => {
  const componentPath = join(ROOT, 'src/components/effects/TennisBallRain.tsx');
  assert.ok(existsSync(componentPath), 'TennisBallRain.tsx deve existir');

  const compContent = readFileSync(componentPath, 'utf-8');
  assert.ok(compContent.includes('targetIds'), 'deve aceitar targetIds customizáveis');
  assert.ok(compContent.includes('prefers-reduced-motion'), 'deve respeitar acessibilidade');
  assert.ok(compContent.includes('IntersectionObserver'), 'deve usar IntersectionObserver');
  assert.ok(compContent.includes('TennisBallIcon'), 'deve usar TennisBallIcon em SVG dedicado');

  const iconPath = join(ROOT, 'src/components/effects/TennisBallIcon.tsx');
  assert.ok(existsSync(iconPath), 'TennisBallIcon.tsx deve existir');

  const pagePath = join(ROOT, 'src/app/page.tsx');
  const pageContent = readFileSync(pagePath, 'utf-8');
  assert.ok(pageContent.includes('TennisBallRain'), 'Home deve importar TennisBallRain');
  assert.ok(pageContent.includes('paixao'), 'deve mirar na seção paixao');
  assert.ok(pageContent.includes('conhecimento-artigos'), 'deve mirar na seção conhecimento-artigos');
});

test('Seções alvo existem com os IDs corretos no DOM', () => {
  const paixaoPath = join(ROOT, 'src/components/emotional/Paixao.tsx');
  const paixaoContent = readFileSync(paixaoPath, 'utf-8');
  assert.ok(paixaoContent.includes('id="paixao"'), 'seção Paixao deve ter id="paixao"');

  const knowPath = join(ROOT, 'src/components/knowledge/ConhecimentoArtigos.tsx');
  const knowContent = readFileSync(knowPath, 'utf-8');
  assert.ok(
    knowContent.includes('id="conhecimento-artigos"'),
    'seção ConhecimentoArtigos deve ter id="conhecimento-artigos"'
  );
});

test('globals.css possui animação keyframes para tennisBallFall', () => {
  const cssPath = join(ROOT, 'src/app/globals.css');
  const cssContent = readFileSync(cssPath, 'utf-8');
  assert.ok(cssContent.includes('@keyframes tennisBallFall'), 'globals.css deve definir tennisBallFall');
  assert.ok(cssContent.includes('.tennis-ball-rain'), 'globals.css deve ter a classe .tennis-ball-rain');
});

