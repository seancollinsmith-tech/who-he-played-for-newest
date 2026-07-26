"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Player, VerificationStatus, Difficulty } from "@/lib/types";
import { CareerStopEditor } from "@/components/admin/CareerStopEditor";
import { saveAdminPlayer } from "@/lib/storage/adminStore";
import { buildPuzzle } from "@/lib/game/puzzle";

export function PlayerForm({ initialPlayer }: { initialPlayer: Player }) {
  const router = useRouter();
  const [player, setPlayer] = useState<Player>(initialPlayer);
  const [saved, setSaved] = useState(false);

  const puzzlePreview = buildPuzzle(player);

  function field<K extends keyof Player>(key: K, value: Player[K]) {
    setPlayer((p) => ({ ...p, [key]: value }));
    setSaved(false);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const slug =
      player.slug || player.fullName.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    saveAdminPlayer({ ...player, slug });
    setPlayer((p) => ({ ...p, slug }));
    setSaved(true);
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-bold text-[#f5f5ff]">
          Full name
          <input
            required
            value={player.fullName}
            onChange={(e) => field("fullName", e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-white/15 bg-[#1c1d3a] px-3 py-2.5 font-normal text-[#f5f5ff]"
          />
        </label>

        <label className="text-xs font-bold text-[#f5f5ff]">
          URL slug (auto-generated if left blank)
          <input
            value={player.slug}
            onChange={(e) => field("slug", e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-white/15 bg-[#1c1d3a] px-3 py-2.5 font-normal text-[#f5f5ff]"
          />
        </label>

        <label className="text-xs font-bold text-[#f5f5ff]">
          Image URL (optional)
          <input
            value={player.imageUrl ?? ""}
            onChange={(e) => field("imageUrl", e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-white/15 bg-[#1c1d3a] px-3 py-2.5 font-normal text-[#f5f5ff]"
          />
        </label>

        <label className="text-xs font-bold text-[#f5f5ff]">
          Career years label
          <input
            required
            value={player.careerYearsLabel}
            onChange={(e) => field("careerYearsLabel", e.target.value)}
            placeholder="2009–2021"
            className="mt-1 w-full rounded-xl border-2 border-white/15 bg-[#1c1d3a] px-3 py-2.5 font-normal text-[#f5f5ff]"
          />
        </label>

        <label className="text-xs font-bold text-[#f5f5ff]">
          Career start year
          <input
            type="number"
            value={player.careerStart}
            onChange={(e) => field("careerStart", Number(e.target.value))}
            className="mt-1 w-full rounded-xl border-2 border-white/15 bg-[#1c1d3a] px-3 py-2.5 font-normal text-[#f5f5ff]"
          />
        </label>

        <label className="text-xs font-bold text-[#f5f5ff]">
          Career end year
          <input
            type="number"
            value={player.careerEnd}
            onChange={(e) => field("careerEnd", Number(e.target.value))}
            className="mt-1 w-full rounded-xl border-2 border-white/15 bg-[#1c1d3a] px-3 py-2.5 font-normal text-[#f5f5ff]"
          />
        </label>

        <label className="text-xs font-bold text-[#f5f5ff]">
          Difficulty
          <select
            value={player.difficulty}
            onChange={(e) => field("difficulty", e.target.value as Difficulty)}
            className="mt-1 w-full rounded-xl border-2 border-white/15 bg-[#1c1d3a] px-3 py-2.5 font-normal text-[#f5f5ff]"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <label className="text-xs font-bold text-[#f5f5ff]">
          Verification status
          <select
            value={player.verificationStatus}
            onChange={(e) => field("verificationStatus", e.target.value as VerificationStatus)}
            className="mt-1 w-full rounded-xl border-2 border-white/15 bg-[#1c1d3a] px-3 py-2.5 font-normal text-[#f5f5ff]"
          >
            <option value="unverified">Unverified</option>
            <option value="reviewed">Reviewed</option>
            <option value="verified">Verified</option>
            <option value="flagged">Flagged</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-xs font-bold text-[#f5f5ff]">
          <input
            type="checkbox"
            checked={player.activeStatus}
            onChange={(e) => field("activeStatus", e.target.checked)}
            className="h-4 w-4"
          />
          Currently active player
        </label>

        <label className="text-xs font-bold text-[#f5f5ff]">
          Last verified at
          <input
            type="date"
            value={player.lastVerifiedAt}
            onChange={(e) => field("lastVerifiedAt", e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-white/15 bg-[#1c1d3a] px-3 py-2.5 font-normal text-[#f5f5ff]"
          />
        </label>
      </div>

      <label className="block text-xs font-bold text-[#f5f5ff]">
        Source notes
        <textarea
          value={player.sourceNotes ?? ""}
          onChange={(e) => field("sourceNotes", e.target.value)}
          rows={2}
          className="mt-1 w-full rounded-xl border-2 border-white/15 bg-[#1c1d3a] px-3 py-2.5 font-normal text-[#f5f5ff]"
          placeholder="Where this data was verified against, e.g. Basketball-Reference"
        />
      </label>

      <div>
        <p className="mb-2 text-xs font-black uppercase tracking-widest text-[#c7c6e0]/60">
          Hints (all three required)
        </p>
        <div className="space-y-2">
          {[0, 1, 2].map((i) => (
            <input
              key={i}
              required
              value={player.hints[i]}
              onChange={(e) => {
                const hints = [...player.hints] as [string, string, string];
                hints[i] = e.target.value;
                field("hints", hints);
              }}
              placeholder={`Hint ${i + 1}`}
              className="w-full rounded-xl border-2 border-white/15 bg-[#1c1d3a] px-3 py-2.5 text-sm text-[#f5f5ff]"
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-black uppercase tracking-widest text-[#c7c6e0]/60">
          Career stops ({puzzlePreview.answerTeamIds.length} unique answer franchise
          {puzzlePreview.answerTeamIds.length === 1 ? "" : "s"})
        </p>
        <CareerStopEditor stops={player.careerStops} onChange={(stops) => field("careerStops", stops)} />
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
        <button
          type="submit"
          className="rounded-2xl bg-[#123e91] px-6 py-3 font-black uppercase tracking-wider text-white"
        >
          Save Player
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="rounded-2xl border-2 border-white/15 px-6 py-3 font-black uppercase tracking-wider text-[#f5f5ff]"
        >
          Back to Dashboard
        </button>
        {saved && (
          <span className="text-sm font-bold text-[#22e584]" role="status">
            Saved.
          </span>
        )}
      </div>
    </form>
  );
}
