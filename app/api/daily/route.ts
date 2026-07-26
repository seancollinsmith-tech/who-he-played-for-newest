import { NextRequest, NextResponse } from "next/server";
import { buildPuzzle } from "@/lib/game/puzzle";
import { resolveDailyPlayer } from "@/lib/game/daily";
import { getPublishedDailyGame } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

/**
 * Resolves today's daily puzzle for a given date. The date must come from
 * the caller's browser (see DailyGameLoader), not be computed here on the
 * server — the server's clock runs on UTC, which is frequently a different
 * calendar date than the player's actual local date.
 */
export async function GET(request: NextRequest) {
  const dateParam = request.nextUrl.searchParams.get("date");

  if (!dateParam || !/^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
    return NextResponse.json({ error: "A valid ?date=YYYY-MM-DD is required." }, { status: 400 });
  }

  const published = await getPublishedDailyGame(dateParam);
  const { gameNumber, player } = published
    ? { gameNumber: published.gameNumber, player: published.player }
    : resolveDailyPlayer(dateParam);

  const puzzle = buildPuzzle(player);

  return NextResponse.json({ gameNumber, gameDate: dateParam, puzzle });
}
