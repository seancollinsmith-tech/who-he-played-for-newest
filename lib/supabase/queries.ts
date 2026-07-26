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

  const { data: dailyGame } = await supabase
    .from("daily_games")
    .select("*")
    .eq("game_date", gameDate)
    .eq("published", true)
    .maybeSingle();

  if (!dailyGame) return null;

  const { data: playerRow } = await supabase
    .from("players")
    .select("*")
    .eq("id", dailyGame.player_id)
    .maybeSingle();

  if (!playerRow) return null;

  const { data: historyRows } = await supabase
    .from("player_team_history")
    .select("*")
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

  const { data: playerRows } = await supabase.from("players").select("*").order("full_name");
  if (!playerRows) return [];

  const { data: historyRows } = await supabase.from("player_team_history").select("*");

  return playerRows.map((row) => toPlayer(row, historyRows ?? []));
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
