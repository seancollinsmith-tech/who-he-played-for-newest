import { players } from "@/lib/data/players";
import { Player } from "@/lib/types";

/** Day zero for the local, offline daily rotation. Game #1 = this date. */
export const EPOCH_DATE = "2026-07-25";

/** Returns YYYY-MM-DD for the user's local calendar date. */
export function todayLocalDateString(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** 1-indexed daily game number for a given local date string. */
export function gameNumberForDate(dateString: string): number {
  const start = new Date(`${EPOCH_DATE}T00:00:00`);
  const current = new Date(`${dateString}T00:00:00`);
  const days = Math.floor((current.getTime() - start.getTime()) / 86_400_000);
  return Math.max(1, days + 1);
}

/**
 * Local fallback rotation used when Supabase isn't configured (or a
 * `daily_games` row hasn't been published for a given date): cycles verified
 * players in a stable, deterministic order so every visitor on the same
 * calendar day gets the same player.
 */
export function fallbackDailyPlayer(dateString: string): Player {
  const verified = players.filter((p) => p.verificationStatus === "verified");
  const pool = verified.length > 0 ? verified : players;
  const gameNumber = gameNumberForDate(dateString);
  const index = ((gameNumber - 1) % pool.length + pool.length) % pool.length;
  return pool[index];
}

/**
 * Resolves today's player. If a Supabase-backed daily schedule is available
 * this should be called with the resolved player id from `daily_games`
 * instead — see `lib/supabase/queries.ts#getPublishedDailyGame`. This
 * function is the offline/demo-mode source of truth.
 */
export function resolveDailyPlayer(dateString: string = todayLocalDateString()): {
  gameNumber: number;
  gameDate: string;
  player: Player;
} {
  return {
    gameNumber: gameNumberForDate(dateString),
    gameDate: dateString,
    player: fallbackDailyPlayer(dateString)
  };
}
