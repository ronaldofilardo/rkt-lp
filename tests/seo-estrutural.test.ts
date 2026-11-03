import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SITE_CONFIG, TITLE_SUFFIX, formatTitle, getCanonicalUrl } from '../src/config/site.config.ts';
import { FOUNDER_RONALDO } from '../src/config/entity.config.ts';
import { SITE_PAGES } from '../src/data/content/pages.data.ts';
import { GLOSSARY, GLOSSARY_PAGE } from '../src/data/content/glossary.data.ts';
import { GUIDE_PAGE, GUIDE_SECTIONS } from '../src/data/content/guide.data.ts';
import { RONALDO_LEAD, RONALDO_PAGE } from '../src/data/content/ronaldo.data.ts';
import { BREADCRUMBS } from '../src/data/content/breadcrumbs.data.ts';
import { GLOSSARY_TERMS } from '../src/data/glossary-links.data.ts';
import {
  buildBreadcrumbListSchema,
  buildSoftwareApplicationSchema,
  buildWebSiteSchema,
} from '../src/lib/seo-schema.ts';
import { ronaldoPersonId } from '../src/lib/seo-schema-org.ts';
import { buildOrganizationSchema } from '../src/lib/seo-schema-pages.ts';
import { buildRonaldoProfileSchema } from '../src/lib/seo-schema-person.ts';
import { buildPageMetadata } from '../src/lib/page-metadata.ts';

const root = join(import.meta.dirname, '..');
const read = (p: string) => readFileSync(join(root, p), 'utf8');

/* ── Fase 1: metadados e calibragem SERP ──────────────── */
test('Título: template canônico "| RKT" e nenhuma página repete a marca', () => {
  const layout = read('src/app/layout.tsx');
  assert.ok(layout.includes("default: 'RKT | Telemetria e Inteligência Tática no Tênis'"));
  assert.ok(layout.includes('template:'));
  assert.equal(formatTitle('Página'), `Página${TITLE_SUFFIX}`);
  for (const page of SITE_PAGES) {
    assert.ok(!/\|\s*RKT(\s*Tennis)?$/.test(page.title), `sufixo duplicado: ${page.title}`);
  }
});

test('Título: páginas renderizam até 65 caracteres (ronaldo até 60)', () => {
  for (const page of SITE_PAGES) {
    const rendered = formatTitle(page.title);
    assert.ok(rendered.length <= 65, `${page.path}: ${rendered.length} caracteres`);
  }
  assert.ok(formatTitle(RONALDO_PAGE.title).length <= 60, 'título de /sobre/equipe');
  assert.ok(RONALDO_PAGE.title.includes('Equipe'));
});

test('Description: home e ronaldo calibrados para não truncar na SERP', () => {
  assert.ok(SITE_CONFIG.description.length <= 155, `${SITE_CONFIG.description.length}`);
  assert.ok(RONALDO_PAGE.description.length <= 155, `${RONALDO_PAGE.description.length}`);
  assert.ok(RONALDO_PAGE.description.length >= 120, 'description mínima densa');
  for (const page of SITE_PAGES) {
    assert.ok(page.description.length >= 120 && page.description.length <= 200, page.path);
  }
});

test('og:type: website por padrão, article no guia e profile em /sobre/ronaldo', () => {
  assert.equal(buildPageMetadata(GLOSSARY_PAGE).openGraph?.type, 'website');
  assert.equal(buildPageMetadata(GUIDE_PAGE).openGraph?.type, 'article');
  assert.equal(buildPageMetadata(RONALDO_PAGE).openGraph?.type, 'website');
});

test('E-E-A-T: data canônica 1996 em ronaldo.data, sem divergência 1997', () => {
  const src = read('src/data/content/ronaldo.data.ts');
  assert.ok(!src.includes('1997'), 'ano divergente proibido');
  assert.ok(RONALDO_LEAD.includes('desde 1996'));
  assert.ok(RONALDO_PAGE.description.includes('desde 1996'));
});

