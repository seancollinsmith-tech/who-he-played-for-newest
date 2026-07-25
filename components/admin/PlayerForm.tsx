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
        <label className="text-xs font-bold text-[#112f54]">
          Full name
          <input
            required
            value={player.fullName}
            onChange={(e) => field("fullName", e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#112f54]/20 bg-white px-3 py-2.5 font-normal text-[#112f54]"
          />
        </label>

        <label className="text-xs font-bold text-[#112f54]">
          URL slug (auto-generated if left blank)
          <input
            value={player.slug}
            onChange={(e) => field("slug", e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#112f54]/20 bg-white px-3 py-2.5 font-normal text-[#112f54]"
          />
        </label>

        <label className="text-xs font-bold text-[#112f54]">
          Image URL (optional)
          <input
            value={player.imageUrl ?? ""}
            onChange={(e) => field("imageUrl", e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#112f54]/20 bg-white px-3 py-2.5 font-normal text-[#112f54]"
          />
        </label>

        <label className="text-xs font-bold text-[#112f54]">
          Career years label
          <input
            required
            value={player.careerYearsLabel}
            onChange={(e) => field("careerYearsLabel", e.target.value)}
            placeholder="2009–2021"
            className="mt-1 w-full rounded-xl border-2 border-[#112f54]/20 bg-white px-3 py-2.5 font-normal text-[#112f54]"
          />
        </label>

        <label className="text-xs font-bold text-[#112f54]">
          Career start year
          <input
            type="number"
            value={player.careerStart}
            onChange={(e) => field("careerStart", Number(e.target.value))}
            className="mt-1 w-full rounded-xl border-2 border-[#112f54]/20 bg-white px-3 py-2.5 font-normal text-[#112f54]"
          />
        </label>

        <label className="text-xs font-bold text-[#112f54]">
          Career end year
          <input
            type="number"
            value={player.careerEnd}
            onChange={(e) => field("careerEnd", Number(e.target.value))}
            className="mt-1 w-full rounded-xl border-2 border-[#112f54]/20 bg-white px-3 py-2.5 font-normal text-[#112f54]"
          />
        </label>

        <label className="text-xs font-bold text-[#112f54]">
          Difficulty
          <select
            value={player.difficulty}
            onChange={(e) => field("difficulty", e.target.value as Difficulty)}
            className="mt-1 w-full rounded-xl border-2 border-[#112f54]/20 bg-white px-3 py-2.5 font-normal text-[#112f54]"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <label className="text-xs font-bold text-[#112f54]">
          Verification status
          <select
            value={player.verificationStatus}
            onChange={(e) => field("verificationStatus", e.target.value as VerificationStatus)}
            className="mt-1 w-full rounded-xl border-2 border-[#112f54]/20 bg-white px-3 py-2.5 font-normal text-[#112f54]"
          >
            <option value="unverified">Unverified</option>
            <option value="reviewed">Reviewed</option>
            <option value="verified">Verified</option>
            <option value="flagged">Flagged</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-xs font-bold text-[#112f54]">
          <input
            type="checkbox"
            checked={player.activeStatus}
            onChange={(e) => field("activeStatus", e.target.checked)}
            className="h-4 w-4"
          />
          Currently active player
        </label>

        <label className="text-xs font-bold text-[#112f54]">
          Last verified at
          <input
            type="date"
            value={player.lastVerifiedAt}
            onChange={(e) => field("lastVerifiedAt", e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#112f54]/20 bg-white px-3 py-2.5 font-normal text-[#112f54]"
          />
        </label>
      </div>

      <label className="block text-xs font-bold text-[#112f54]">
        Source notes
        <textarea
          value={player.sourceNotes ?? ""}
          onChange={(e) => field("sourceNotes", e.target.value)}
          rows={2}
          className="mt-1 w-full rounded-xl border-2 border-[#112f54]/20 bg-white px-3 py-2.5 font-normal text-[#112f54]"
          placeholder="Where this data was verified against, e.g. Basketball-Reference"
        />
      </label>

      <div>
        <p className="mb-2 text-xs font-black uppercase tracking-widest text-[#423920]/60">
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
              className="w-full rounded-xl border-2 border-[#112f54]/20 bg-white px-3 py-2.5 text-sm text-[#112f54]"
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-black uppercase tracking-widest text-[#423920]/60">
          Career stops ({puzzlePreview.answerTeamIds.length} unique answer franchise
          {puzzlePreview.answerTeamIds.length === 1 ? "" : "s"})
        </p>
        <CareerStopEditor stops={player.careerStops} onChange={(stops) => field("careerStops", stops)} />
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-[#112f54]/15 pt-5">
        <button
          type="submit"
          className="rounded-2xl bg-[#112f54] px-6 py-3 font-black uppercase tracking-wider text-white"
        >
          Save Player
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="rounded-2xl border-2 border-[#112f54]/25 px-6 py-3 font-black uppercase tracking-wider text-[#112f54]"
        >
          Back to Dashboard
        </button>
        {saved && (
          <span className="text-sm font-bold text-[#1f7a45]" role="status">
            Saved.
          </span>
        )}
      </div>
    </form>
  );
}
