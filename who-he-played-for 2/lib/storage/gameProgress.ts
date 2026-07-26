import { GameProgress } from "@/lib/types";
import { readJSON, writeJSON } from "@/lib/storage/local";

const DAILY_PROGRESS_KEY = "daily-progress";

/** There is only ever one daily progress record at a time — it's keyed by
 * game number internally, so a new day naturally supersedes the old one. */
export function loadDailyProgress(gameNumber: number): GameProgress | null {
  const record = readJSON<GameProgress | null>(DAILY_PROGRESS_KEY, null);
  if (!record) return null;
  if (record.puzzleKey !== `daily-${gameNumber}`) return null; // stale, previous day
  return record;
}

export function saveDailyProgress(progress: GameProgress): void {
  writeJSON(DAILY_PROGRESS_KEY, progress);
}

export function newProgress(puzzleKey: string, playerId: string): GameProgress {
  return {
    puzzleKey,
    playerId,
    correctTeamIds: [],
    wrongTeamIds: [],
    guessOrder: [],
    hintsUsed: 0,
    score: 1000,
    status: "in_progress",
    startedAt: new Date().toISOString()
  };
}
