import { Puzzle } from "@/lib/types";

export function PlayerCard({
  puzzle,
  gameNumber,
  gameDateLabel,
  eyebrow
}: {
  puzzle: Puzzle;
  gameNumber?: number;
  gameDateLabel?: string;
  eyebrow: string;
}) {
  return (
    <div className="text-center">
      <p className="mono text-xs font-bold uppercase tracking-[0.28em] text-[#ee5a1f]">
        {eyebrow}
        {gameNumber ? ` • Game #${gameNumber}` : ""}
      </p>
      {gameDateLabel && (
        <p className="mono mt-1 text-[11px] uppercase tracking-[0.2em] text-[#423920]/50">
          {gameDateLabel}
        </p>
      )}

      <h1 className="display mt-3 text-5xl font-black uppercase leading-none text-[#112f54] sm:text-7xl">
        {puzzle.playerName}
      </h1>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm font-bold">
        <span className="rounded-full bg-[#112f54] px-3 py-1 text-white">
          {puzzle.careerYearsLabel}
        </span>
        <span className="rounded-full bg-[#ee5a1f] px-3 py-1 text-white">
          {puzzle.difficulty.toUpperCase()}
        </span>
        <span className="rounded-full border-2 border-[#112f54]/20 px-3 py-1 text-[#112f54]">
          FIND {puzzle.answerTeamIds.length} TEAMS
        </span>
      </div>

      <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#423920]/75 sm:text-base">
        Select every NBA franchise this player appeared for. You have three
        mistakes before the career path is revealed.
      </p>
    </div>
  );
}
