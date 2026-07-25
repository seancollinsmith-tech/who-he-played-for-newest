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
          <div key={stop.id} className="rounded-2xl border-2 border-[#112f54]/15 bg-white/60 p-4">
            <div className="flex items-center justify-between">
              <span className="mono text-xs font-black uppercase text-[#423920]/50">
                Stop {index + 1}
              </span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => move(stop.id, -1)}
                  disabled={index === 0}
                  aria-label="Move stop earlier"
                  className="rounded-lg border border-[#112f54]/20 p-1.5 disabled:opacity-30"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => move(stop.id, 1)}
                  disabled={index === stops.length - 1}
                  aria-label="Move stop later"
                  className="rounded-lg border border-[#112f54]/20 p-1.5 disabled:opacity-30"
                >
                  <ArrowDown size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => remove(stop.id)}
                  aria-label="Remove stop"
                  className="rounded-lg border border-[#bd2c2c]/30 p-1.5 text-[#bd2c2c]"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="text-xs font-bold text-[#112f54]">
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
                  className="mt-1 w-full rounded-xl border-2 border-[#112f54]/20 bg-white px-3 py-2 font-normal text-[#112f54]"
                >
                  {teamsInDisplayOrder.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.city} {t.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-xs font-bold text-[#112f54]">
                Team name used at the time
                <input
                  value={stop.teamNameUsed}
                  onChange={(e) => update(stop.id, { teamNameUsed: e.target.value })}
                  placeholder={team ? `${team.city} ${team.name}` : ""}
                  className="mt-1 w-full rounded-xl border-2 border-[#112f54]/20 bg-white px-3 py-2 font-normal text-[#112f54]"
                />
              </label>

              <label className="text-xs font-bold text-[#112f54]">
                First season
                <input
                  value={stop.firstSeason}
                  onChange={(e) => update(stop.id, { firstSeason: e.target.value })}
                  placeholder="2015"
                  className="mt-1 w-full rounded-xl border-2 border-[#112f54]/20 bg-white px-3 py-2 font-normal text-[#112f54]"
                />
              </label>

              <label className="text-xs font-bold text-[#112f54]">
                Last season
                <input
                  value={stop.lastSeason}
                  onChange={(e) => update(stop.id, { lastSeason: e.target.value })}
                  placeholder="2017"
                  className="mt-1 w-full rounded-xl border-2 border-[#112f54]/20 bg-white px-3 py-2 font-normal text-[#112f54]"
                />
              </label>

              <label className="text-xs font-bold text-[#112f54]">
                Games played
                <input
                  type="number"
                  min={0}
                  value={stop.gamesPlayed}
                  onChange={(e) => update(stop.id, { gamesPlayed: Number(e.target.value) })}
                  className="mt-1 w-full rounded-xl border-2 border-[#112f54]/20 bg-white px-3 py-2 font-normal text-[#112f54]"
                />
              </label>

              <label className="flex items-center gap-2 text-xs font-bold text-[#112f54] sm:mt-6">
                <input
                  type="checkbox"
                  checked={stop.answerEligible}
                  onChange={(e) => update(stop.id, { answerEligible: e.target.checked })}
                  className="h-4 w-4"
                />
                Answer eligible (counts toward the puzzle)
              </label>

              <label className="text-xs font-bold text-[#112f54] sm:col-span-2">
                Verification notes
                <textarea
                  value={stop.verificationNotes ?? ""}
                  onChange={(e) => update(stop.id, { verificationNotes: e.target.value })}
                  rows={2}
                  className="mt-1 w-full rounded-xl border-2 border-[#112f54]/20 bg-white px-3 py-2 font-normal text-[#112f54]"
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
        className="w-full rounded-2xl border-2 border-dashed border-[#112f54]/30 py-3 text-sm font-black uppercase tracking-wide text-[#112f54] hover:bg-[#112f54]/5"
      >
        + Add Career Stop
      </button>
    </div>
  );
}
