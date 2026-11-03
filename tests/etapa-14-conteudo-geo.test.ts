import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getCanonicalUrl } from '../src/config/site.config.ts';
import { SITE_PAGES } from '../src/data/content/pages.data.ts';
import { GLOSSARY } from '../src/data/content/glossary.data.ts';
import { GUIDE_SECTIONS } from '../src/data/content/guide.data.ts';
import { PROFILE_PAGES } from '../src/data/content/profiles.data.ts';
import { ABOUT_QA } from '../src/data/content/about.data.ts';
import { FAQ_ITEMS } from '../src/data/faq.data.ts';
import { buildLlmsFull } from '../src/lib/llms-full.ts';
import {
  buildArticleSchema,
  buildDefinedTermSetSchema,
  buildOrganizationSchema,
  buildQaSchema,
  buildWebPageSchema,
} from '../src/lib/seo-schema-pages.ts';
import sitemap from '../src/app/sitemap.ts';

const root = join(import.meta.dirname, '..');
const read = (p: string) => readFileSync(join(root, p), 'utf8');
const words = (s: string) => s.trim().split(/\s+/).length;

test('Páginas: path único, title <= 65, description 120–200 e canonical por página', () => {
  const paths = SITE_PAGES.map((p) => p.path);
  assert.equal(new Set(paths).size, paths.length);
  assert.equal(new Set(SITE_PAGES.map((p) => p.title)).size, SITE_PAGES.length);
  for (const p of SITE_PAGES) {
    assert.ok(p.path.startsWith('/'));
    assert.ok(p.title.length <= 65, `${p.path}: title ${p.title.length}`);
    assert.ok(p.description.length >= 120 && p.description.length <= 200, `${p.path}: desc`);
  }
});

test('Páginas: cada rota existe em src/app e usa buildPageMetadata', () => {
  for (const p of SITE_PAGES) {
    const src = read(`src/app${p.path}/page.tsx`);
    assert.ok(src.includes('buildPageMetadata'), p.path);
  }
});

test('Sitemap: home + todas as páginas de conteúdo, sem duplicatas', () => {
  const urls = sitemap().map((e) => e.url);
  const base = getCanonicalUrl();
  assert.equal(urls[0], base);
  for (const p of SITE_PAGES) assert.ok(urls.includes(`${base}${p.path}`), p.path);
  assert.equal(new Set(urls).size, urls.length);
});

test('Glossário: >= 8 termos, ids únicos, perguntas e respostas de 35–55 palavras', () => {
  assert.ok(GLOSSARY.length >= 8);
  assert.equal(new Set(GLOSSARY.map((g) => g.id)).size, GLOSSARY.length);
  for (const g of GLOSSARY) {
    assert.ok(g.question.endsWith('?'), g.question);
    const n = words(g.answer);
    assert.ok(n >= 35 && n <= 55, `${g.id}: ${n} palavras`);
  }
});

test('Guia, perfis e sobre: perguntas em <h2> com resposta direta de 25–70 palavras', () => {
  const all = [...GUIDE_SECTIONS, ...ABOUT_QA, ...PROFILE_PAGES.flatMap((p) => p.qa)];
  for (const q of all) {
    assert.ok(q.question.endsWith('?'), q.question);
    const n = words(q.answer);
    assert.ok(n >= 25 && n <= 70, `${q.id}: ${n} palavras`);
  }
});

test('Perfis: CTA com perfil correto e origem única', () => {
  const profiles = PROFILE_PAGES.map((p) => p.profile).sort();
  assert.deepEqual(profiles, ['ATLETA', 'GESTOR', 'TREINADOR']);
  for (const p of PROFILE_PAGES) {
    assert.ok(read(`src/app${p.path}/page.tsx`).includes(`'${p.slug}'`));
  }
  assert.ok(read('src/components/content/ProfilePage.tsx').includes('lp_perfil_${data.slug}'));
});

test('Schemas: Organization, DefinedTermSet, Article, WebPage e FAQPage', () => {
  const org = buildOrganizationSchema();
  assert.equal(org['@type'], 'Organization');
  assert.equal(org.address.addressLocality, 'Curitiba');
  assert.equal(org.founder.length, 2);
  assert.ok(read('src/app/layout.tsx').includes('buildOrganizationSchema'));

  const set = buildDefinedTermSetSchema();
  assert.equal(set.hasDefinedTerm.length, GLOSSARY.length);

  const art = buildArticleSchema();
  assert.equal(art['@type'], 'Article');
  assert.equal(art.author['@id'], org['@id']);

  assert.equal(buildWebPageSchema(SITE_PAGES[0], 'AboutPage')['@type'], 'AboutPage');
  assert.equal(buildQaSchema(GUIDE_SECTIONS).mainEntity.length, GUIDE_SECTIONS.length);
});

test('Organization não inventa sameAs (só links reais, quando existirem)', () => {
  assert.ok(!('sameAs' in buildOrganizationSchema()));
});

test('llms-full: contém FAQ, glossário, guia e perfis', () => {
  const txt = buildLlmsFull();
  assert.ok(txt.startsWith('# RKT Tennis'));
  for (const q of [...FAQ_ITEMS, ...GLOSSARY, ...GUIDE_SECTIONS]) {
    assert.ok(txt.includes(q.question), q.question);
  }
  for (const p of PROFILE_PAGES) assert.ok(txt.includes(p.lead.slice(0, 40)));
});

test('llms.txt: lista todas as páginas de conteúdo e o llms-full', () => {
  const txt = read('public/llms.txt');
  for (const p of SITE_PAGES) assert.ok(txt.includes(`rkt-app.com${p.path})`), p.path);
  assert.ok(txt.includes('/llms-full.txt'));
});

test('Rodapé: links internos para todas as páginas de conteúdo (crawlability)', () => {
  const footer = read('src/components/footer/Footer.tsx');
  assert.ok(footer.includes('SITE_PAGES.map'));
  assert.ok(footer.includes('href={page.path}'));
});

test('humans.txt: existe e cita a equipe', () => {
  const txt = read('public/humans.txt');
  assert.ok(txt.includes('Filardo') && txt.includes('Eduardo Figueiredo'));
});
