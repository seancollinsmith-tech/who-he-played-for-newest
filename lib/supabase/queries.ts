import { getSupabaseServerClient } from "@/lib/supabase/server";
import { CareerStop, Player } from "@/lib/types";
import type { Database } from "@/lib/supabase/database.types";

type PlayerRow = Database["public"]["Tables"]["players"]["Row"];
type HistoryRow = Database["public"]["Tables"]["player_team_history"]["Row"];

function toCareerStop(row: HistoryRow): CareerStop {
  return {
    id: row.id,
    teamId: row.team_id,
    franchiseId: row.franchise_id,
    teamNameUsed: row.team_name_used,
    firstSeason: row.first_season,
    lastSeason: row.last_season,
    sequenceNumber: row.sequence_number,
    gamesPlayed: row.games_played,
    answerEligible: row.answer_eligible,
    verificationNotes: row.verification_notes ?? undefined
  };
}

function toPlayer(row: PlayerRow, history: HistoryRow[]): Player {
  return {
    id: row.id,
    fullName: row.full_name,
    slug: row.slug,
    imageUrl: row.image_url ?? undefined,
    careerStart: row.career_start,
    careerEnd: row.career_end,
    careerYearsLabel: row.career_years_label,
    difficulty: row.difficulty,
    activeStatus: row.active_status,
    verificationStatus: row.verification_status,
    hints: (row.hints.length === 3 ? row.hints : [row.hints[0] ?? "", row.hints[1] ?? "", row.hints[2] ?? ""]) as [
      string,
      string,
      string
    ],
    sourceNotes: row.source_notes ?? undefined,
    lastVerifiedAt: row.last_verified_at ?? "",
    careerStops: history.filter((h) => h.player_id === row.id).map(toCareerStop)
  };
}

/** Looks up the published daily game for a date. Returns null if Supabase
 *  isn't configured or no puzzle has been published for that date — callers
 *  should fall back to `resolveDailyPlayer` from lib/game/daily.ts. */
export async function getPublishedDailyGame(gameDate: string): Promise<{
  gameNumber: number;
  player: Player;
} | null> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;

  type DailyGameRow = Database["public"]["Tables"]["daily_games"]["Row"];

  const { data: dailyGame } = await supabase
    .from("daily_games")
    .select("*")
    .eq("game_date", gameDate)
    .eq("published", true)
    .maybeSingle<DailyGameRow>();

  if (!dailyGame) return null;

  const { data: playerRow } = await supabase
    .from("players")
    .select("*")
    .eq("id", dailyGame.player_id)
    .maybeSingle<PlayerRow>();

  if (!playerRow) return null;

  const { data: historyRows } = await supabase
    .from("player_team_history")
    .select<"*", HistoryRow>("*")
    .eq("player_id", playerRow.id)
    .order("sequence_number", { ascending: true });

  return {
    gameNumber: dailyGame.game_number,
    player: toPlayer(playerRow, historyRows ?? [])
  };
}

export async function listAllPlayers(): Promise<Player[] | null> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;

  const { data: playerRows } = await supabase
    .from("players")
    .select<"*", PlayerRow>("*")
    .order("full_name");
  if (!playerRows) return [];

  const { data: historyRows } = await supabase
    .from("player_team_history")
    .select<"*", HistoryRow>("*");

  return playerRows.map((row) => toPlayer(row, historyRows ?? []));
}

export interface AnalyticsSummary {
  totalDailyCompleted: number;
  totalDailyStarted: number;
  completionRate: number; // 0-100
  averageScore: number;
  winRate: number; // 0-100
  uniqueDaysWithActivity: number;
  recentDays: Array<{ gameDate: string; completions: number; averageScore: number }>;
}

/** Pulls an aggregate analytics summary from analytics_events. Returns null
 *  if Supabase isn't configured, or if the signed-in user isn't an admin
 *  (the underlying RLS policy simply returns no rows in that case). */
export async function getAnalyticsSummary(): Promise<AnalyticsSummary | null> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;

  type AnalyticsRow = Pick<
    Database["public"]["Tables"]["analytics_events"]["Row"],
    "event_type" | "game_date" | "status" | "score"
  >;

  const { data: events } = await supabase
    .from("analytics_events")
    .select<"event_type, game_date, status, score", AnalyticsRow>("event_type, game_date, status, score")
    .order("created_at", { ascending: false })
    .limit(5000);

  if (!events) return null;

  const started = events.filter((e) => e.event_type === "daily_started");
  const completed = events.filter((e) => e.event_type === "daily_completed");
  const won = completed.filter((e) => e.status === "won");
  const scores = completed.map((e) => e.score).filter((s): s is number => typeof s === "number");
  const averageScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  const days = new Set(events.map((e) => e.game_date).filter(Boolean));

  const byDay = new Map<string, { completions: number; scoreSum: number }>();
  for (const e of completed) {
    if (!e.game_date) continue;
    const entry = byDay.get(e.game_date) ?? { completions: 0, scoreSum: 0 };
    entry.completions += 1;
    entry.scoreSum += e.score ?? 0;
    byDay.set(e.game_date, entry);
  }
  const recentDays = Array.from(byDay.entries())
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, 14)
    .map(([gameDate, { completions, scoreSum }]) => ({
      gameDate,
      completions,
      averageScore: completions > 0 ? Math.round(scoreSum / completions) : 0
    }));

  return {
    totalDailyCompleted: completed.length,
    totalDailyStarted: started.length,
    completionRate: started.length > 0 ? Math.round((completed.length / started.length) * 100) : 0,
    averageScore,
    winRate: completed.length > 0 ? Math.round((won.length / completed.length) * 100) : 0,
    uniqueDaysWithActivity: days.size,
    recentDays
  };
}

export async function isCurrentUserAdmin(): Promise<boolean> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return false;

  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return false;

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle<{ is_admin: boolean }>();

  return Boolean(profile?.is_admin);
}
