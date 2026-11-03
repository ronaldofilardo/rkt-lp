import type { SimulatedMatchFixture } from '@/types/telemetry.types';
import { MOCK_SERVE_STATS, MOCK_PRESSURE_STATS } from './mock-match-serve.data';
import { MOCK_RETURN_STATS } from './mock-match-return.data';

export const MOCK_MATCH_DATA: SimulatedMatchFixture = {
  isDemonstration: true,
  matchId: 'DEMO-RKT-2026',
  formatDescription: 'Melhor de 3 Sets com Tiebreak Padrão (ITF Rules)',
  player1: { name: 'Atleta A', initials: 'AA' },
  player2: { name: 'Atleta B', initials: 'AB' },
  scoreSummary: {
    sets: '6/4 · 3/6 · 7/6(5)',
    currentScore: 'Finalizada',
  },
  serve: MOCK_SERVE_STATS,
  returnStats: MOCK_RETURN_STATS,
  pressure: MOCK_PRESSURE_STATS,
  shots: {
    player1: {
      winners: 28,
      forcedErrors: 19,
      unforcedErrors: 21,
      backhandStats: { winners: 9, unforcedErrors: 10, forcedErrors: 8, total: 27 },
      forehandStats: { winners: 15, unforcedErrors: 9, forcedErrors: 9, total: 33 },
      rallyLengthDistribution: { short: 48, medium: 32, long: 16 },
      rallyAvgLength: 4.8,
      netApproaches: 14,
      netApproachesWon: 10,
      netApproachPct: 71.4,
    },
    player2: {
      winners: 22,
      forcedErrors: 24,
      unforcedErrors: 27,
      backhandStats: { winners: 7, unforcedErrors: 13, forcedErrors: 11, total: 31 },
      forehandStats: { winners: 12, unforcedErrors: 11, forcedErrors: 10, total: 33 },
      rallyLengthDistribution: { short: 48, medium: 32, long: 16 },
      rallyAvgLength: 4.8,
      netApproaches: 11,
      netApproachesWon: 6,
      netApproachPct: 54.5,
    },
  },
  momentum: {
    longestWinningStreak: 6,
    currentStreak: 2,
    scoringRuns: [
      { length: 4, start: 12, end: 15 },
      { length: 6, start: 45, end: 50 },
    ],
  },
  duration: {
    totalMinutes: 114,
    effectivePlayMinutes: 38,
  },
};
