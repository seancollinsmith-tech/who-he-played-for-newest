"use client";

import { Header } from "@/components/Header";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { PlayerForm } from "@/components/admin/PlayerForm";
import { createEmptyPlayer } from "@/lib/storage/adminStore";

export default function NewPlayerPage() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6">
      <div className="game-shell">
        <Header streak={0} />
        <AdminGuard>
          <section className="rounded-[2rem] border-2 border-[#112f54]/15 bg-[#f7efdc]/75 p-5 shadow-card backdrop-blur sm:p-8">
            <h1 className="display text-3xl font-black uppercase text-[#112f54]">New Player</h1>
            <div className="mt-6">
              <PlayerForm initialPlayer={createEmptyPlayer()} />
            </div>
          </section>
        </AdminGuard>
      </div>
    </main>
  );
}
