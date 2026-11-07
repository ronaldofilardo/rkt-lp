/**
 * match-replay.data.ts
 * Fonte de dados do MatchReplay (simulação de transmissão ao vivo na LP).
 *
 * Derivado de: rkt-match-export v1
 * matchId: cmvzzfgly000cpdwaolt9qsk4
 * Formato: MATCH_TB_10 (Super Tiebreak — 1º a 10 pontos)
 * Resultado: Marcos 4 × 10 SonMy
 *
 * Nomes anonimizados para a LP: "M***" e "S***".
 *
 * Mapeamento de tags (annotations.rallyDetails → badges da LP):
 *   type ACE           → 'ACE'
 *   type DOUBLE_FAULT  → 'DF'
 *   type WINNER        → 'W'
 *   type FORCED_ERROR  → 'EF'
 *   golpe fh           → 'FH'
 *   golpe bh           → 'BH'
 *   golpe approach_fh  → 'Ap FH'
 *   efeito topspin     → 'Top'
 *   efeito slice       → 'Sli'
 *   efeito flat        → 'Flt'
 *   direcao cruzada    → 'Cru'
 *   direcao paralela   → 'Par'
 *   direcao inside_in  → 'I-in'
 *   direcao centro     → 'Ctr'
 *   direcao aberto     → 'Abe'
 *   direcao fechado    → 'Fec'
 *   golpe_esp lob      → 'Lob'
 *   golpe_esp drop_shot→ 'Drop'
 *   rallyLength >= 9   → '>9'
 *   subtipo2 net       → 'Net'
 *   subtipo2 out       → 'Out'
 *   isSecondServe true → '2S'
 *   isFirstServe true  → '1S'  (omitido em ACE — redundante)
 *
 * Deltas (tMs) comprimidos para ritmo da LP:
 *   pontos normais  → 2500–3500 ms
 *   gap entre dias  → 5000 ms (pausa dramática entre sessões)
 *   último ponto    → 4000 ms (antes do fade-out + reinício)
 */

import type { MatchReplayFixture } from '@/types/replay.types';

