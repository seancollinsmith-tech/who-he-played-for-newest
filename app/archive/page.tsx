"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { players } from "@/lib/data/players";
import { loadStats } from "@/lib/storage/stats";
import { EMPTY_STATS } from "@/lib/types";
import { EPOCH_DATE, gameNumberForDate, todayLocalDateString } from "@/lib/game/daily";

export default function ArchivePage() {
  const [streak, setStreak] = useState(EMPTY_STATS.currentStreak);

  useEffect(() => {
    setStreak(loadStats().currentStreak);
  }, []);

  const verifiedPlayers = players.filter((p) => p.verificationStatus === "verified");
  const todayGameNumber = gameNumberForDate(todayLocalDateString());

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6">
      <div className="game-shell">
        <Header streak={streak} />

        <section className="rounded-[2rem] border-2 border-[#112f54]/15 bg-[#f7efdc]/75 p-5 shadow-card backdrop-blur sm:p-8">
          <h1 className="display text-4xl font-black uppercase text-[#112f54]">Archive</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#423920]/75">
            Missed a day, or just want to replay a past puzzle? Every
            published puzzle stays available here in practice mode — replays
            never affect your streak or score history.
          </p>

          <p className="mono mt-4 text-xs uppercase tracking-widest text-[#423920]/50">
            Local rotation started {EPOCH_DATE} &bull; today is Game #{todayGameNumber}
          </p>

          <ol className="mt-6 space-y-2">
            {verifiedPlayers.map((player, index) => (
              <li key={player.id}>
                <Link
                  href={`/practice/${player.slug}`}
                  className="flex items-center justify-between rounded-2xl border border-[#112f54]/15 bg-white/60 px-5 py-4 transition hover:-translate-y-0.5 hover:border-[#ee5a1f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee5a1f]"
                >
                  <div className="flex items-center gap-4">
                    <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-[#112f54] text-xs font-black text-white">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-black text-[#112f54]">{player.fullName}</p>
                      <p className="mono text-xs uppercase tracking-widest text-[#423920]/50">
                        {player.careerYearsLabel}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border-2 border-[#112f54]/20 px-3 py-1 text-xs font-black uppercase text-[#112f54]">
                    Practice
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
