import { DailyGameLoader } from "@/components/DailyGameLoader";
import { buildPuzzle } from "@/lib/game/puzzle";
import { resolveDailyPlayer, todayLocalDateString } from "@/lib/game/daily";
import { getPublishedDailyGame } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const gameDate = todayLocalDateString();

  const published = await getPublishedDailyGame(gameDate);
  const { gameNumber, player } = published
    ? { gameNumber: published.gameNumber, player: published.player }
    : resolveDailyPlayer(gameDate);

  const puzzle = buildPuzzle(player);

  const gameDateLabel = new Date(`${gameDate}T00:00:00`).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6">
      <DailyGameLoader
        puzzle={puzzle}
        gameNumber={gameNumber}
        gameDate={gameDate}
        gameDateLabel={gameDateLabel}
      />
    </main>
  );
}
