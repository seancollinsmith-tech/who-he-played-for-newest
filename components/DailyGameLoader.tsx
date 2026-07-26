"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { GameBoard } from "@/components/GameBoard";
import { Puzzle, GameProgress, EMPTY_STATS, StatsRecord } from "@/lib/types";
import { loadDailyProgress, saveDailyProgress } from "@/lib/storage/gameProgress";
import { loadStats, recordDailyCompletion } from "@/lib/storage/stats";
import { logDailyCompletion } from "@/lib/storage/completionLog";
import { trackEvent } from "@/lib/analytics/track";
import { todayLocalDateString } from "@/lib/game/daily";

interface DailyResponse {
  gameNumber: number;
  gameDate: string;
  puzzle: Puzzle;
}

export function DailyGameLoader() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [daily, setDaily] = useState<DailyResponse | null>(null);
  const [progress, setProgress] = useState<GameProgress | null>(null);
  const [stats, setStats] = useState<StatsRecord>(EMPTY_STATS);

  useEffect(() => {
    // Always the browser's own local date — never the server's clock,
    // which runs on UTC and can already be "tomorrow" for anyone west of it.
    const gameDate = todayLocalDateString();

    let cancelled = false;

    async function load() {
      setStats(loadStats());

      const res = await fetch(`/api/daily?date=${gameDate}`);
      const data: DailyResponse = await res.json();
      if (cancelled) return;

      setDaily(data);
      const loadedProgress = loadDailyProgress(data.gameNumber);
      setProgress(loadedProgress);
      setReady(true);

      if (!loadedProgress) {
        trackEvent({ eventType: "daily_started", gameNumber: data.gameNumber, gameDate: data.gameDate });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready || !daily) {
    return (
      <div className="game-shell">
        <Header streak={stats.currentStreak} />
        <div className="grid min-h-[40vh] place-items-center">
          <p className="mono text-sm uppercase tracking-widest text-[#c7c6e0]/50">
            Loading today&rsquo;s puzzle…
          </p>
        </div>
      </div>
    );
  }

  const { puzzle, gameNumber, gameDate } = daily;
  const gameDateLabel = new Date(`${gameDate}T00:00:00`).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  const locked = progress?.status === "won" || progress?.status === "lost";

  return (
    <div className="game-shell">
      <Header streak={stats.currentStreak} />
      <GameBoard
        key={gameNumber}
        puzzle={puzzle}
        mode="daily"
        gameNumber={gameNumber}
        gameDateLabel={gameDateLabel}
        streak={stats.currentStreak}
        stats={stats}
        initialProgress={progress}
        locked={locked}
        onProgressChange={(next) => saveDailyProgress(next)}
        onComplete={(final) => {
          saveDailyProgress(final);
          const updated = recordDailyCompletion({
            gameDate,
            won: final.status === "won",
            score: final.score,
            perfect: final.status === "won" && final.wrongTeamIds.length === 0 && final.hintsUsed === 0
          });
          setStats(updated);
          logDailyCompletion({
            gameNumber,
            gameDate,
            playerId: final.playerId,
            status: final.status === "won" ? "won" : "lost",
            score: final.score
          });
          trackEvent({
            eventType: "daily_completed",
            gameNumber,
            gameDate,
            playerId: final.playerId,
            mode: "daily",
            status: final.status === "won" ? "won" : "lost",
            score: final.score,
            hintsUsed: final.hintsUsed,
            wrongCount: final.wrongTeamIds.length
          });
        }}
        onPracticeAgain={() => router.push("/practice")}
      />
      <footer className="py-6 text-center">
        <p className="mono text-xs uppercase tracking-[0.18em] text-[#c7c6e0]/55">
          New player every day &bull; Built for SpannerSports
        </p>
      </footer>
    </div>
  );
}