export const MATCH_REPLAY_DATA: MatchReplayFixture = {
  matchId: 'cmvzzfgly000cpdwaolt9qsk4',
  formatLabel: 'Super Tiebreak · 1º a 10 pontos',
  p1: { name: 'M***', initials: 'M' },
  p2: { name: 'S***', initials: 'S' },
  initialServer: 'p2', // SonMy sacou primeiro (initialServerId = player2)
  finalScore: '4–10',
  winner: 'p2',
  events: [
    {
      // seq 1 | timestamp 02:58:07 | SonMy saca, SonMy vence | ACE 1S aberto
      seq: 1,
      tMs: 2500,
      winner: 'p2',
      server: 'p2',
      type: 'ACE',
      isFirstServe: true,
      scoreAfter: '0–1',
      tags: ['ACE', 'Abe'],
      label: 'S*** · ace',
    },
    {
      // seq 2 | timestamp 02:58:30 | Marcos saca, SonMy vence | EF BH Sli Par fundo >9
      seq: 2,
      tMs: 3000,
      winner: 'p2',
      server: 'p1',
      type: 'FORCED_ERROR',
      isFirstServe: true,
      scoreAfter: '0–2',
      tags: ['EF', 'BH', 'Sli', 'Par', '>9'],
      label: 'S*** · erro forçado',
    },
    {
      // seq 3 | timestamp 02:59:06 | Marcos saca, SonMy vence | EF Ap FH Cru passada
      seq: 3,
      tMs: 3500,
      winner: 'p2',
      server: 'p1',
      type: 'FORCED_ERROR',
      isFirstServe: true,
      scoreAfter: '0–3',
      tags: ['EF', 'Ap FH', 'Cru'],
      label: 'S*** · erro forçado',
    },
    {
      // seq 4 | timestamp 03:00:32 | SonMy saca, Marcos vence | W FH Top Lob devolução
      seq: 4,
      tMs: 3000,
      winner: 'p1',
      server: 'p2',
      type: 'WINNER',
      isFirstServe: true,
      scoreAfter: '1–3',
      tags: ['W', 'FH', 'Top', 'Lob'],
      label: 'M*** · winner',
    },
    {
      // seq 5 | timestamp 03:00:52 | SonMy saca, Marcos vence | DF 2S Net fechado
      seq: 5,
      tMs: 2500,
      winner: 'p1',
      server: 'p2',
      type: 'DOUBLE_FAULT',
      isFirstServe: false,
      scoreAfter: '2–3',
      tags: ['DF', '2S', 'Net'],
      label: 'M*** · dupla falta (S***)',
    },
    {
      // seq 6 | timestamp 03:01:13 | Marcos saca, SonMy vence | DF 2S Net aberto
      // Próximo ponto é de outro dia — tMs elevado simula pausa de sessão
      seq: 6,
      tMs: 5000,
      winner: 'p2',
      server: 'p1',
      type: 'DOUBLE_FAULT',
      isFirstServe: false,
      scoreAfter: '2–4',
      tags: ['DF', '2S', 'Net'],
      label: 'S*** · dupla falta (M***)',
    },
    {
      // seq 7 | timestamp 21:04:14 (dia seguinte) | Marcos saca, Marcos vence | ACE 1S
      seq: 7,
      tMs: 2500,
      winner: 'p1',
      server: 'p1',
      type: 'ACE',
      isFirstServe: true,
      scoreAfter: '3–4',
      tags: ['ACE'],
      label: 'M*** · ace',
    },
    {
      // seq 8 | timestamp 21:04:29 | SonMy saca, SonMy vence | EF BH Flt Ctr fundo >9
      seq: 8,
      tMs: 2800,
      winner: 'p2',
      server: 'p2',
      type: 'FORCED_ERROR',
      isFirstServe: true,
      scoreAfter: '3–5',
      tags: ['EF', 'BH', 'Flt', 'Ctr', '>9'],
      label: 'S*** · erro forçado',
    },
    {
      // seq 9 | timestamp 21:04:40 | SonMy saca, Marcos vence | DF 2S Net fechado
      seq: 9,
      tMs: 2500,
      winner: 'p1',
      server: 'p2',
      type: 'DOUBLE_FAULT',
      isFirstServe: false,
      scoreAfter: '4–5',
      tags: ['DF', '2S', 'Net'],
      label: 'M*** · dupla falta (S***)',
    },
    {
      // seq 10 | timestamp 21:04:56 | Marcos saca, SonMy vence | W FH Top Lob cruzada devolução
      seq: 10,
      tMs: 3000,
      winner: 'p2',
      server: 'p1',
      type: 'WINNER',
      isFirstServe: true,
      scoreAfter: '4–6',
      tags: ['W', 'FH', 'Top', 'Lob'],
      label: 'S*** · winner',
    },
    {
      // seq 11 | timestamp 21:05:07 | Marcos saca, SonMy vence | DF 2S Out centro
      seq: 11,
      tMs: 2500,
      winner: 'p2',
      server: 'p1',
      type: 'DOUBLE_FAULT',
      isFirstServe: false,
      scoreAfter: '4–7',
      tags: ['DF', '2S', 'Out'],
      label: 'S*** · dupla falta (M***)',
    },
    {
      // seq 12 | timestamp 21:05:13 | SonMy saca, SonMy vence | ACE 1S Sli centro
      seq: 12,
      tMs: 3000,
      winner: 'p2',
      server: 'p2',
      type: 'ACE',
      isFirstServe: true,
      scoreAfter: '4–8',
      tags: ['ACE', 'Sli', 'Ctr'],
      label: 'S*** · ace',
    },
    {
      // seq 13 | timestamp 21:05:26 | SonMy saca, SonMy vence | EF Ap FH Ctr passada >9
      seq: 13,
      tMs: 3000,
      winner: 'p2',
      server: 'p2',
      type: 'FORCED_ERROR',
      isFirstServe: true,
      scoreAfter: '4–9',
      tags: ['EF', 'Ap FH', 'Ctr', '>9'],
      label: 'S*** · erro forçado',
    },
    {
      // seq 14 | timestamp 21:05:36 | Marcos saca, SonMy vence | DF 2S Net aberto — PONTO FINAL
      seq: 14,
      tMs: 4000, // pausa maior antes do fade-out
      winner: 'p2',
      server: 'p1',
      type: 'DOUBLE_FAULT',
      isFirstServe: false,
      scoreAfter: '4–10',
      tags: ['DF', '2S', 'Net'],
      label: 'S*** · dupla falta (M***)',
    },
  ],
};
