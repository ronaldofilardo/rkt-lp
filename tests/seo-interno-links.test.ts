import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { SITE_CONFIG } from '../src/config/site.config.ts';
import { AUDIENCE_CARDS } from '../src/data/audience.data.ts';
import { SITE_PAGES } from '../src/data/content/pages.data.ts';
import { PROFILE_PAGES } from '../src/data/content/profiles.data.ts';
import { buildLlmsFull } from '../src/lib/llms-full.ts';
import { buildBreadcrumbListSchema } from '../src/lib/seo-schema.ts';
import robots from '../src/app/robots.ts';
import sitemap from '../src/app/sitemap.ts';

const root = join(import.meta.dirname, '..');
const read = (p: string) => readFileSync(join(root, p), 'utf8');

/* ── Fase 3: desorfanamento e interligação ────────────── */
test('/sobre/equipe desorfanizada: sitemap, llms.txt e llms-full', () => {
  assert.ok(SITE_PAGES.some((p) => p.path === '/sobre/equipe'));
  assert.ok(sitemap().some((e) => e.url.endsWith('/sobre/equipe')));
  assert.ok(read('public/llms.txt').includes('rkt-app.com/sobre/equipe)'));
  assert.ok(buildLlmsFull().includes('/sobre/equipe'));
  for (const page of SITE_PAGES) {
    assert.ok(read('public/llms.txt').includes(`rkt-app.com${page.path})`), page.path);
  }
});

test('Cards de público apontam para as rotas /para-*; cadastro fica no CTA', () => {
  const paths = AUDIENCE_CARDS.filter((c) => c.path).map((c) => c.path).sort();
  assert.deepEqual(paths, ['/para-atletas', '/para-gestores', '/para-treinadores']);
  for (const path of paths) {
    assert.ok(PROFILE_PAGES.some((p) => p.path === path), path);
  }
  assert.ok(!AUDIENCE_CARDS.find((c) => c.id === 'espectador')?.path, 'espectador não tem página própria');
  assert.ok(read('src/components/audience/AudienceCard.tsx').includes('href={card.path}'));
  assert.ok(read('src/components/audience/TargetAudience.tsx').includes('buildSignupUrl'), 'CTA secundário mantém cadastro');
});

test('Micro-ancoragem de confiança removida do Hero e do FinalCTA', () => {
  assert.ok(!SITE_CONFIG.trustNote, 'trustNote deve estar removida');
  assert.ok(!read('src/components/hero/Hero.tsx').includes('trustNote'));
  assert.ok(!read('src/components/cta/FinalCTA.tsx').includes('trustNote'));
});

test('Links /guia e /glossario movidos do Hero para o bloco de conhecimento (Fase 3)', () => {
  const hero = read('src/components/hero/Hero.tsx');
  assert.ok(!hero.includes('/guia/estatisticas-de-tenis'), 'Hero não deve ter link de guia');
  assert.ok(!hero.includes('/glossario'), 'Hero não deve ter link de glossário');
});

test('Veja também: ContentShell liga RelatedLinks em toda página de conteúdo', () => {
  assert.ok(read('src/components/content/ContentShell.tsx').includes('<RelatedLinks current={path} />'));
  const routes = [
    'src/app/sobre/page.tsx',
    'src/app/sobre/equipe/page.tsx',
    'src/app/glossario/page.tsx',
    'src/app/guia/estatisticas-de-tenis/page.tsx',
    'src/components/content/ProfilePage.tsx',
  ];
  for (const file of routes) assert.ok(read(file).includes('path='), file);
});

/* ── Fase 4: infraestrutura técnica ───────────────────── */
test('sitemap: lastModified é o mtime real do arquivo da rota', () => {
  const entries = sitemap();
  for (const entry of entries) assert.ok(entry.lastModified instanceof Date, entry.url);
  const homeMtime = statSync(join(root, 'src', 'app', 'page.tsx')).mtime;
  assert.equal((entries[0].lastModified as Date).getTime(), homeMtime.getTime());
  const ronaldo = entries.find((e) => e.url.endsWith('/sobre/equipe'))!;
  const routeMtime = statSync(join(root, 'src', 'app', 'sobre', 'equipe', 'page.tsx')).mtime;
  assert.equal((ronaldo.lastModified as Date).getTime(), routeMtime.getTime());
});

test('robots: sem a diretiva obsoleta `host`', () => {
  assert.ok(!('host' in robots()), 'host foi removido do robots.ts');
  assert.equal(robots().sitemap, `${SITE_CONFIG.defaultCanonicalUrl}/sitemap.xml`);
});

/* ── Fase 5: blindagem do domínio do sistema ──────────── */
test('Áreas autenticadas recebem X-Robots-Tag noindex, nofollow', () => {
  const config = read('next.config.mjs');
  assert.ok(config.includes("key: 'X-Robots-Tag'"));
  assert.ok(config.includes("value: 'noindex, nofollow'"));
  assert.ok(config.includes("source: '/app/:path*'"));
  assert.ok(config.includes("source: '/admin/:path*'"));
});

test('BreadcrumbList da home não é emitido; rotas internas sempre têm trilha', () => {
  assert.equal(buildBreadcrumbListSchema('/').itemListElement.length, 1, 'home só tem a raiz');
  for (const page of SITE_PAGES) {
    assert.ok(buildBreadcrumbListSchema(page.path).itemListElement.length >= 2, page.path);
  }
});
