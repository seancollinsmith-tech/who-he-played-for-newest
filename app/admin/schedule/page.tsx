"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { Player, DailyGameRecord } from "@/lib/types";
import {
  gameNumberFor,
  listAdminPlayers,
  listSchedule,
  nextUnscheduledDate,
  scheduleDailyGame,
  unpublishDailyGame
} from "@/lib/storage/adminStore";

export default function SchedulePage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [schedule, setSchedule] = useState<DailyGameRecord[]>([]);
  const [gameDate, setGameDate] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const p = listAdminPlayers();
    setPlayers(p);
    setSchedule(listSchedule());
    setGameDate(nextUnscheduledDate());
    setPlayerId(p[0]?.id ?? "");
  }, []);

  function refresh() {
    setSchedule(listSchedule());
    setGameDate(nextUnscheduledDate());
  }

  function handleSchedule(publish: boolean) {
    setError("");
    if (!gameDate || !playerId) return;

    const result = scheduleDailyGame({
      gameNumber: gameNumberFor(gameDate),
      gameDate,
      playerId,
      published: publish
    });

    if (!result.ok) {
      setError(result.error);
      return;
    }
    refresh();
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6">
      <div className="game-shell">
        <Header streak={0} />
        <AdminGuard>
          <section className="rounded-[2rem] border-2 border-white/10 bg-[#14152c]/80 p-5 shadow-card backdrop-blur sm:p-8">
            <h1 className="display text-3xl font-black uppercase text-[#f5f5ff]">Daily Schedule</h1>
            <p className="mt-2 text-sm text-[#c7c6e0]/70">
              Assign a player to a calendar date, then publish it. Unverified
              players can be scheduled as a draft, but can&rsquo;t be published.
            </p>

            <div className="mt-6 grid gap-3 rounded-2xl bg-[#1c1d3a]/60 p-4 sm:grid-cols-3">
              <label className="text-xs font-bold text-[#f5f5ff]">
                Date
                <input
                  type="date"
                  value={gameDate}
                  onChange={(e) => setGameDate(e.target.value)}
                  className="mt-1 w-full rounded-xl border-2 border-white/15 bg-[#1c1d3a] px-3 py-2.5 font-normal text-[#f5f5ff]"
                />
              </label>
              <label className="text-xs font-bold text-[#f5f5ff] sm:col-span-2">
                Player
                <select
                  value={playerId}
                  onChange={(e) => setPlayerId(e.target.value)}
                  className="mt-1 w-full rounded-xl border-2 border-white/15 bg-[#1c1d3a] px-3 py-2.5 font-normal text-[#f5f5ff]"
                >
                  {players.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.fullName || "Untitled"} ({p.verificationStatus})
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex gap-2 sm:col-span-3">
                <button
                  onClick={() => handleSchedule(false)}
                  className="rounded-2xl border-2 border-[#29b6f6] px-5 py-2.5 text-sm font-black uppercase tracking-wide text-[#f5f5ff]"
                >
                  Save as Draft
                </button>
                <button
                  onClick={() => handleSchedule(true)}
                  className="rounded-2xl bg-[#12a85a] px-5 py-2.5 text-sm font-black uppercase tracking-wide text-white"
                >
                  Publish
                </button>
              </div>
              {error && (
                <p className="text-sm font-bold text-[#ff3358] sm:col-span-3">{error}</p>
              )}
            </div>

            <div className="mt-6 space-y-2">
              {schedule.map((record) => {
                const player = players.find((p) => p.id === record.playerId);
                return (
                  <div
                    key={record.gameDate}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-[#1c1d3a]/60 px-4 py-3"
                  >
                    <div>
                      <p className="font-black text-[#f5f5ff]">
                        Game #{record.gameNumber} &bull; {record.gameDate}
                      </p>
                      <p className="mono text-xs uppercase tracking-widest text-[#c7c6e0]/50">
                        {player?.fullName ?? "Unknown player"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black uppercase ${
                          record.published
                            ? "bg-[#22e584]/15 text-[#22e584]"
                            : "bg-white/10 text-[#c7c6e0]"
                        }`}
                      >
                        {record.published ? "Published" : "Draft"}
                      </span>
                      {record.published && (
                        <button
                          onClick={() => {
                            unpublishDailyGame(record.gameDate);
                            refresh();
                          }}
                          className="rounded-xl border-2 border-[#ff3358]/40 px-3 py-1.5 text-xs font-black uppercase text-[#ff3358]"
                        >
                          Unpublish
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
              {schedule.length === 0 && (
                <p className="text-sm text-[#c7c6e0]/60">Nothing scheduled yet.</p>
              )}
            </div>
          </section>
        </AdminGuard>
      </div>
    </main>
  );
}
