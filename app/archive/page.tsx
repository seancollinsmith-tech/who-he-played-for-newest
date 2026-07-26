"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { loadStats } from "@/lib/storage/stats";
import { getCompletionLog } from "@/lib/storage/completionLog";
import { EMPTY_STATS } from "@/lib/types";
import {
  dateForGameNumber,
  gameNumberForDate,
  resolveDailyPlayer,
  todayLocalDateString
} from "@/lib/game/daily";

const MAX_DAYS_SHOWN = 60;

export default function ArchivePage() {
  const [streak, setStreak] = useState(EMPTY_STATS.currentStreak);
  const [completions, setCompletions] = useState<
    ReturnType<typeof getCompletionLog>
  >([]);

  useEffect(() => {
    setStreak(loadStats().currentStreak);
    setCompletions(getCompletionLog());
  }, []);

  const todayGameNumber = gameNumberForDate(todayLocalDateString());
  const firstGameShown = Math.max(1, todayGameNumber - MAX_DAYS_SHOWN + 1);

  const games = [];
  for (let n = todayGameNumber; n >= firstGameShown; n--) {
    const gameDate = n === todayGameNumber ? todayLocalDateString() : dateForGameNumber(n);
    const { player } = resolveDailyPlayer(gameDate);
    const completion = completions.find((c) => c.gameNumber === n);
    games.push({ gameNumber: n, gameDate, player, completion, isToday: n === todayGameNumber });
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6">
      <div className="game-shell">
        <Header streak={streak} />

        <section className="rounded-[2rem] border-2 border-white/10 bg-[#14152c]/80 p-5 shadow-card backdrop-blur sm:p-8">
          <h1 className="display text-4xl font-black uppercase text-[#f5f5ff]">Archive</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#c7c6e0]/75">
            Every past daily game, in order. Missed a day? Catch up here —
            playing an archived puzzle runs in practice mode, so it never
            affects your streak or daily score history.
          </p>

          <ol className="mt-6 space-y-2">
            {games.map((game) => {
              const won = game.completion?.status === "won";
              const played = Boolean(game.completion);

              return (
                <li key={game.gameNumber}>
                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#1c1d3a]/60 px-5 py-4">
                    <div className="flex items-center gap-4">
                      <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-[#123e91] text-xs font-black text-white">
                        {game.gameNumber}
                      </span>
                      <div>
                        <p className="font-black text-[#f5f5ff]">
                          {game.isToday ? "Today's Game" : game.player.fullName}
                        </p>
                        <p className="mono text-xs uppercase tracking-widest text-[#c7c6e0]/50">
                          {game.gameDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {played && (
                        <span
                          className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-black uppercase ${
                            won
                              ? "bg-[#22e584]/15 text-[#22e584]"
                              : "bg-[#ff3358]/15 text-[#ff3358]"
                          }`}
                        >
                          {won ? (
                            <CheckCircle2 size={14} aria-hidden="true" />
                          ) : (
                            <XCircle size={14} aria-hidden="true" />
                          )}
                          {game.completion?.score}
                        </span>
                      )}

                      {game.isToday ? (
                        <Link
                          href="/"
                          className="rounded-full border-2 border-white/15 px-3 py-1 text-xs font-black uppercase text-[#f5f5ff] transition hover:border-[#f0197c]"
                        >
                          Play
                        </Link>
                      ) : (
                        <Link
                          href={`/practice/${game.player.slug}`}
                          className="rounded-full border-2 border-white/15 px-3 py-1 text-xs font-black uppercase text-[#f5f5ff] transition hover:border-[#f0197c]"
                        >
                          {played ? "Replay" : "Practice"}
                        </Link>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {firstGameShown > 1 && (
            <p className="mono mt-4 text-center text-xs uppercase tracking-widest text-[#c7c6e0]/40">
              Showing the last {MAX_DAYS_SHOWN} days
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
