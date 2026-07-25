import { EMPTY_STATS, StatsRecord } from "@/lib/types";
import { readJSON, writeJSON } from "@/lib/storage/local";
import { gameNumberForDate } from "@/lib/game/daily";

const STATS_KEY = "stats";

export function loadStats(): StatsRecord {
  return readJSON<StatsRecord>(STATS_KEY, EMPTY_STATS);
}

function isConsecutiveDay(prevDate: string | null, gameDate: string): boolean {
  if (!prevDate) return false;
  return gameNumberForDate(gameDate) - gameNumberForDate(prevDate) === 1;
}

/**
 * Records the result of a completed DAILY game. Safe to call multiple times
 * for the same game date — it's a no-op if that date was already recorded,
 * which is what stops refresh/replay from inflating the streak.
 */
export function recordDailyCompletion({
  gameDate,
  won,
  score,
  perfect
}: {
  gameDate: string;
  won: boolean;
  score: number;
  perfect: boolean;
}): StatsRecord {
  const stats = loadStats();

  if (stats.lastCompletedGameDate === gameDate) {
    // Already recorded today's result — never double-count.
    return stats;
  }

  const nextStreak = won
    ? isConsecutiveDay(stats.lastCompletedGameDate, gameDate)
      ? stats.currentStreak + 1
      : 1
    : 0;

  const next: StatsRecord = {
    currentStreak: nextStreak,
    longestStreak: Math.max(stats.longestStreak, nextStreak),
    lastCompletedGameDate: gameDate,
    totalGamesPlayed: stats.totalGamesPlayed + 1,
    totalWins: stats.totalWins + (won ? 1 : 0),
    totalScore: stats.totalScore + score,
    perfectGames: stats.perfectGames + (perfect ? 1 : 0)
  };

  writeJSON(STATS_KEY, next);
  return next;
}

export function averageScore(stats: StatsRecord): number {
  if (stats.totalGamesPlayed === 0) return 0;
  return Math.round(stats.totalScore / stats.totalGamesPlayed);
}

export function winPercentage(stats: StatsRecord): number {
  if (stats.totalGamesPlayed === 0) return 0;
  return Math.round((stats.totalWins / stats.totalGamesPlayed) * 100);
}
