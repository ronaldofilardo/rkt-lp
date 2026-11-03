import { test } from 'node:test';
import assert from 'node:assert/strict';
import { AUDIENCE_CARDS } from '../src/data/audience.data.ts';
import { buildSignupUrl } from '../src/config/site.config.ts';

test('Perfis: existem exatamente 4 cards', () => {
  assert.equal(AUDIENCE_CARDS.length, 4);
});

test('Perfis: ids únicos', () => {
  const ids = AUDIENCE_CARDS.map(c => c.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('Perfis: profiles são valores válidos de UserProfile', () => {
  const valid = new Set(['ATLETA', 'TREINADOR', 'GESTOR', 'ESPECTADOR']);
  for (const c of AUDIENCE_CARDS) {
    assert.ok(valid.has(c.profile), `Perfil inválido: ${c.profile}`);
  }
});

test('Perfis: todos têm question, answer e ctaLabel não-vazios', () => {
  for (const c of AUDIENCE_CARDS) {
    assert.ok(c.question.length > 0,  `${c.id}: question vazio`);
    assert.ok(c.answer.length > 0,    `${c.id}: answer vazio`);
    assert.ok(c.ctaLabel.length > 0,  `${c.id}: ctaLabel vazio`);
  }
});

test('Perfis: CTAs geram URL com perfil e origem=lp_audience', () => {
  for (const c of AUDIENCE_CARDS) {
    const url = buildSignupUrl({ perfil: c.profile, origem: 'lp_audience' });
    assert.ok(url.includes(`perfil=${c.profile}`), `${c.id}: perfil ausente na URL`);
    assert.ok(url.includes('origem=lp_audience'),  `${c.id}: origem ausente na URL`);
  }
});

test('Perfis: gestor usa CTA diferente de "Criar conta"', () => {
  const gestor = AUDIENCE_CARDS.find(c => c.id === 'gestor');
  assert.ok(gestor, 'Card do gestor deve existir');
  assert.ok(
    !gestor.ctaLabel.toLowerCase().startsWith('criar conta'),
    'Gestor não deve usar "Criar conta" como CTA — deve indicar onboarding do clube'
  );
});

test('Perfis: espectador menciona controle do clube/treinador sobre partidas públicas', () => {
  const esp = AUDIENCE_CARDS.find(c => c.id === 'espectador');
  assert.ok(esp, 'Card do espectador deve existir');
  const lower = (esp.answer).toLowerCase();
  assert.ok(
    lower.includes('público') || lower.includes('clube') || lower.includes('treinador'),
    'Espectador deve deixar claro que partidas públicas são controladas pelo clube/treinador'
  );
});
