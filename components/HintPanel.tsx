import { Lightbulb } from "lucide-react";
import { HINT_PENALTY, MAX_HINTS } from "@/lib/game/scoring";

export function HintPanel({
  hints,
  hintsUsed,
  disabled,
  onUseHint
}: {
  hints: readonly string[];
  hintsUsed: number;
  disabled: boolean;
  onUseHint: () => void;
}) {
  return (
    <div className="mt-7 rounded-3xl border-2 border-dashed border-white/15 bg-[#1c1d3a]/40 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="display text-xl font-black uppercase text-[#f5f5ff]">Need a clue?</p>
          <p className="text-sm text-[#c7c6e0]/65">
            Each hint costs {HINT_PENALTY} points ({hintsUsed}/{MAX_HINTS} used).
          </p>
        </div>

        <button
          type="button"
          onClick={onUseHint}
          disabled={disabled || hintsUsed >= MAX_HINTS}
          className="flex items-center justify-center gap-2 rounded-2xl bg-[#123e91] px-5 py-3 font-black uppercase tracking-wider text-white transition disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffc93c]"
        >
          <Lightbulb size={18} aria-hidden="true" />
          Use Hint
        </button>
      </div>

      {hintsUsed > 0 && (
        <ul className="mt-4 space-y-2" aria-live="polite">
          {hints.slice(0, hintsUsed).map((hint, index) => (
            <li
              key={index}
              className="rounded-2xl bg-[#1c1d3a] p-4 text-sm font-bold text-[#f5f5ff]"
            >
              Hint {index + 1}: {hint}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
