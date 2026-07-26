import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const SESSION_KEY = "whpf:analytics-session-id";

/** A random, anonymous per-browser token — not tied to any account or
 *  personal data. Used only to get a rough sense of daily-return activity. */
function getSessionId(): string {
  if (typeof window === "undefined") return "server";
  try {
    let id = window.localStorage.getItem(SESSION_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `anon-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      window.localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "anon-unknown";
  }
}

type TrackEventInput = {
  eventType: "daily_started" | "daily_completed" | "practice_completed";
  gameNumber?: number;
  gameDate?: string;
  playerId?: string;
  mode?: "daily" | "practice";
  status?: "won" | "lost";
  score?: number;
  hintsUsed?: number;
  wrongCount?: number;
};

/**
 * Fires an anonymous analytics event to Supabase (see
 * supabase/schema.sql#analytics_events). Silently does nothing in demo mode
 * or if the insert fails for any reason — analytics should never be able to
 * break gameplay.
 */
export async function trackEvent(input: TrackEventInput): Promise<void> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return;

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from("analytics_events") as any).insert({
      event_type: input.eventType,
      game_number: input.gameNumber ?? null,
      game_date: input.gameDate ?? null,
      player_id: input.playerId ?? null,
      mode: input.mode ?? null,
      status: input.status ?? null,
      score: input.score ?? null,
      hints_used: input.hintsUsed ?? null,
      wrong_count: input.wrongCount ?? null,
      session_id: getSessionId()
    });
  } catch {
    // Analytics failures should never surface to the player.
  }
}
