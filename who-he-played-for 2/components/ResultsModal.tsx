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
            won ? "bg-[#1f7a45]" : "bg-[#bd2c2c]"
          } text-white`}
        >
          {won ? <CheckCircle2 size={34} aria-hidden="true" /> : <XCircle size={34} aria-hidden="true" />}
        </div>

        <p className="mt-3 text-sm font-bold uppercase tracking-[0.2em] text-[#ee5a1f]">
          {puzzle.playerName}
        </p>

        <div className="mt-4 rounded-3xl bg-[#112f54] px-5 py-4 text-white">
          <div className="display text-5xl font-black">
            {score}
            <span className="text-2xl text-[#ffbb33]">/1000</span>
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
          <p className="mono mb-2 text-xs font-bold uppercase tracking-widest text-[#423920]/60">
            Franchise path
          </p>
          <ol className="space-y-2">
            {puzzle.path.map((stop) => (
              <li
                key={stop.id}
                className="flex items-center gap-3 rounded-2xl border border-[#112f54]/15 bg-white/60 px-4 py-3"
              >
                <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-[#ffbb33] text-xs font-black text-[#112f54]">
                  {stop.sequenceNumber}
                </span>
                <span className="font-black text-[#112f54]">{stop.teamNameUsed}</span>
                <span className="mono ml-auto text-xs text-[#423920]/50">
                  {stop.firstSeason}&ndash;{stop.lastSeason}
                </span>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          <div>
            <p className="mono mb-2 text-xs font-bold uppercase tracking-widest text-[#1f7a45]">
              Teams found ({correctTeamIds.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {correctTeamIds.map((id) => (
                <span
                  key={id}
                  className="rounded-full bg-[#1f7a45] px-3 py-1 text-xs font-black text-white"
                >
                  {teamById[id].city} {teamById[id].name}
                </span>
              ))}
              {correctTeamIds.length === 0 && (
                <span className="text-sm text-[#423920]/60">None found this time.</span>
              )}
            </div>
          </div>
          <div>
            <p className="mono mb-2 text-xs font-bold uppercase tracking-widest text-[#bd2c2c]">
              Missed
            </p>
            <div className="flex flex-wrap gap-2">
              {missedTeamIds.map((id) => (
                <span
                  key={id}
                  className="rounded-full border-2 border-[#bd2c2c] px-3 py-1 text-xs font-black text-[#bd2c2c]"
                >
                  {teamById[id].city} {teamById[id].name}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="mono mb-2 text-xs font-bold uppercase tracking-widest text-[#423920]/60">
              Complete franchise path
            </p>
            <ol className="space-y-2">
              {puzzle.path.map((stop) => (
                <li
                  key={stop.id}
                  className="flex items-center gap-3 rounded-2xl border border-[#112f54]/15 bg-white/60 px-4 py-3"
                >
                  <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-[#ffbb33] text-xs font-black text-[#112f54]">
                    {stop.sequenceNumber}
                  </span>
                  <span className="font-black text-[#112f54]">{stop.teamNameUsed}</span>
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
          className="flex items-center justify-center gap-2 rounded-2xl border-2 border-[#112f54] px-5 py-4 font-black uppercase tracking-wider text-[#112f54] transition hover:bg-[#112f54]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee5a1f]"
        >
          <RotateCcw size={18} aria-hidden="true" />
          Practice Again
        </button>
      </div>

      {mode === "daily" && (
        <div className="mt-6 border-t border-[#112f54]/15 pt-5">
          <Countdown />
        </div>
      )}
    </Modal>
  );
}
