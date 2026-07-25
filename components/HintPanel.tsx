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
    <div className="mt-7 rounded-3xl border-2 border-dashed border-[#112f54]/25 bg-white/40 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="display text-xl font-black uppercase text-[#112f54]">Need a clue?</p>
          <p className="text-sm text-[#423920]/65">
            Each hint costs {HINT_PENALTY} points ({hintsUsed}/{MAX_HINTS} used).
          </p>
        </div>

        <button
          type="button"
          onClick={onUseHint}
          disabled={disabled || hintsUsed >= MAX_HINTS}
          className="flex items-center justify-center gap-2 rounded-2xl bg-[#112f54] px-5 py-3 font-black uppercase tracking-wider text-white transition disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee5a1f]"
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
              className="rounded-2xl bg-[#fff8e8] p-4 text-sm font-bold text-[#112f54]"
            >
              Hint {index + 1}: {hint}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
