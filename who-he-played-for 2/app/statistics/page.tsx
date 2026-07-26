"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { StatsPanel } from "@/components/StatsPanel";
import { loadStats } from "@/lib/storage/stats";
import { EMPTY_STATS, StatsRecord } from "@/lib/types";

export default function StatisticsPage() {
  const [stats, setStats] = useState<StatsRecord>(EMPTY_STATS);

  useEffect(() => {
    setStats(loadStats());
  }, []);

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6">
      <div className="game-shell">
        <Header streak={stats.currentStreak} />

        <section className="rounded-[2rem] border-2 border-[#112f54]/15 bg-[#f7efdc]/75 p-5 shadow-card backdrop-blur sm:p-8">
          <h1 className="display text-4xl font-black uppercase text-[#112f54]">Statistics</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#423920]/75">
            Your lifetime performance on this device. Sign in to sync stats
            across devices once Supabase accounts are enabled.
          </p>

          <div className="mt-6">
            <StatsPanel stats={stats} />
          </div>

          {stats.totalGamesPlayed === 0 && (
            <p className="mt-6 text-sm text-[#423920]/60">
              Play today&rsquo;s daily game to start building your streak.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
