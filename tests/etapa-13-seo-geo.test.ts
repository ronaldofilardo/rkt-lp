import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { SITE_CONFIG, getCanonicalUrl } from '../src/config/site.config.ts';
import { SEO, getOgImageUrl } from '../src/config/seo.config.ts';
import { ALLOWED_CRAWLERS, DISALLOWED_PATHS } from '../src/config/crawlers.config.ts';
import { FAQ_ITEMS } from '../src/data/faq.data.ts';
import { KEY_TAKEAWAYS } from '../src/data/key-takeaways.data.ts';
import * as ANSWERS from '../src/data/section-answers.data.ts';
import {
  buildFaqPageSchema,
  buildSoftwareApplicationSchema,
  serializeJsonLd,
} from '../src/lib/seo-schema.ts';
import robots from '../src/app/robots.ts';
import sitemap from '../src/app/sitemap.ts';

const root = join(import.meta.dirname, '..');
const read = (p: string) => readFileSync(join(root, p), 'utf8');
const words = (s: string) => s.trim().split(/\s+/).length;

/* ── 1. FAQPage ───────────────────────────────────────── */
test('FAQPage: uma Question por item de faq.data, com resposta idêntica', () => {
  const schema = buildFaqPageSchema();
  assert.equal(schema['@type'], 'FAQPage');
  assert.equal(schema.mainEntity.length, FAQ_ITEMS.length);
  schema.mainEntity.forEach((q, i) => {
    assert.equal(q.name, FAQ_ITEMS[i].question);
    assert.equal(q.acceptedAnswer.text, FAQ_ITEMS[i].answer);
  });
});

test('Layout: injeta SoftwareApplication no <head>; FAQPage e WebSite ficam na home', () => {
  const layout = read('src/app/layout.tsx');
  const home = read('src/app/page.tsx');
  assert.ok(!layout.includes("'use client'"));
  assert.ok(layout.includes('buildSoftwareApplicationSchema'));
  assert.ok(!layout.includes('buildFaqPageSchema'), 'FAQPage não pode ser global (duplicação em rotas filhas)');
  assert.ok(home.includes('buildFaqPageSchema()'), 'FAQPage deve ser renderizada junto ao FAQ');
  assert.ok(home.includes('buildWebSiteSchema()'));
});

test('serializeJsonLd: escapa "<" para não fechar o <script>', () => {
  const out = serializeJsonLd({ t: '</script><b>' });
  assert.ok(!out.includes('<'));
  assert.deepEqual(JSON.parse(out), { t: '</script><b>' });
});

/* ── 2. OG / Twitter image ────────────────────────────── */
test('OG image: arquivo existe e metadata referencia em openGraph e twitter', () => {
  assert.ok(existsSync(join(root, 'public', SEO.ogImage.path.slice(1))));
  const png = readFileSync(join(root, 'public', SEO.ogImage.path.slice(1)));
  assert.equal(png.readUInt32BE(16), SEO.ogImage.width);
  assert.equal(png.readUInt32BE(20), SEO.ogImage.height);
  const layout = read('src/app/layout.tsx');
  assert.equal((layout.match(/images: \[SEO_IMAGE\]/g) ?? []).length, 2);
  assert.ok(getOgImageUrl(getCanonicalUrl()).endsWith('/og-image.png'));
});

/* ── 3. llms.txt ──────────────────────────────────────── */
test('llms.txt: existe, tem H1, resumo e cita todas as perguntas do FAQ', () => {
  const txt = read('public/llms.txt');
  assert.ok(txt.startsWith('# RKT Tennis'));
  assert.ok(/^> /m.test(txt));
  assert.ok(txt.includes(SITE_CONFIG.defaultCanonicalUrl));
  for (const item of FAQ_ITEMS) assert.ok(txt.includes(item.question), item.question);
});

/* ── 4. robots + sitemap ──────────────────────────────── */
test('robots: libera crawlers de IA/busca e bloqueia /api/', () => {
  const r = robots();
  const rules = r.rules as { userAgent: string; allow: string; disallow: string[] }[];
  const agents = rules.map((x) => x.userAgent);
  for (const bot of ['*', ...ALLOWED_CRAWLERS]) assert.ok(agents.includes(bot), bot);
  for (const rule of rules) {
    assert.equal(rule.allow, '/');
    assert.deepEqual(rule.disallow, [...DISALLOWED_PATHS]);
  }
  assert.equal(r.sitemap, `${getCanonicalUrl()}/sitemap.xml`);
});

