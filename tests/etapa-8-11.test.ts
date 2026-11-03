import { test } from 'node:test';
import assert from 'node:assert/strict';
import { FAQ_ITEMS } from '../src/data/faq.data.ts';
import { TEAM_MEMBERS, TEAM_SIGNATURE } from '../src/data/team.data.ts';
import { buildSignupUrl } from '../src/config/site.config.ts';

/* ── FAQ ─────────────────────────────────────────────── */
test('FAQ: existem exatamente 6 perguntas', () => {
  assert.equal(FAQ_ITEMS.length, 6);
});

test('FAQ: ids únicos e sem espaços', () => {
  const ids = FAQ_ITEMS.map(f => f.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(ids.every(id => !id.includes(' ')));
});

test('FAQ: todas as perguntas e respostas são não-vazias', () => {
  for (const f of FAQ_ITEMS) {
    assert.ok(f.question.length > 0, `${f.id}: question vazia`);
    assert.ok(f.answer.length > 0,   `${f.id}: answer vazia`);
  }
});

test('FAQ: cobre telemetria, offline/PWA, privacidade/menores e modelo de acesso', () => {
  const allText = FAQ_ITEMS.map(f => f.id).join(' ');
  assert.ok(allText.includes('telemetria'),  'Deve cobrir telemetria');
  assert.ok(allText.includes('offline'),     'Deve cobrir offline/PWA');
  assert.ok(allText.includes('menores') || allText.includes('privacidade'), 'Deve cobrir privacidade/menores');
  assert.ok(allText.includes('acesso') || allText.includes('modelo'),       'Deve cobrir modelo de acesso');
});

test('FAQ: resposta sobre menores menciona LGPD ou responsável', () => {
  const item = FAQ_ITEMS.find(f => f.id.includes('menor') || f.id.includes('privacidade'));
  assert.ok(item, 'Item sobre menores/privacidade deve existir');
  const lower = item.answer.toLowerCase();
  assert.ok(lower.includes('lgpd') || lower.includes('responsável') || lower.includes('consentimento'));
});

test('FAQ: modelo de acesso não promete gratuidade e cita a fase de demonstração', () => {
  const item = FAQ_ITEMS.find(f => f.id.includes('acesso') || f.id.includes('modelo'));
  assert.ok(item, 'Item sobre modelo de acesso deve existir');
  assert.ok(!item.question.toLowerCase().includes('gratuito'), 'pergunta sem promessa de gratuidade');
  assert.ok(!item.answer.toLowerCase().includes('gratuito'), 'resposta sem promessa de gratuidade');
  const lower = item.answer.toLowerCase();
  assert.ok(lower.includes('demonstração') || lower.includes('planos'), 'deve citar demonstração ou planos');
});

/* ── Team ────────────────────────────────────────────── */
test('Team: existem exatamente 2 membros', () => {
  assert.equal(TEAM_MEMBERS.length, 2);
});

test('Team: Ronaldo e Eduardo estão presentes', () => {
  const names = TEAM_MEMBERS.map(m => m.name);
  assert.ok(names.some(n => n.toLowerCase().includes('ronaldo')));
  assert.ok(names.some(n => n.toLowerCase().includes('eduardo')));
});

test('Team: todos têm initials de 2 letras', () => {
  for (const m of TEAM_MEMBERS) {
    assert.equal(m.initials.length, 2, `${m.name}: initials devem ter 2 letras`);
  }
});

test('Team: assinatura menciona Omni Sistemas', () => {
  assert.ok(TEAM_SIGNATURE.toLowerCase().includes('omni sistemas'));
});

/* ── Broadcast ───────────────────────────────────────── */
test('Broadcast: CTA gera URL com origem=lp_broadcast', () => {
  const url = buildSignupUrl({ origem: 'lp_broadcast' });
  assert.ok(url.includes('origem=lp_broadcast'));
  assert.ok(url.includes('/signup'));
});
