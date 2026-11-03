export interface ServeStats {
  totalPoints: number;
  firstServeIn: number;
  firstServePct: number;
  firstServePointsWon: number;
  firstServePointsWonPct: number;
  secondServePointsWon: number;
  secondServePointsWonPct: number;
  aces: number;
  doubleFaults: number;
  serviceGamesPlayed: number;
  serviceGamesWon: number;
  serviceGamesWonPct: number;
  breakPointsFaced: number;
  breakPointsSaved: number;
  breakPointsSavedPct: number;
  maxServeSpeed?: number;
}

export interface ReturnStats {
  totalPoints: number;
  firstServeReturnPointsWon: number;
  firstServeReturnPointsWonPct: number;
  secondServeReturnPointsWon: number;
  secondServeReturnPointsWonPct: number;
  returnGamesPlayed: number;
  returnGamesWon: number;
  returnGamesWonPct: number;
  breakPointOpportunities: number;
  breakPointsConverted: number;
  breakPointsConvertedPct: number;
}

export interface PressureStats {
  breakPointsSaved: number;
  breakPointsFaced: number;
  breakPointsConverted: number;
  breakPointOpportunities: number;
  gamePointsWon: number;
  gamePointsTotal: number;
  gamePointsWonPct: number;
  setPointsWon: number;
  setPointsTotal: number;
  setPointsWonPct: number;
  tiebreaksPlayed: number;
  tiebreaksWon: number;
  totalPointsWon: number;
}

export interface StrokeSideStats {
  winners: number;
  unforcedErrors: number;
  forcedErrors: number;
  total: number;
}

export interface ShotAnalysis {
  winners: number;
  forcedErrors: number;
  unforcedErrors: number;
  backhandStats: StrokeSideStats;
  forehandStats: StrokeSideStats;
  rallyLengthDistribution: { short: number; medium: number; long: number };
  rallyAvgLength: number;
  netApproachesWon: number;
  netApproaches: number;
  netApproachPct: number;
}

export interface MomentumStats {
  longestWinningStreak: number;
  currentStreak: number;
  scoringRuns: Array<{ length: number; start: number; end: number }>;
}

export interface SimulatedMatchFixture {
  readonly isDemonstration: true;
  matchId: string;
  formatDescription: string;
  player1: { name: string; initials: string };
  player2: { name: string; initials: string };
  scoreSummary: { sets: string; currentScore: string };
  serve: { player1: ServeStats; player2: ServeStats };
  returnStats: { player1: ReturnStats; player2: ReturnStats };
  pressure: { player1: PressureStats; player2: PressureStats };
  shots: { player1: ShotAnalysis; player2: ShotAnalysis };
  momentum: MomentumStats;
  duration: { totalMinutes: number; effectivePlayMinutes: number };
}

