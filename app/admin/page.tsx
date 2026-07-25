"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { Player, VerificationStatus } from "@/lib/types";
import { deleteAdminPlayer, listAdminPlayers, saveAdminPlayer } from "@/lib/storage/adminStore";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const STATUS_STYLES: Record<VerificationStatus, string> = {
  unverified: "bg-[#423920]/10 text-[#423920]",
  reviewed: "bg-[#ffbb33]/30 text-[#8a5a00]",
  verified: "bg-[#1f7a45]/15 text-[#1f7a45]",
  flagged: "bg-[#bd2c2c]/15 text-[#bd2c2c]"
};

export default function AdminDashboardPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const supabaseMode = isSupabaseConfigured();

  useEffect(() => {
    setPlayers(listAdminPlayers());
  }, []);

  function refresh() {
    setPlayers(listAdminPlayers());
  }

  function setStatus(player: Player, status: VerificationStatus) {
    saveAdminPlayer({ ...player, verificationStatus: status });
    refresh();
  }

  function remove(player: Player) {
    if (!confirm(`Delete ${player.fullName}? This cannot be undone.`)) return;
    deleteAdminPlayer(player.id);
    refresh();
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6">
      <div className="game-shell">
        <Header streak={0} />

        <AdminGuard>
          <section className="rounded-[2rem] border-2 border-[#112f54]/15 bg-[#f7efdc]/75 p-5 shadow-card backdrop-blur sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="display text-4xl font-black uppercase text-[#112f54]">
                  Admin Dashboard
                </h1>
                <p className="mono mt-1 text-xs uppercase tracking-widest text-[#423920]/50">
                  {supabaseMode ? "Connected to Supabase" : "Demo mode — local browser storage"}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href="/admin/schedule"
                  className="rounded-2xl border-2 border-[#112f54] px-4 py-2 text-sm font-black uppercase tracking-wide text-[#112f54]"
                >
                  Schedule
                </Link>
                <Link
                  href="/admin/players/new"
                  className="rounded-2xl bg-[#ee5a1f] px-4 py-2 text-sm font-black uppercase tracking-wide text-white"
                >
                  New Player
                </Link>
              </div>
            </div>

            {!supabaseMode && (
              <p className="mt-4 rounded-2xl bg-[#112f54]/5 p-4 text-xs leading-5 text-[#423920]/70">
                Demo mode stores changes in this browser only. Configure
                Supabase (see README) to persist data server-side across
                devices and admins.
              </p>
            )}

            <div className="mt-6 space-y-3">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="rounded-2xl border border-[#112f54]/15 bg-white/60 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="display text-xl font-black text-[#112f54]">
                        {player.fullName || "Untitled player"}
                      </p>
                      <p className="mono text-xs uppercase tracking-widest text-[#423920]/50">
                        {player.careerYearsLabel || "—"} &bull; {player.difficulty} &bull;{" "}
                        {player.careerStops.length} stops
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-black uppercase ${STATUS_STYLES[player.verificationStatus]}`}
                    >
                      {player.verificationStatus}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      href={`/admin/players/${player.id}`}
                      className="rounded-xl border-2 border-[#112f54]/25 px-3 py-1.5 text-xs font-black uppercase text-[#112f54]"
                    >
                      Edit
                    </Link>
                    <Link
                      href={player.slug ? `/practice/${player.slug}` : "#"}
                      className="rounded-xl border-2 border-[#112f54]/25 px-3 py-1.5 text-xs font-black uppercase text-[#112f54]"
                    >
                      Preview
                    </Link>
                    {(["unverified", "reviewed", "verified", "flagged"] as VerificationStatus[])
                      .filter((s) => s !== player.verificationStatus)
                      .map((s) => (
                        <button
                          key={s}
                          onClick={() => setStatus(player, s)}
                          className="rounded-xl bg-[#112f54]/5 px-3 py-1.5 text-xs font-black uppercase text-[#112f54] hover:bg-[#112f54]/10"
                        >
                          Mark {s}
                        </button>
                      ))}
                    <button
                      onClick={() => remove(player)}
                      className="ml-auto rounded-xl border-2 border-[#bd2c2c]/40 px-3 py-1.5 text-xs font-black uppercase text-[#bd2c2c] hover:bg-[#bd2c2c]/5"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {players.length === 0 && (
                <p className="text-sm text-[#423920]/60">No players yet — create one to get started.</p>
              )}
            </div>
          </section>
        </AdminGuard>
      </div>
    </main>
  );
}