/* ── Fase 2: grafo JSON-LD ────────────────────────────── */
test('FAQPage isolada na home; WebSite e SoftwareApplication ligados à Organization', () => {
  assert.ok(!read('src/app/layout.tsx').includes('buildFaqPageSchema'), 'FAQ não pode ser global');
  const home = read('src/app/page.tsx');
  assert.ok(home.includes('buildFaqPageSchema()') && home.includes('buildWebSiteSchema()'));

  const site = buildWebSiteSchema();
  const orgId = buildOrganizationSchema()['@id'];
  assert.equal(site['@type'], 'WebSite');
  assert.equal(site['@id'], `${getCanonicalUrl()}/#website`);
  assert.equal(site.publisher['@id'], orgId);
  assert.equal(buildSoftwareApplicationSchema().publisher['@id'], orgId);
});

test('Organization: parentOrganization aponta para omni-sistemas.com com @id', () => {
  const parent = buildOrganizationSchema().parentOrganization;
  assert.equal(parent['@id'], 'https://omni-sistemas.com/#organization');
  assert.equal(parent.name, 'Omni Sistemas');
  assert.equal(parent.url, 'https://omni-sistemas.com');
  assert.equal(parent.legalName, 'BE SMART LTDA');
});

test('ProfilePage de /sobre/equipe com Person unificado ao nó founder', () => {
  const profile = buildRonaldoProfileSchema();
  assert.equal(profile['@type'], 'ProfilePage');
  const person = profile.mainEntity;
  assert.equal(person['@type'], 'Person');
  assert.equal(person['@id'], ronaldoPersonId());
  assert.equal(person['@id'], `${getCanonicalUrl()}/sobre/equipe#person`);
  assert.ok(person.jobTitle.includes('Arquiteto'));
  assert.equal(person.alumniOf.name, 'Universidade do Porto');
  assert.deepEqual(person.knowsAbout, ['ASD-STE100', 'Engenharia Preventiva', 'Tênis', 'Telemetria Esportiva']);
  assert.deepEqual(person.sameAs, [FOUNDER_RONALDO.lattesUrl]);
  assert.equal(buildOrganizationSchema().founder[0]['@id'], person['@id'], '@id divergente no grafo');
});

test('BreadcrumbList cobre todas as rotas internas com trilha íntegra', () => {
  const known = new Set(['/', ...SITE_PAGES.map((p) => p.path)]);
  for (const page of SITE_PAGES) {
    const trail = BREADCRUMBS[page.path];
    assert.ok(trail && trail.length > 0, `sem breadcrumb: ${page.path}`);
    const crumb = buildBreadcrumbListSchema(page.path);
    assert.equal(crumb.itemListElement[0].name, 'Início');
    assert.equal(crumb.itemListElement.at(-1).item, `${getCanonicalUrl()}${page.path}`);
    crumb.itemListElement.forEach((el, i) => assert.equal(el.position, i + 1));
    for (const entry of trail) assert.ok(known.has(entry.path), entry.path);
  }
});

/* ── Fase 3: âncoras do glossário no guia ─────────────── */
test('Glossário: âncoras dos termos técnicos existem e o guia os utiliza', () => {
  const ids = new Set(GLOSSARY.map((g) => g.id));
  for (const term of GLOSSARY_TERMS) {
    assert.ok(term.href.startsWith('/glossario#'), term.term);
    assert.ok(ids.has(term.href.slice('/glossario#'.length)), term.term);
  }
  assert.ok(read('src/app/guia/estatisticas-de-tenis/page.tsx').includes('glossaryLinks'));
  const answers = GUIDE_SECTIONS.map((s) => s.answer).join(' ').toLowerCase();
  for (const needle of ['winners', 'break points', 'erros não forçados']) {
    assert.ok(answers.includes(needle), needle);
    assert.ok(GLOSSARY_TERMS.some((t) => t.term.toLowerCase() === needle), needle);
  }
});
