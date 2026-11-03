import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  SITE_CONFIG,
  getAppBaseUrl,
  getCanonicalUrl,
  buildSignupUrl,
  buildLoginUrl,
} from '../src/config/site.config.ts';
import { MOCK_MATCH_DATA } from '../src/data/mock-match.data.ts';

test('Site Config: gera URLs corretas para o sistema principal', () => {
  const appBase = getAppBaseUrl();
  assert.ok(appBase.startsWith('http'), 'Base URL deve ser HTTP/HTTPS');

  const defaultSignup = buildSignupUrl({ origem: 'lp_header' });
  assert.equal(defaultSignup, `${appBase}/signup?origem=lp_header`);

  const atletaSignup = buildSignupUrl({ perfil: 'ATLETA', origem: 'lp_hero' });
  assert.equal(atletaSignup, `${appBase}/signup?perfil=ATLETA&origem=lp_hero`);

  const treinadorSignup = buildSignupUrl({ perfil: 'TREINADOR', origem: 'lp_audience' });
  assert.equal(treinadorSignup, `${appBase}/signup?perfil=TREINADOR&origem=lp_audience`);

  const loginUrl = buildLoginUrl();
  assert.equal(loginUrl, `${appBase}/login`);
});

test('Fixture de Demonstração: coerência matemática dos dados simulados', () => {
  assert.equal(MOCK_MATCH_DATA.isDemonstration, true, 'Deve ser explicitamente uma demonstração');
  assert.ok(MOCK_MATCH_DATA.matchId.startsWith('DEMO-'), 'ID deve indicar demonstração');

  const p1Serve = MOCK_MATCH_DATA.serve.player1;
  assert.ok(p1Serve.firstServeIn <= p1Serve.totalPoints, '1º saques não podem exceder total de pontos');
  assert.ok(p1Serve.breakPointsSaved <= p1Serve.breakPointsFaced, 'Break points salvos <= enfrentados');

  const calculatedPct = Number(((p1Serve.firstServeIn / p1Serve.totalPoints) * 100).toFixed(1));
  assert.equal(calculatedPct, p1Serve.firstServePct, 'Porcentagem de 1º saque deve ser matematicamente consistente');

  const p1Pressure = MOCK_MATCH_DATA.pressure.player1;
  assert.equal(p1Pressure.breakPointsSaved, p1Serve.breakPointsSaved, 'Dados de pressão devem casar com saque');
  assert.equal(p1Pressure.breakPointsFaced, p1Serve.breakPointsFaced, 'Break points enfrentados devem casar com saque');
});

