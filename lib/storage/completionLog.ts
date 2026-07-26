import { readJSON, writeJSON } from "@/lib/storage/local";

const KEY = "completion-log";
const MAX_ENTRIES = 120;

export interface CompletionLogEntry {
  gameNumber: number;
  gameDate: string;
  playerId: string;
  status: "won" | "lost";
  score: number;
}

/** Records the outcome of a daily game for Archive display. Safe to call
 *  more than once for the same game number — the latest call wins. */
export function logDailyCompletion(entry: CompletionLogEntry): void {
  const log = readJSON<CompletionLogEntry[]>(KEY, []);
  const withoutThisGame = log.filter((e) => e.gameNumber !== entry.gameNumber);
  const next = [...withoutThisGame, entry]
    .sort((a, b) => b.gameNumber - a.gameNumber)
    .slice(0, MAX_ENTRIES);
  writeJSON(KEY, next);
}

export function getCompletionLog(): CompletionLogEntry[] {
  return readJSON<CompletionLogEntry[]>(KEY, []);
}

export function getCompletionForGame(gameNumber: number): CompletionLogEntry | undefined {
  return getCompletionLog().find((e) => e.gameNumber === gameNumber);
}
