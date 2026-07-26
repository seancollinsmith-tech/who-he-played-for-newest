"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { players } from "@/lib/data/players";
import { loadStats } from "@/lib/storage/stats";
import { EMPTY_STATS } from "@/lib/types";

export default function PracticeIndexPage() {
  const [streak, setStreak] = useState(EMPTY_STATS.currentStreak);
  const verifiedPlayers = players.filter((p) => p.verificationStatus === "verified");

  useEffect(() => {
    setStreak(loadStats().currentStreak);
  }, []);

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6">
      <div className="game-shell">
        <Header streak={streak} />

        <section className="rounded-[2rem] border-2 border-white/10 bg-[#14152c]/80 p-5 shadow-card backdrop-blur sm:p-8">
          <h1 className="display text-4xl font-black uppercase text-[#f5f5ff]">
            Practice Mode
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#c7c6e0]/75">
            Play any verified puzzle as many times as you like. Practice
            results never affect your daily streak.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {verifiedPlayers.map((player) => (
              <Link
                key={player.id}
                href={`/practice/${player.slug}`}
                className="flex items-center justify-between rounded-2xl border-2 border-white/10 bg-[#1c1d3a]/60 px-5 py-4 transition hover:-translate-y-0.5 hover:border-[#f0197c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffc93c]"
              >
                <div>
                  <p className="display text-xl font-black text-[#f5f5ff]">
                    {player.fullName}
                  </p>
                  <p className="mono text-xs uppercase tracking-widest text-[#c7c6e0]/50">
                    {player.careerYearsLabel} &bull; {player.difficulty}
                  </p>
                </div>
                <span className="rounded-full bg-[#123e91] px-3 py-1 text-xs font-black text-white">
                  Play
                </span>
              </Link>
            ))}
          </div>

          {verifiedPlayers.length === 0 && (
            <p className="mt-6 text-sm text-[#c7c6e0]/60">
              No verified puzzles are available yet — check back soon.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
