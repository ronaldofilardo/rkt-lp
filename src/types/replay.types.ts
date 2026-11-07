/**
 * replay.types.ts
 * Tipos exclusivos do MatchReplay (simulação de transmissão ao vivo na LP).
 * Derivados do formato rkt-match-export v1.
 * NÃO alterar telemetry.types.ts — estes tipos são independentes.
 */

export type ReplayPointType =
  | 'ACE'
  | 'WINNER'
  | 'FORCED_ERROR'
  | 'DOUBLE_FAULT'
  | 'UNFORCED_ERROR';

export type ReplayPlayer = 'p1' | 'p2';

/**
 * Um evento (ponto) da partida, já processado para exibição na LP.
 * Derivado de um item de pointLog do export RKT.
 */
export interface ReplayEvent {
  /** sequenceNumber original do pointLog */
  seq: number;
  /** Delta em ms até o próximo evento (já comprimido para ritmo da LP) */
  tMs: number;
  /** Qual jogador ganhou o ponto */
  winner: ReplayPlayer;
  /** Qual jogador estava sacando */
  server: ReplayPlayer;
  /** Tipo do ponto */
  type: ReplayPointType;
  /** true = primeiro saque; false = segundo saque */
  isFirstServe: boolean;
  /** Placar do tiebreak após este ponto — ex: '0–1', '4–10' */
  scoreAfter: string;
  /** Badges exibidos na linha da timeline — ex: ['ACE', '1S', 'Abe'] */
  tags: string[];
  /** Texto do "Último ponto" — ex: 'SonMy · ace' */
  label: string;
}

/**
 * Fixture completa da partida para o replay da LP.
 * Uma instância é importada por MatchReplay.tsx.
 */
export interface MatchReplayFixture {
  /** ID original da partida no RKT */
  matchId: string;
  /** Descrição do formato exibida na UI */
  formatLabel: string;
  /** Jogador 1 */
  p1: { name: string; initials: string };
  /** Jogador 2 */
  p2: { name: string; initials: string };
  /** Quem sacou primeiro */
  initialServer: ReplayPlayer;
  /** Placar final do tiebreak — ex: '4–10' */
  finalScore: string;
  /** Vencedor da partida */
  winner: ReplayPlayer;
  /** Sequência de eventos ordenada por sequenceNumber */
  events: ReplayEvent[];
}
