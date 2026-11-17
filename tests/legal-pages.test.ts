import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getLegalDoc } from '../src/lib/legal.ts';
import { buildTermsUrl, buildPrivacyUrl } from '../src/config/site.config.ts';
import { TERMOS_PAGE, PRIVACY_PAGE } from '../src/data/content/legal.data.ts';
import { SITE_PAGES } from '../src/data/content/pages.data.ts';
import { BREADCRUMBS } from '../src/data/content/breadcrumbs.data.ts';

const root = join(import.meta.dirname, '..');
const read = (p: string) => readFileSync(join(root, p), 'utf8');

test('Legal: getLegalDoc carrega e converte TERMOS_DE_USO.md', () => {
  const doc = getLegalDoc('termos');
  assert.ok(doc, 'Documento de termos deve existir');
  assert.ok(doc.title.includes('Termo de Uso'), `Título inesperado: ${doc.title}`);
  assert.ok(doc.html.includes('BE SMART LTDA'), 'HTML deve citar a razão social');
  assert.ok(doc.html.includes('/privacidade'), 'Link relativo deve apontar para /privacidade');
  assert.ok(doc.description.length > 50, 'Description deve ser preenchida');
});

test('Legal: getLegalDoc carrega e converte POLITICA_DE_PRIVACIDADE.md', () => {
  const doc = getLegalDoc('privacidade');
  assert.ok(doc, 'Documento de privacidade deve existir');
  assert.ok(doc.title.includes('Política de Privacidade'), `Título inesperado: ${doc.title}`);
  assert.ok(doc.html.includes('BE SMART LTDA'), 'HTML deve citar a razão social');
  assert.ok(doc.html.includes('LGPD'), 'HTML deve cobrir a LGPD');
  assert.ok(doc.description.length > 50, 'Description deve ser preenchida');
});

test('Legal: URLs canônicas no site.config e no footer', () => {
  assert.equal(buildTermsUrl(), '/termos');
  assert.equal(buildPrivacyUrl(), '/privacidade');
  const footer = read('src/components/footer/Footer.tsx');
  assert.ok(footer.includes('buildTermsUrl()'));
  assert.ok(footer.includes('buildPrivacyUrl()'));
  assert.ok(footer.includes('Termos de Uso'));
  assert.ok(footer.includes('Privacidade'));
});

test('Legal: páginas registradas em SITE_PAGES e BREADCRUMBS', () => {
  const paths = SITE_PAGES.map((p) => p.path);
  assert.ok(paths.includes('/termos'), 'SITE_PAGES deve incluir /termos');
  assert.ok(paths.includes('/privacidade'), 'SITE_PAGES deve incluir /privacidade');
  assert.ok(BREADCRUMBS['/termos'], 'Breadcrumbs deve incluir /termos');
  assert.ok(BREADCRUMBS['/privacidade'], 'Breadcrumbs deve incluir /privacidade');
  assert.equal(TERMOS_PAGE.path, '/termos');
  assert.equal(PRIVACY_PAGE.path, '/privacidade');
});
