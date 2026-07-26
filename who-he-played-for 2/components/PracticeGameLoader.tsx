"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { GameBoard } from "@/components/GameBoard";
import { Puzzle, EMPTY_STATS, StatsRecord } from "@/lib/types";
import { loadStats } from "@/lib/storage/stats";

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
      />
      <footer className="py-6 text-center">
        <p className="mono text-xs uppercase tracking-[0.18em] text-[#423920]/55">
          Practice mode &bull; does not affect your daily streak
        </p>
      </footer>
    </div>
  );
}
