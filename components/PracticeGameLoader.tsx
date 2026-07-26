"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { GameBoard } from "@/components/GameBoard";
import { Puzzle, EMPTY_STATS, StatsRecord } from "@/lib/types";
import { loadStats } from "@/lib/storage/stats";
import { trackEvent } from "@/lib/analytics/track";

export function PracticeGameLoader({ puzzle }: { puzzle: Puzzle }) {
  const [stats, setStats] = useState<StatsRecord>(EMPTY_STATS);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setStats(loadStats());
  }, []);

  return (
    <div className="game-shell">
      <Header streak={stats.currentStreak} />
      <GameBoard
        key={attempt}
        puzzle={puzzle}
        mode="practice"
        streak={stats.currentStreak}
        stats={stats}
        onPracticeAgain={() => setAttempt((n) => n + 1)}
        onComplete={(final) =>
          trackEvent({
            eventType: "practice_completed",
            playerId: final.playerId,
            mode: "practice",
            status: final.status === "won" ? "won" : "lost",
            score: final.score,
            hintsUsed: final.hintsUsed,
            wrongCount: final.wrongTeamIds.length
          })
        }
      />
      <footer className="py-6 text-center">
        <p className="mono text-xs uppercase tracking-[0.18em] text-[#c7c6e0]/55">
          Practice mode &bull; does not affect your daily streak
        </p>
      </footer>
    </div>
  );
}
