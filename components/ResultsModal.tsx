"use client";

import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { Modal } from "@/components/Modal";
import { ShareButton } from "@/components/ShareButton";
import { Countdown } from "@/components/Countdown";
import { teamById } from "@/lib/data/teams";
import { Puzzle } from "@/lib/types";

export function ResultsModal({
  puzzle,
  won,
  score,
  wrongCount,
  hintsUsed,
  streak,
  correctTeamIds,
  shareText,
  mode,
  onClose,
  onPracticeAgain
}: {
  puzzle: Puzzle;
  won: boolean;
  score: number;
  wrongCount: number;
  hintsUsed: number;
  streak: number;
  correctTeamIds: string[];
  shareText: string;
  mode: "daily" | "practice";
  onClose: () => void;
  onPracticeAgain: () => void;
}) {
  const missedTeamIds = puzzle.answerTeamIds.filter((id) => !correctTeamIds.includes(id));

  return (
    <Modal title={won ? "Career Complete" : "Game Over"} onClose={onClose}>
      <div className="text-center">
        <div
          className={`mx-auto grid h-16 w-16 place-items-center rounded-full ${
            won ? "bg-[#12a85a]" : "bg-[#d81b4a]"
          } text-white`}
        >
          {won ? <CheckCircle2 size={34} aria-hidden="true" /> : <XCircle size={34} aria-hidden="true" />}
        </div>

        <p className="mt-3 text-sm font-bold uppercase tracking-[0.2em] text-[#f0197c]">
          {puzzle.playerName}
        </p>

        <div className="mt-4 rounded-3xl bg-[#123e91] px-5 py-4 text-white">
          <div className="display text-5xl font-black">
            {score}
            <span className="text-2xl text-[#ffc93c]">/1000</span>
          </div>
          <p className="mono mt-1 text-xs uppercase tracking-widest opacity-75">
            {wrongCount} incorrect &bull; {hintsUsed} hint{hintsUsed === 1 ? "" : "s"} &bull; 🔥 {streak}
            {" "}
            streak
          </p>
        </div>
      </div>

      {won ? (
        <div className="mt-5">
          <p className="mono mb-2 text-xs font-bold uppercase tracking-widest text-[#c7c6e0]/60">
            Franchise path
          </p>
          <ol className="space-y-2">
            {puzzle.path.map((stop) => (
              <li
                key={stop.id}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#1c1d3a]/60 px-4 py-3"
              >
                <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-[#123e91] text-xs font-black text-[#ffc93c]">
                  {stop.sequenceNumber}
                </span>
                <span className="font-black text-[#f5f5ff]">{stop.teamNameUsed}</span>
                <span className="mono ml-auto text-xs text-[#c7c6e0]/50">
                  {stop.firstSeason}&ndash;{stop.lastSeason}
                </span>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          <div>
            <p className="mono mb-2 text-xs font-bold uppercase tracking-widest text-[#22e584]">
              Teams found ({correctTeamIds.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {correctTeamIds.map((id) => (
                <span
                  key={id}
                  className="rounded-full bg-[#12a85a] px-3 py-1 text-xs font-black text-white"
                >
                  {teamById[id].city} {teamById[id].name}
                </span>
              ))}
              {correctTeamIds.length === 0 && (
                <span className="text-sm text-[#c7c6e0]/60">None found this time.</span>
              )}
            </div>
          </div>
          <div>
            <p className="mono mb-2 text-xs font-bold uppercase tracking-widest text-[#ff3358]">
              Missed
            </p>
            <div className="flex flex-wrap gap-2">
              {missedTeamIds.map((id) => (
                <span
                  key={id}
                  className="rounded-full border-2 border-[#ff3358] px-3 py-1 text-xs font-black text-[#ff3358]"
                >
                  {teamById[id].city} {teamById[id].name}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="mono mb-2 text-xs font-bold uppercase tracking-widest text-[#c7c6e0]/60">
              Complete franchise path
            </p>
            <ol className="space-y-2">
              {puzzle.path.map((stop) => (
                <li
                  key={stop.id}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#1c1d3a]/60 px-4 py-3"
                >
                  <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-[#123e91] text-xs font-black text-[#ffc93c]">
                    {stop.sequenceNumber}
                  </span>
                  <span className="font-black text-[#f5f5ff]">{stop.teamNameUsed}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <ShareButton text={shareText} />

        <button
          type="button"
          onClick={onPracticeAgain}
          className="flex items-center justify-center gap-2 rounded-2xl border-2 border-[#29b6f6] px-5 py-4 font-black uppercase tracking-wider text-[#f5f5ff] transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffc93c]"
        >
          <RotateCcw size={18} aria-hidden="true" />
          Practice Again
        </button>
      </div>

      {mode === "daily" && (
        <div className="mt-6 border-t border-white/10 pt-5">
          <Countdown />
        </div>
      )}
    </Modal>
  );
}
