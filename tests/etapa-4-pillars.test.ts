import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PILLARS } from '../src/data/pillars.data.ts';

test('Pilares: existem exatamente 3', () => {
  assert.equal(PILLARS.length, 3);
});

test('Pilares: números são 01, 02, 03 em ordem', () => {
  assert.deepEqual(PILLARS.map(p => p.number), ['01', '02', '03']);
});

test('Pilares: ids únicos e sem espaços', () => {
  const ids = PILLARS.map(p => p.id);
  assert.equal(new Set(ids).size, ids.length, 'IDs devem ser únicos');
  assert.ok(ids.every(id => !id.includes(' ')), 'IDs não podem ter espaços');
});

test('Pilares: todos têm title, subtitle e description não-vazios', () => {
  for (const p of PILLARS) {
    assert.ok(p.title.length > 0,       `Pilar ${p.number}: title vazio`);
    assert.ok(p.subtitle.length > 0,    `Pilar ${p.number}: subtitle vazio`);
    assert.ok(p.description.length > 0, `Pilar ${p.number}: description vazio`);
  }
});

test('Pilares: "acompanhar" indica funcionalidade futura', () => {
  const watch = PILLARS.find(p => p.id === 'acompanhar');
  assert.ok(watch, 'Pilar "acompanhar" deve existir');
  const lower = (watch.subtitle + watch.description).toLowerCase();
  assert.ok(
    lower.includes('breve') || lower.includes('futur') || lower.includes('controlad'),
    'Pilar "acompanhar" deve deixar claro que a funcionalidade é futura ou controlada'
  );
});

test('Pilares: "anotar" menciona PWA ou quadra', () => {
  const annotate = PILLARS.find(p => p.id === 'anotar');
  assert.ok(annotate, 'Pilar "anotar" deve existir');
  const lower = annotate.description.toLowerCase();
  assert.ok(lower.includes('pwa') || lower.includes('quadra') || lower.includes('real'));
});

test('Pilares: "analisar" menciona telemetria ou estatística', () => {
  const analyze = PILLARS.find(p => p.id === 'analisar');
  assert.ok(analyze, 'Pilar "analisar" deve existir');
  const lower = analyze.description.toLowerCase();
  assert.ok(lower.includes('telemetria') || lower.includes('tático') || lower.includes('partida'));
});
