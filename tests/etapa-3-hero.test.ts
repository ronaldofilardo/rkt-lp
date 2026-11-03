import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MOCK_MATCH_DATA } from '../src/data/mock-match.data.ts';
import { buildSignupUrl, buildLoginUrl } from '../src/config/site.config.ts';

test('Hero: CTA "Começar agora" envia origem=lp_hero', () => {
  const url = buildSignupUrl({ origem: 'lp_hero' });
  assert.ok(url.includes('origem=lp_hero'));
  assert.ok(url.includes('/signup'));
});

test('Hero: CTA "Já tenho conta" aponta para /login', () => {
  assert.ok(buildLoginUrl().endsWith('/login'));
});

test('Hero: fixture é marcada como demonstração', () => {
  assert.equal(MOCK_MATCH_DATA.isDemonstration, true);
});

test('HeroScoreboard: placar separado por " · " tem 3 partes', () => {
  const sets = MOCK_MATCH_DATA.scoreSummary.sets.split(' · ');
  assert.equal(sets.length, 3, 'Melhor de 3 sets deve ter 3 partes');
});

test('HeroServeCard: métricas de saque do player1 são válidas', () => {
  const s = MOCK_MATCH_DATA.serve.player1;
  assert.ok(s.firstServePct > 0 && s.firstServePct <= 100);
  assert.ok(s.firstServePointsWonPct > 0 && s.firstServePointsWonPct <= 100);
  assert.ok(s.aces >= 0);
  assert.ok(s.breakPointsSavedPct >= 0 && s.breakPointsSavedPct <= 100);
});

test('CourtLines: é puramente decorativo (sem dados de fixture necessários)', () => {
  // CourtLines não depende de dados — valida que o módulo de fixture
  // está íntegro para não quebrar importações da seção.
  assert.ok(MOCK_MATCH_DATA.matchId.startsWith('DEMO-'));
});
