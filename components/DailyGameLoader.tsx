"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { GameBoard } from "@/components/GameBoard";
import { Puzzle, GameProgress, EMPTY_STATS, StatsRecord } from "@/lib/types";
import { loadDailyProgress, saveDailyProgress } from "@/lib/storage/gameProgress";
import { loadStats, recordDailyCompletion } from "@/lib/storage/stats";

export function DailyGameLoader({
  puzzle,
  gameNumber,
  gameDate,
  gameDateLabel
}: {
  puzzle: Puzzle;
  gameNumber: number;
  gameDate: string;
  gameDateLabel: string;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState<GameProgress | null>(null);
  const [stats, setStats] = useState<StatsRecord>(EMPTY_STATS);

  useEffect(() => {
    setProgress(loadDailyProgress(gameNumber));
    setStats(loadStats());
    setReady(true);
  }, [gameNumber]);

  if (!ready) {
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
