"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { loadStats } from "@/lib/storage/stats";
import { EMPTY_STATS } from "@/lib/types";
import { HINT_PENALTY, MAX_MISTAKES, WRONG_GUESS_PENALTY } from "@/lib/game/scoring";

export default function HowToPlayPage() {
  const [streak, setStreak] = useState(EMPTY_STATS.currentStreak);

  useEffect(() => {
    setStreak(loadStats().currentStreak);
  }, []);

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6">
      <div className="game-shell">
        <Header streak={streak} />

        <section className="rounded-[2rem] border-2 border-[#112f54]/15 bg-[#f7efdc]/75 p-5 shadow-card backdrop-blur sm:p-8">
          <h1 className="display text-4xl font-black uppercase text-[#112f54]">How to Play</h1>

          <div className="mt-4 space-y-4 text-sm leading-6 text-[#423920]/85 sm:text-base">
            <p>
              You&rsquo;ll see one NBA player. Select every current NBA franchise
              the player appeared for in at least one official regular-season
              or playoff game.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Correct picks turn <strong className="text-[#1f7a45]">green</strong> and lock in.</li>
              <li>Incorrect picks turn <strong className="text-[#bd2c2c]">red</strong>, lock, and cost a mistake.</li>
              <li>{MAX_MISTAKES} mistakes and the game ends.</li>
              <li>Find every correct franchise to win.</li>
            </ul>
            <p>
              Teams that <em>drafted</em>, signed, or traded for a player but
              that he never actually suited up for don&rsquo;t count — same for
              preseason, Summer League, G League, and training-camp-only
              stops. A franchise only counts once, even across multiple
              stints.
            </p>
            <div className="rounded-2xl bg-[#112f54] p-4 text-white">
              <p className="mono text-xs uppercase tracking-widest opacity-70">Scoring</p>
              <p className="mt-1">Start at 1,000 points.</p>
              <p>&minus;{WRONG_GUESS_PENALTY} for every incorrect guess.</p>
              <p>&minus;{HINT_PENALTY} for every hint used.</p>
              <p className="mt-1 text-xs opacity-70">Score never drops below zero.</p>
            </div>
            <p>
              One new daily puzzle every day — everyone gets the same player.
              Come back tomorrow for the next one, or head to Practice Mode
              for unlimited replays that don&rsquo;t affect your streak.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
