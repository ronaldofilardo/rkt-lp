import type { ReturnStats } from '@/types/telemetry.types';

export const MOCK_RETURN_STATS: { player1: ReturnStats; player2: ReturnStats } = {
  player1: {
    totalPoints: 98,
    firstServeReturnPointsWon: 19,
    firstServeReturnPointsWonPct: 31.1,
    secondServeReturnPointsWon: 20,
    secondServeReturnPointsWonPct: 54.1,
    returnGamesPlayed: 16,
    returnGamesWon: 4,
    returnGamesWonPct: 25.0,
    breakPointOpportunities: 6,
    breakPointsConverted: 2,
    breakPointsConvertedPct: 33.3,
  },
  player2: {
    totalPoints: 104,
    firstServeReturnPointsWon: 18,
    firstServeReturnPointsWonPct: 25.4,
    secondServeReturnPointsWon: 15,
    secondServeReturnPointsWonPct: 45.5,
    returnGamesPlayed: 16,
    returnGamesWon: 3,
    returnGamesWonPct: 18.8,
    breakPointOpportunities: 5,
    breakPointsConverted: 1,
    breakPointsConvertedPct: 20.0,
  },
};

