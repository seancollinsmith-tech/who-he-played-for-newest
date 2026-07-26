import { players as seedPlayers } from "@/lib/data/players";
import { DailyGameRecord, Player } from "@/lib/types";
import { readJSON, writeJSON } from "@/lib/storage/local";
import { gameNumberForDate } from "@/lib/game/daily";

const PLAYERS_KEY = "admin-players";
const SCHEDULE_KEY = "admin-schedule";

/**
 * DEMO-MODE ONLY. When Supabase env vars aren't set, the admin area reads
 * and writes this local, per-browser "database" instead of a real backend.
 * It exists so the full admin workflow is explorable without any setup —
 * it is NOT multi-user, NOT secure, and NOT meant for production. Configure
 * Supabase (see .env.example + supabase/schema.sql) for real persistence.
 */
export function listAdminPlayers(): Player[] {
  return readJSON<Player[]>(PLAYERS_KEY, seedPlayers);
}

export function getAdminPlayer(id: string): Player | undefined {
  return listAdminPlayers().find((p) => p.id === id);
}

export function saveAdminPlayer(player: Player): void {
  const all = listAdminPlayers();
  const index = all.findIndex((p) => p.id === player.id);
  if (index === -1) {
    writeJSON(PLAYERS_KEY, [...all, player]);
  } else {
    const next = [...all];
    next[index] = player;
    writeJSON(PLAYERS_KEY, next);
  }
}

export function deleteAdminPlayer(id: string): void {
  writeJSON(
    PLAYERS_KEY,
    listAdminPlayers().filter((p) => p.id !== id)
  );
}

export function createEmptyPlayer(): Player {
  return {
    id: `player-${Date.now()}`,
    fullName: "",
    slug: "",
    careerStart: new Date().getFullYear(),
    careerEnd: new Date().getFullYear(),
    careerYearsLabel: "",
    difficulty: "medium",
    activeStatus: true,
    verificationStatus: "unverified",
    hints: ["", "", ""],
    careerStops: [],
    lastVerifiedAt: ""
  };
}

export function listSchedule(): DailyGameRecord[] {
  return readJSON<DailyGameRecord[]>(SCHEDULE_KEY, []);
}

export function scheduleDailyGame(record: DailyGameRecord): { ok: true } | { ok: false; error: string } {
  if (record.published) {
    const player = getAdminPlayer(record.playerId);
    if (!player || player.verificationStatus !== "verified") {
      return { ok: false, error: "Only verified players can be published to the daily schedule." };
    }
  }

  const all = listSchedule().filter((r) => r.gameDate !== record.gameDate);
  writeJSON(SCHEDULE_KEY, [...all, record].sort((a, b) => a.gameDate.localeCompare(b.gameDate)));
  return { ok: true };
}

export function unpublishDailyGame(gameDate: string): void {
  const all = listSchedule().map((r) => (r.gameDate === gameDate ? { ...r, published: false } : r));
  writeJSON(SCHEDULE_KEY, all);
}

export function nextUnscheduledDate(): string {
  const scheduled = new Set(listSchedule().map((r) => r.gameDate));
  const date = new Date();
  for (let i = 0; i < 365; i++) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const str = `${y}-${m}-${d}`;
    if (!scheduled.has(str)) return str;
    date.setDate(date.getDate() + 1);
  }
  return "";
}

export function gameNumberFor(gameDate: string): number {
  return gameNumberForDate(gameDate);
}
