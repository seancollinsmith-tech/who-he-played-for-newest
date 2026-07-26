"use client";

import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { CareerStop } from "@/lib/types";
import { teamsInDisplayOrder } from "@/lib/data/teams";

export function CareerStopEditor({
  stops,
  onChange
}: {
  stops: CareerStop[];
  onChange: (stops: CareerStop[]) => void;
}) {
  function update(id: string, patch: Partial<CareerStop>) {
    onChange(stops.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  function remove(id: string) {
    onChange(
      stops
        .filter((s) => s.id !== id)
        .map((s, index) => ({ ...s, sequenceNumber: index + 1 }))
    );
  }

  function move(id: string, direction: -1 | 1) {
    const index = stops.findIndex((s) => s.id === id);
    const target = index + direction;
    if (target < 0 || target >= stops.length) return;

    const next = [...stops];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next.map((s, i) => ({ ...s, sequenceNumber: i + 1 })));
  }

  function addStop() {
    const nextId = `stop-${Date.now()}`;
    onChange([
      ...stops,
      {
        id: nextId,
        teamId: teamsInDisplayOrder[0].id,
        franchiseId: teamsInDisplayOrder[0].franchiseId,
        teamNameUsed: `${teamsInDisplayOrder[0].city} ${teamsInDisplayOrder[0].name}`,
        firstSeason: "",
        lastSeason: "",
        sequenceNumber: stops.length + 1,
        gamesPlayed: 0,
        answerEligible: true
      }
    ]);
  }

  return (
    <div className="space-y-3">
      {stops.map((stop, index) => {
        const team = teamsInDisplayOrder.find((t) => t.id === stop.teamId);
        return (
          <div key={stop.id} className="rounded-2xl border-2 border-white/10 bg-[#1c1d3a]/60 p-4">
            <div className="flex items-center justify-between">
              <span className="mono text-xs font-black uppercase text-[#c7c6e0]/50">
                Stop {index + 1}
              </span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => move(stop.id, -1)}
                  disabled={index === 0}
                  aria-label="Move stop earlier"
                  className="rounded-lg border border-white/15 p-1.5 disabled:opacity-30"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => move(stop.id, 1)}
                  disabled={index === stops.length - 1}
                  aria-label="Move stop later"
                  className="rounded-lg border border-white/15 p-1.5 disabled:opacity-30"
                >
                  <ArrowDown size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => remove(stop.id)}
                  aria-label="Remove stop"
                  className="rounded-lg border border-[#ff3358]/30 p-1.5 text-[#ff3358]"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="text-xs font-bold text-[#f5f5ff]">
                Team
                <select
                  value={stop.teamId}
                  onChange={(e) => {
                    const t = teamsInDisplayOrder.find((tm) => tm.id === e.target.value)!;
                    update(stop.id, {
                      teamId: t.id,
                      franchiseId: t.franchiseId,
                      teamNameUsed: stop.teamNameUsed || `${t.city} ${t.name}`
                    });
                  }}
                  className="mt-1 w-full rounded-xl border-2 border-white/15 bg-[#1c1d3a] px-3 py-2 font-normal text-[#f5f5ff]"
                >
                  {teamsInDisplayOrder.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.city} {t.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-xs font-bold text-[#f5f5ff]">
                Team name used at the time
                <input
                  value={stop.teamNameUsed}
                  onChange={(e) => update(stop.id, { teamNameUsed: e.target.value })}
                  placeholder={team ? `${team.city} ${team.name}` : ""}
                  className="mt-1 w-full rounded-xl border-2 border-white/15 bg-[#1c1d3a] px-3 py-2 font-normal text-[#f5f5ff]"
                />
              </label>

              <label className="text-xs font-bold text-[#f5f5ff]">
                First season
                <input
                  value={stop.firstSeason}
                  onChange={(e) => update(stop.id, { firstSeason: e.target.value })}
                  placeholder="2015"
                  className="mt-1 w-full rounded-xl border-2 border-white/15 bg-[#1c1d3a] px-3 py-2 font-normal text-[#f5f5ff]"
                />
              </label>

              <label className="text-xs font-bold text-[#f5f5ff]">
                Last season
                <input
                  value={stop.lastSeason}
                  onChange={(e) => update(stop.id, { lastSeason: e.target.value })}
                  placeholder="2017"
                  className="mt-1 w-full rounded-xl border-2 border-white/15 bg-[#1c1d3a] px-3 py-2 font-normal text-[#f5f5ff]"
                />
              </label>

              <label className="text-xs font-bold text-[#f5f5ff]">
                Games played
                <input
                  type="number"
                  min={0}
                  value={stop.gamesPlayed}
                  onChange={(e) => update(stop.id, { gamesPlayed: Number(e.target.value) })}
                  className="mt-1 w-full rounded-xl border-2 border-white/15 bg-[#1c1d3a] px-3 py-2 font-normal text-[#f5f5ff]"
                />
              </label>

              <label className="flex items-center gap-2 text-xs font-bold text-[#f5f5ff] sm:mt-6">
                <input
                  type="checkbox"
                  checked={stop.answerEligible}
                  onChange={(e) => update(stop.id, { answerEligible: e.target.checked })}
                  className="h-4 w-4"
                />
                Answer eligible (counts toward the puzzle)
              </label>

              <label className="text-xs font-bold text-[#f5f5ff] sm:col-span-2">
                Verification notes
                <textarea
                  value={stop.verificationNotes ?? ""}
                  onChange={(e) => update(stop.id, { verificationNotes: e.target.value })}
                  rows={2}
                  className="mt-1 w-full rounded-xl border-2 border-white/15 bg-[#1c1d3a] px-3 py-2 font-normal text-[#f5f5ff]"
                  placeholder="e.g. drafted but traded before appearing — not eligible"
                />
              </label>
            </div>
          </div>
        );
      })}

      <button
        type="button"
        onClick={addStop}
        className="w-full rounded-2xl border-2 border-dashed border-white/20 py-3 text-sm font-black uppercase tracking-wide text-[#f5f5ff] hover:bg-white/5"
      >
        + Add Career Stop
      </button>
    </div>
  );
}
