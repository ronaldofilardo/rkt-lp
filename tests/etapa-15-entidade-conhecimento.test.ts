import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { COMPANY, FOUNDER_RONALDO } from '../src/config/entity.config.ts';
import { SITE_CONFIG, buildSupportMailto } from '../src/config/site.config.ts';
import { ABOUT_QA } from '../src/data/content/about.data.ts';
import {
  KNOWLEDGE_DIR,
  KNOWLEDGE_MODULES,
  KNOWLEDGE_ROOT_FILE,
} from '../src/data/knowledge.registry.ts';
import { buildLlmsFull } from '../src/lib/llms-full.ts';
import { buildOrganizationSchema } from '../src/lib/seo-schema-pages.ts';

const root = join(import.meta.dirname, '..');
const read = (p: string) => readFileSync(join(root, p), 'utf8');

/* ── Entidade e contato ───────────────────────────────── */
test('Entidade: e-mail de suporte único e consistente em config, mailto e schema', () => {
  assert.equal(COMPANY.supportEmail, 'suporte@omni-sistemas.com');
  assert.equal(SITE_CONFIG.supportEmail, COMPANY.supportEmail);
  assert.equal(buildSupportMailto(), 'mailto:suporte@omni-sistemas.com');
  assert.equal(
    buildSupportMailto('Ajuda com o RKT'),
    'mailto:suporte@omni-sistemas.com?subject=Ajuda%20com%20o%20RKT',
  );
  const org = buildOrganizationSchema();
  assert.equal(org.contactPoint['@type'], 'ContactPoint');
  assert.equal(org.contactPoint.email, COMPANY.supportEmail);
  assert.equal(org.contactPoint.availableLanguage, 'pt-BR');
});

test('Organization: razão social, CNPJ, fundação e fundadores com Lattes', () => {
  const org = buildOrganizationSchema();
  assert.equal(org.parentOrganization.legalName, 'BE SMART LTDA');
  assert.equal(org.parentOrganization.taxID, '55.405.487/0001-84');
  assert.equal(org.parentOrganization.foundingDate, '1996');
  const [ronaldo, eduardo] = org.founder;
  assert.equal(ronaldo.name, 'Ronaldo Domingues Filardo');
  assert.equal(ronaldo.alternateName, 'Ronaldo Filardo');
  assert.deepEqual(ronaldo.sameAs, [FOUNDER_RONALDO.lattesUrl]);
  assert.equal(eduardo.name, 'Eduardo Figueiredo');
  assert.ok(!('sameAs' in eduardo), 'sem links inventados para o Eduardo');
});

test('Rodapé: CNPJ, razão social e link de suporte', () => {
  const footer = read('src/components/footer/Footer.tsx');
  assert.ok(footer.includes('COMPANY.cnpj') && footer.includes('COMPANY.legalName'));
  assert.ok(footer.includes('buildSupportMailto()'));
});

test('Sobre: pergunta de contato e de autoria; página mostra dados da empresa', () => {
  const ids = ABOUT_QA.map((q) => q.id);
  for (const id of ['quem-desenvolve', 'quem-e-ronaldo-filardo', 'suporte']) assert.ok(ids.includes(id), id);
  const suporte = ABOUT_QA.find((q) => q.id === 'suporte')!;
  assert.ok(suporte.answer.includes(COMPANY.supportEmail));
  assert.ok(read('src/app/sobre/page.tsx').includes('<CompanyFacts />'));
  assert.ok(read('src/components/content/CompanyFacts.tsx').includes('FOUNDER_RONALDO.lattesUrl'));
});

test('llms.txt, llms-full e humans.txt citam suporte e empresa', () => {
  assert.ok(read('public/llms.txt').includes(COMPANY.supportEmail));
  assert.ok(read('public/llms.txt').includes('BE SMART LTDA'));
  assert.ok(buildLlmsFull().includes(COMPANY.supportEmail));
  assert.ok(read('public/humans.txt').includes('Ronaldo Domingues Filardo'));
});

test('security.txt: Contact, Expires futuro (< 1 ano) e Canonical', () => {
  const txt = read('public/.well-known/security.txt');
  assert.ok(txt.includes(`Contact: mailto:${COMPANY.supportEmail}`));
  const expires = new Date(/^Expires: (.+)$/m.exec(txt)![1]);
  const days = (expires.getTime() - Date.now()) / 86_400_000;
  assert.ok(days > 0 && days <= 366, `Expires em ${Math.round(days)} dias — renovar antes de vencer`);
  assert.ok(/^Canonical: https:\/\//m.test(txt));
});

/* ── Estrutura de conhecimento (preparada, não gerada) ── */
test('Conhecimento: 8 módulos numerados, ids e arquivos únicos', () => {
  assert.equal(KNOWLEDGE_MODULES.length, 8);
  assert.equal(new Set(KNOWLEDGE_MODULES.map((m) => m.id)).size, 8);
  KNOWLEDGE_MODULES.forEach((m, i) => {
    assert.ok(m.file.startsWith(`${i + 1}-`) && m.file.endsWith('.md'), m.file);
    assert.ok(m.summary.length > 20);
  });
});

test('Conhecimento: README indexa todos os módulos e a pasta existe', () => {
  assert.ok(existsSync(join(root, KNOWLEDGE_DIR)));
  const readme = read(`${KNOWLEDGE_DIR}/README.md`);
  for (const m of KNOWLEDGE_MODULES) assert.ok(readme.includes(m.file), m.file);
  assert.ok(readme.includes(KNOWLEDGE_ROOT_FILE));
});

test('Conhecimento: arquivos só existem quando o status deixa de ser "planejado"', () => {
  for (const m of KNOWLEDGE_MODULES) {
    const exists = existsSync(join(root, KNOWLEDGE_DIR, m.file));
    assert.equal(exists, m.status !== 'planejado', `${m.file} (${m.status})`);
  }
  const anyPlanned = KNOWLEDGE_MODULES.some((m) => m.status === 'planejado');
  if (anyPlanned) assert.ok(!existsSync(join(root, KNOWLEDGE_ROOT_FILE)), 'knowledge-context.md vem por último');
});

test('Conhecimento: pendências registradas nos módulos com dúvida conhecida', () => {
  const pend = (id: string) => KNOWLEDGE_MODULES.find((m) => m.id === id)!.openQuestions.length;
  for (const id of ['motor-de-regras', 'camadas-de-telemetria', 'privacidade', 'autoridade-e-fundadores']) {
    assert.ok(pend(id) > 0, id);
  }
});
