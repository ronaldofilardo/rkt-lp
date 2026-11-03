import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MOCK_MATCH_DATA } from '../src/data/mock-match.data.ts';
import { buildSignupUrl } from '../src/config/site.config.ts';

const s1 = MOCK_MATCH_DATA.serve.player1;
const s2 = MOCK_MATCH_DATA.serve.player2;
const r1 = MOCK_MATCH_DATA.returnStats.player1;
const r2 = MOCK_MATCH_DATA.returnStats.player2;
const pr1 = MOCK_MATCH_DATA.pressure.player1;
const pr2 = MOCK_MATCH_DATA.pressure.player2;

test('TelemetryDemo: CTA "Criar sua conta" envia origem=lp_telemetria', () => {
  const url = buildSignupUrl({ origem: 'lp_telemetria' });
  assert.ok(url.includes('origem=lp_telemetria'));
  assert.ok(url.includes('/signup'));
});

test('TelemetryPanel – Saque: firstServePct está entre 0 e 100', () => {
  assert.ok(s1.firstServePct >= 0 && s1.firstServePct <= 100);
  assert.ok(s2.firstServePct >= 0 && s2.firstServePct <= 100);
});

test('TelemetryPanel – Saque: firstServePointsWonPct entre 0 e 100', () => {
  assert.ok(s1.firstServePointsWonPct >= 0 && s1.firstServePointsWonPct <= 100);
  assert.ok(s2.firstServePointsWonPct >= 0 && s2.firstServePointsWonPct <= 100);
});

test('TelemetryPanel – Saque: aces >= 0 (inteiros)', () => {
  assert.ok(Number.isInteger(s1.aces) && s1.aces >= 0);
  assert.ok(Number.isInteger(s2.aces) && s2.aces >= 0);
});

test('TelemetryPanel – Devolução: percentuais entre 0 e 100', () => {
  for (const r of [r1, r2]) {
    assert.ok(r.firstServeReturnPointsWonPct >= 0 && r.firstServeReturnPointsWonPct <= 100);
    assert.ok(r.secondServeReturnPointsWonPct >= 0 && r.secondServeReturnPointsWonPct <= 100);
    assert.ok(r.breakPointsConvertedPct >= 0 && r.breakPointsConvertedPct <= 100);
  }
});

test('TelemetryPanel – Pressão: gamePoints, setPoints e BP são consistentes', () => {
  for (const pr of [pr1, pr2]) {
    assert.ok(pr.breakPointsSaved <= pr.breakPointsFaced, 'BP salvos ≤ BP enfrentados');
    assert.ok(pr.breakPointsConverted <= pr.breakPointOpportunities, 'BP convertidos ≤ oportunidades');
    assert.ok(pr.gamePointsWon <= pr.gamePointsTotal, 'GP ganhos ≤ total');
    assert.ok(pr.setPointsWon <= pr.setPointsTotal, 'SP ganhos ≤ total');
  }
});

test('TelemetryPanel – Momentum: totalPointsWon bate com serve totalPoints', () => {
  const totalFromServe = s1.totalPoints + s2.totalPoints;
  const totalFromPressure = pr1.totalPointsWon + pr2.totalPointsWon;
  assert.equal(
    totalFromServe,
    totalFromPressure,
    `Pontos do saque (${totalFromServe}) devem ser iguais ao total de pressure (${totalFromPressure})`
  );
});

test('TelemetryPanel – Momentum: longestWinningStreak >= 1', () => {
  assert.ok(MOCK_MATCH_DATA.momentum.longestWinningStreak >= 1);
});

test('TelemetryDemo: placar tem 3 partes separadas por " · "', () => {
  const parts = MOCK_MATCH_DATA.scoreSummary.sets.split(' · ');
  assert.equal(parts.length, 3);
});

test('TelemetryDemo: duração é positiva', () => {
  assert.ok(MOCK_MATCH_DATA.duration.totalMinutes > 0);
  assert.ok(MOCK_MATCH_DATA.duration.effectivePlayMinutes > 0);
  assert.ok(
    MOCK_MATCH_DATA.duration.effectivePlayMinutes <= MOCK_MATCH_DATA.duration.totalMinutes,
    'Tempo efetivo ≤ tempo total'
  );
});
