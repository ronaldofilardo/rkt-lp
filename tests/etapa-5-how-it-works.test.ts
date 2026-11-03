import { test } from 'node:test';
import assert from 'node:assert/strict';
import { HOW_IT_WORKS_STEPS } from '../src/data/how-it-works.data.ts';

test('HowItWorks: existem exatamente 3 passos', () => {
  assert.equal(HOW_IT_WORKS_STEPS.length, 3);
});

test('HowItWorks: números são 01, 02, 03 em sequência', () => {
  assert.deepEqual(HOW_IT_WORKS_STEPS.map(s => s.number), ['01', '02', '03']);
});

test('HowItWorks: ids únicos e sem espaços', () => {
  const ids = HOW_IT_WORKS_STEPS.map(s => s.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(ids.every(id => !id.includes(' ')));
});

test('HowItWorks: todos os passos têm title e description não-vazios', () => {
  for (const step of HOW_IT_WORKS_STEPS) {
    assert.ok(step.title.length > 0,       `Passo ${step.number}: title vazio`);
    assert.ok(step.description.length > 0, `Passo ${step.number}: description vazio`);
  }
});

test('HowItWorks: passo "registrar" é o primeiro', () => {
  assert.equal(HOW_IT_WORKS_STEPS[0].id, 'registrar');
});

test('HowItWorks: passo "registrar" menciona quadra ou sinal instável', () => {
  const step = HOW_IT_WORKS_STEPS.find(s => s.id === 'registrar');
  assert.ok(step, 'Passo "registrar" deve existir');
  const lower = step.description.toLowerCase();
  assert.ok(lower.includes('quadra') || lower.includes('sinal instável') || lower.includes('offline'));
});

test('HowItWorks: passo "processar" menciona telemetria ou partida', () => {
  const step = HOW_IT_WORKS_STEPS.find(s => s.id === 'processar');
  assert.ok(step, 'Passo "processar" deve existir');
  const lower = step.description.toLowerCase();
  assert.ok(lower.includes('telemetria') || lower.includes('partida') || lower.includes('tático'));
});
