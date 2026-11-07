import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import {
  buildDescription,
  cleanTitle,
  firstProseParagraph,
  stripLeadingH1,
  truncateAtWord,
} from '../src/lib/content-meta.ts';
import { getAllArticles, getArticleBySlug } from '../src/lib/articles.ts';
import { getAllKnowledgeDocs } from '../src/lib/knowledge.ts';
import { SITE_PAGES } from '../src/data/content/pages.data.ts';
import { RONALDO_PAGE } from '../src/data/content/ronaldo.data.ts';
import { buildOrganizationSchema } from '../src/lib/seo-schema-pages.ts';

const root = join(import.meta.dirname, '..');
const brand = join(root, 'public', 'brand');
const read = (p: string) => readFileSync(join(root, p), 'utf8');
const JUNK = /^(\||-{3,}|={3,}|#|>)/;

/** Lê largura, altura e tipo de cor do cabeçalho IHDR de um PNG. */
function pngInfo(file: string) {
  const buf = readFileSync(file);
  assert.equal(buf.subarray(1, 4).toString(), 'PNG', `${file} não é PNG`);
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20), colorType: buf[25] };
}

/* ── content-meta (unidade) ───────────────────────────── */
test('truncateAtWord: respeita o limite, termina em palavra inteira e usa reticências', () => {
  const text = 'palavra '.repeat(40).trim();
  const out = truncateAtWord(text, 155);
  assert.ok(out.length <= 155);
  assert.ok(out.endsWith('…'));
  assert.ok(!/palavr…$/.test(out), 'cortou no meio da palavra');
  assert.equal(truncateAtWord('curto', 155), 'curto');
});

test('cleanTitle: remove numeração e sufixo de marca', () => {
  assert.equal(cleanTitle('1. Visão Geral e Proposta de Valor — RKT'), 'Visão Geral e Proposta de Valor');
  assert.equal(cleanTitle('6. Governança de Perfis e Clubes - RKT Tennis'), 'Governança de Perfis e Clubes');
  assert.equal(cleanTitle('**Título** simples'), 'Título simples');
});

test('firstProseParagraph: ignora tabela, linha ---- e lista; aceita parágrafo colado ao título', () => {
  const md = [
    '### 2. Doc — RKT',
    '| A | B |\n|---|---|\n| 1 | 2 |',
    '--------------------------------------------------------------------------------',
    '- item de lista com texto suficientemente longo para passar de sessenta caracteres ok',
    '#### Visão Geral\nO motor de regras do RKT padroniza a anotação e a validação de partidas de tênis.',
  ].join('\n\n');
  const p = firstProseParagraph(md);
  assert.ok(p?.startsWith('O motor de regras do RKT'));
});

test('buildDescription: prioriza a Resposta Direta (AEO) e cai no título sem prosa', () => {
  const aeo = '# T\n> **Resposta Direta (AEO):** Resposta curta e direta sobre o tema.\n\nOutro texto qualquer que não deve ser usado.';
  assert.equal(buildDescription(aeo, 'T'), 'Resposta curta e direta sobre o tema.');
  assert.equal(buildDescription('# T\n\n| a | b |', 'Título'), 'Título');
});

test('stripLeadingH1: remove só o primeiro H1', () => {
  const out = stripLeadingH1('<h1>Título</h1>\n<p>x</p><h2>Seção</h2>');
  assert.ok(!out.includes('<h1'));
  assert.ok(out.includes('<h2>Seção</h2>'));
});

/* ── Artigos ──────────────────────────────────────────── */
test('Artigos: HTML do corpo sem H1 (a página emite o único H1) e descrição limpa', () => {
  const list = getAllArticles();
  assert.ok(list.length > 0);
  for (const a of list) {
    const detail = getArticleBySlug(a.slug);
    assert.ok(detail, a.slug);
    assert.ok(!detail.html.includes('<h1'), `${a.slug}: H1 duplicado no corpo`);
    assert.ok(a.description.length >= 60 && a.description.length <= 155, `${a.slug}: ${a.description.length}`);
    assert.ok(!JUNK.test(a.description), `${a.slug}: descrição inválida`);
  }
});

/* ── Base de conhecimento ─────────────────────────────── */
test('Conhecimento: título sem numeração/marca e descrição em prosa (60–155)', () => {
  const docs = getAllKnowledgeDocs();
  assert.ok(docs.length >= 7);
  for (const d of docs) {
    assert.ok(!/^\d+\./.test(d.title), `${d.slug}: numeração no título`);
    assert.ok(!/RKT(\s+Tennis)?$/i.test(d.title), `${d.slug}: marca no título`);
    assert.ok(d.description.length >= 60 && d.description.length <= 155, `${d.slug}: ${d.description.length}`);
    assert.ok(!JUNK.test(d.description), `${d.slug}: descrição é tabela/linha/título`);
  }
});

/* ── Páginas de conteúdo ──────────────────────────────── */
test('Páginas: descrições até 160 caracteres e /sobre/equipe com título descritivo', () => {
  for (const p of SITE_PAGES) {
    assert.ok(p.description.length <= 160, `${p.path}: ${p.description.length}`);
  }
  assert.ok(RONALDO_PAGE.title.includes('Equipe'));
  assert.ok(RONALDO_PAGE.title.length >= 20);
});

/* ── Logo e ícones ────────────────────────────────────── */
test('Ícones: PNGs quadrados nas dimensões corretas e leves', () => {
  const expected: Record<string, number> = {
    'icon-48.png': 48,
    'icon-192.png': 192,
    'icon-512.png': 512,
    'apple-touch-icon.png': 180,
  };
  for (const [file, size] of Object.entries(expected)) {
    const path = join(brand, file);
    assert.ok(existsSync(path), `${file} ausente`);
    const { width, height } = pngInfo(path);
    assert.deepEqual([width, height], [size, size], file);
    assert.ok(statSync(path).size <= 100 * 1024, `${file} acima de 100 KB`);
  }
});

test('Logo: PNG com canal alfa (RGBA) e até 400 KB', () => {
  const path = join(brand, 'logo.png');
  assert.equal(pngInfo(path).colorType, 6, 'logo.png deve ser RGBA (fundo transparente)');
  assert.ok(statSync(path).size <= 400 * 1024);
});

test('Metadados: layout e schema Organization usam os ícones novos', () => {
  const layout = read('src/app/layout.tsx');
  assert.ok(layout.includes('/brand/icon-48.png'));
  assert.ok(layout.includes('/brand/icon-192.png'));
  assert.ok(layout.includes('/brand/apple-touch-icon.png'));
  assert.ok(!layout.includes("'/brand/logo.png'"), 'layout ainda aponta para logo.png');
  assert.ok(String(buildOrganizationSchema().logo).endsWith('/brand/icon-512.png'));
});

test('public/brand: sem arquivos pesados ou sem uso e nenhum asset acima de 1 MB', () => {
  for (const unused of ['logo-transparent.png', 'logo.webp', 'logo-clean.png']) {
    assert.ok(!existsSync(join(brand, unused)), `${unused} deve ser removido`);
  }
  for (const file of readdirSync(brand)) {
    assert.ok(statSync(join(brand, file)).size <= 1024 * 1024, `${file} acima de 1 MB`);
  }
});
