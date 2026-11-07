import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getAllArticles, getArticleBySlug } from '../src/lib/articles.ts';
import { getAllKnowledgeDocs, getKnowledgeDocBySlug } from '../src/lib/knowledge.ts';
import { buildArticleSchema, buildKnowledgeDocSchema } from '../src/lib/seo-schema-articles.ts';

test('Artigos: exatamente 7 artigos carregados e ordenados', () => {
  const articles = getAllArticles();
  assert.equal(articles.length, 7);
  for (const art of articles) {
    assert.ok(art.slug.length > 0);
    assert.ok(art.title.length > 5);
    assert.ok(art.description.length >= 20);
    assert.ok(art.readingTimeMinutes >= 1);
    assert.ok(art.mtime instanceof Date);
  }
});

test('Artigos: getArticleBySlug retorna conteúdo HTML parseado', () => {
  const slug = 'formatos-oficiais-itf-tenis';
  const detail = getArticleBySlug(slug);
  assert.ok(detail !== null);
  assert.equal(detail.slug, slug);
  assert.ok(detail.html.includes('<h1') || detail.html.includes('<h2') || detail.html.includes('<table'));
  assert.ok(detail.html.includes('BEST_OF_3'));
});

test('Artigos: schema JSON-LD Article gerado com author Ronaldo e publisher Omni/RKT', () => {
  const schema = buildArticleSchema({
    slug: 'formatos-oficiais-itf-tenis',
    title: 'Formatos Oficiais ITF',
    description: 'Guia de formatos',
    datePublished: '2026-11-02T12:00:00.000Z',
    dateModified: '2026-11-02T12:00:00.000Z',
  });
  assert.equal(schema['@type'], 'Article');
  assert.equal(schema.author['@type'], 'Person');
  assert.ok(schema.author.name.includes('Ronaldo'));
  assert.equal(schema.publisher['@type'], 'Organization');
  assert.ok(schema.url.includes('/artigos/formatos-oficiais-itf-tenis'));
});

test('Conhecimento: exatamente 7 módulos carregados e parseados', () => {
  const docs = getAllKnowledgeDocs();
  assert.equal(docs.length, 7);
  for (const doc of docs) {
    assert.ok(doc.slug.length > 0);
    assert.ok(doc.title.length > 5);
    assert.ok(doc.description.length >= 20);
    assert.ok(doc.mtime instanceof Date);
  }
});

test('Conhecimento: getKnowledgeDocBySlug retorna HTML com tabelas e regras', () => {
  const doc = getKnowledgeDocBySlug('4-matriz-tatica-de-golpes-e-ralis');
  assert.ok(doc !== null);
  assert.ok(doc.html.includes('<table') || doc.html.includes('Forehand'));
  assert.ok(doc.html.includes('topspin') || doc.html.includes('slice'));
});

test('Conhecimento: schema JSON-LD TechArticle gerado corretamente', () => {
  const schema = buildKnowledgeDocSchema({
    slug: '2-motor-de-regras-e-formatos-itf',
    title: 'Motor de Regras e Formatos ITF',
    description: 'Especificação técnica do motor',
    dateModified: '2026-11-02T12:00:00.000Z',
  });
  assert.equal(schema['@type'], 'TechArticle');
  assert.equal(schema.publisher['@type'], 'Organization');
  assert.ok(schema.url.includes('/conhecimento/2-motor-de-regras-e-formatos-itf'));
});

