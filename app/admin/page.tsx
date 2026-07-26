"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { Player, VerificationStatus } from "@/lib/types";
import {
  deleteAdminPlayer,
  listAdminPlayers,
  resetPlayersToDefaults,
  saveAdminPlayer,
  syncSeedPlayers
} from "@/lib/storage/adminStore";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const STATUS_STYLES: Record<VerificationStatus, string> = {
  unverified: "bg-[#423920]/10 text-[#423920]",
  reviewed: "bg-[#ffbb33]/30 text-[#8a5a00]",
  verified: "bg-[#1f7a45]/15 text-[#1f7a45]",
  flagged: "bg-[#bd2c2c]/15 text-[#bd2c2c]"
};

export default function AdminDashboardPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [syncMessage, setSyncMessage] = useState("");
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

  function handleSync() {
    const added = syncSeedPlayers();
    setSyncMessage(
      added > 0
        ? `Added ${added} new player${added === 1 ? "" : "s"} from the latest code.`
        : "Already up to date — no new players to add."
    );
    refresh();
  }

  function handleReset() {
    if (
      !confirm(
        "Reset all players to the shipped defaults? This deletes any custom players or edits made only in this browser."
      )
    )
      return;
    resetPlayersToDefaults();
    setSyncMessage("Reset to the shipped default player list.");
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
              <div className="flex flex-wrap gap-2">
                {!supabaseMode && (
                  <>
                    <button
                      onClick={handleSync}
                      className="rounded-2xl border-2 border-[#1f7a45] px-4 py-2 text-sm font-black uppercase tracking-wide text-[#1f7a45]"
                    >
                      Sync New Players
                    </button>
                    <button
                      onClick={handleReset}
                      className="rounded-2xl border-2 border-[#bd2c2c]/50 px-4 py-2 text-sm font-black uppercase tracking-wide text-[#bd2c2c]"
                    >
                      Reset to Defaults
                    </button>
                  </>
                )}
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

            {syncMessage && (
              <p className="mt-4 rounded-2xl bg-[#1f7a45]/10 p-3 text-sm font-bold text-[#1f7a45]" role="status">
                {syncMessage}
              </p>
            )}

            {!supabaseMode && (
              <p className="mt-4 rounded-2xl bg-[#112f54]/5 p-4 text-xs leading-5 text-[#423920]/70">
                Demo mode stores changes in this browser only, seeded once
                from the code the first time you opened this page. If the
                code ships more players later (like this update did), click{" "}
                <strong>Sync New Players</strong> above to pull them in
                without losing any edits you've made — or{" "}
                <strong>Reset to Defaults</strong> to wipe local edits and
                start fresh. Configure Supabase (see README) to persist data
                server-side across devices and admins instead.
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