test('sitemap: a home canônica é a primeira entrada', () => {
  const urls = sitemap().map((e) => e.url);
  assert.equal(urls[0], getCanonicalUrl());
});

/* ── 5/8. AEO: pergunta no título + resposta direta ───── */
test('AEO: perguntas terminam com "?" e respostas têm 40–50 palavras', () => {
  const { PILLARS_ANSWER, HOW_IT_WORKS_ANSWER, AUDIENCE_ANSWER, FINAL_CTA_ANSWER } = ANSWERS;
  for (const a of [PILLARS_ANSWER, HOW_IT_WORKS_ANSWER, AUDIENCE_ANSWER, FINAL_CTA_ANSWER]) {
    assert.ok(a.question.endsWith('?'), a.question);
  }
  for (const a of [PILLARS_ANSWER, HOW_IT_WORKS_ANSWER, AUDIENCE_ANSWER]) {
    const n = words(a.answer);
    assert.ok(n >= 40 && n <= 50, `${a.question}: ${n} palavras`);
  }
  assert.ok(words(FINAL_CTA_ANSWER.answer) >= 25);
});

test('Seções: h2 usa a pergunta e FinalCTA liga aria-labelledby ao id do h2', () => {
  const files: [string, string][] = [
    ['src/components/pillars/TelemetryPillars.tsx', 'PILLARS_ANSWER.question'],
    ['src/components/how-it-works/HowItWorks.tsx', 'HOW_IT_WORKS_ANSWER.question'],
    ['src/components/audience/TargetAudience.tsx', 'AUDIENCE_ANSWER.question'],
    ['src/components/cta/FinalCTA.tsx', 'FINAL_CTA_ANSWER.question'],
  ];
  for (const [f, expr] of files) assert.ok(read(f).includes(`{${expr}}`), f);
  const cta = read('src/components/cta/FinalCTA.tsx');
  assert.ok(cta.includes('aria-labelledby="final-cta-title"'));
  assert.ok(cta.includes('id="final-cta-title"'));
});

/* ── 6. SoftwareApplication denso ─────────────────────── */
test('SoftwareApplication: featureList, audience, inLanguage, subcategoria', () => {
  const s = buildSoftwareApplicationSchema();
  assert.equal(s['@type'], 'SoftwareApplication');
  assert.equal(s.inLanguage, 'pt-BR');
  assert.equal(s.applicationSubCategory, 'Sports Analytics');
  assert.ok(!('offers' in s), 'sem bloco offers prematuro (planos em lançamento)');
  assert.ok(s.featureList.length >= 5);
  assert.equal(s.audience.length, SEO.audiences.length);
  assert.equal(s.description, SITE_CONFIG.description);
  assert.ok(s.image.endsWith('/og-image.png'));
});

/* ── 7. Key Takeaways ─────────────────────────────────── */
test('Key Takeaways: 3 itens curtos e renderizado logo após o Hero', () => {
  assert.equal(KEY_TAKEAWAYS.length, 3);
  for (const t of KEY_TAKEAWAYS) assert.ok(words(t) <= 25, t);
  const page = read('src/app/page.tsx');
  assert.ok(page.indexOf('<Hero />') < page.indexOf('<KeyTakeaways />'));
  assert.ok(page.indexOf('<KeyTakeaways />') < page.indexOf('<TelemetryPillars />'));
});

/* ── 9/10. description e title ────────────────────────── */
test('description: densidade de entidades (PWA, LGPD, tática, perfis)', () => {
  const d = SITE_CONFIG.description;
  assert.ok(d.length >= 140 && d.length <= 185, `${d.length} caracteres`);
  for (const term of ['PWA', 'LGPD', 'tática', 'atleta', 'treinador', 'gestor', 'espectador']) {
    assert.ok(d.includes(term), term);
  }
});

test('title: "Tênis" no início, diferencial de análise e marca canônica RKT', () => {
  const t = SITE_CONFIG.seoTitle;
  assert.ok(t.length <= 65, `${t.length} caracteres`);
  assert.ok(t.indexOf('Tênis') >= 0 && t.indexOf('Tênis') < 30);
  assert.ok(t.includes('Análise') && t.endsWith('| RKT'));
  assert.ok(!t.includes('RKT Tennis'), 'tags de título usam apenas a marca canônica RKT');
});
