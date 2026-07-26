export type Difficulty = "easy" | "medium" | "hard";

export type VerificationStatus = "unverified" | "reviewed" | "verified" | "flagged";

export type GuessState = "idle" | "correct" | "wrong";

/**
 * A "Team" is one of the 30 current NBA franchise identities.
 * Historical identities (e.g. Seattle SuperSonics, New Jersey Nets) are not
 * separate selectable cards — they roll up to the current team via
 * `historicalNames` so the answer grid always shows exactly 30 cards.
 */
export interface HistoricalName {
  name: string;
  city: string;
  firstSeason: string;
  lastSeason: string;
}

export interface Team {
  id: string; // stable current-team id, e.g. "bkn"
  franchiseId: string; // franchise lineage id, e.g. "nets-franchise"
  city: string;
  name: string;
  abbreviation: string;
  primaryColor: string;
  secondaryColor: string;
  displayOrder: number;
  icon?: string; // optional custom mark identifier (no official logos)
  historicalNames?: HistoricalName[];
}

/**
 * One chronological stop in a player's career. `teamId` always points at a
 * *current* team id (so it can be matched against the answer grid), while
 * `teamNameUsed` preserves whatever the franchise was called at the time,
 * for the results timeline.
 */
export interface CareerStop {
  id: string;
  teamId: string;
  franchiseId: string;
  teamNameUsed: string;
  firstSeason: string;
  lastSeason: string;
  sequenceNumber: number;
  gamesPlayed: number;
  answerEligible: boolean;
  verificationNotes?: string;
}

export interface Player {
  id: string;
  fullName: string;
  slug: string;
  imageUrl?: string;
  careerStart: number;
  careerEnd: number;
  careerYearsLabel: string;
  difficulty: Difficulty;
  activeStatus: boolean;
  verificationStatus: VerificationStatus;
  hints: [string, string, string];
  careerStops: CareerStop[];
  sourceNotes?: string;
  lastVerifiedAt: string;
}

/** Derived, ready-to-play shape used by the game engine + UI. */
export interface Puzzle {
  playerId: string;
  playerName: string;
  imageUrl?: string;
  careerYearsLabel: string;
  difficulty: Difficulty;
  hints: [string, string, string];
  /** Unique current-team ids the player must find, in no particular order. */
  answerTeamIds: string[];
  /** Chronological path for the results screen (may repeat a franchise). */
  path: CareerStop[];
}

export interface DailyGameRecord {
  gameNumber: number;
  gameDate: string; // YYYY-MM-DD
  playerId: string;
  published: boolean;
}

/** Persisted client-side state for a single puzzle attempt (daily or practice). */
export interface GameProgress {
  puzzleKey: string; // "daily-<gameNumber>" or "practice-<playerId>-<timestamp>"
  playerId: string;
  correctTeamIds: string[];
  wrongTeamIds: string[];
  /** Team ids in the exact order they were guessed, correct or wrong. */
  guessOrder: string[];
  hintsUsed: number;
  score: number;
  status: "in_progress" | "won" | "lost";
  startedAt: string;
  completedAt?: string;
}

export interface StatsRecord {
  currentStreak: number;
  longestStreak: number;
  lastCompletedGameDate: string | null;
  totalGamesPlayed: number;
  totalWins: number;
  totalScore: number;
  perfectGames: number;
}

export const EMPTY_STATS: StatsRecord = {
  currentStreak: 0,
  longestStreak: 0,
  lastCompletedGameDate: null,
  totalGamesPlayed: 0,
  totalWins: 0,
  totalScore: 0,
  perfectGames: 0
};
