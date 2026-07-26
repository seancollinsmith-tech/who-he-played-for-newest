"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/Header";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { PlayerForm } from "@/components/admin/PlayerForm";
import { getAdminPlayer } from "@/lib/storage/adminStore";
import { Player } from "@/lib/types";

export default function EditPlayerPage() {
  const params = useParams<{ id: string }>();
  const [player, setPlayer] = useState<Player | null | undefined>(undefined);

  useEffect(() => {
    setPlayer(getAdminPlayer(params.id) ?? null);
  }, [params.id]);

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6">
      <div className="game-shell">
        <Header streak={0} />
        <AdminGuard>
          <section className="rounded-[2rem] border-2 border-white/10 bg-[#14152c]/80 p-5 shadow-card backdrop-blur sm:p-8">
            <h1 className="display text-3xl font-black uppercase text-[#f5f5ff]">Edit Player</h1>
            <div className="mt-6">
              {player === undefined && (
                <p className="text-sm text-[#c7c6e0]/60">Loading…</p>
              )}
              {player === null && (
                <p className="text-sm text-[#ff3358]">Player not found.</p>
              )}
              {player && <PlayerForm initialPlayer={player} />}
            </div>
          </section>
        </AdminGuard>
      </div>
    </main>
  );
}
