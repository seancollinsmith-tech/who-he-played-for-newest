import { ShieldAlert } from "lucide-react";
import { MAX_MISTAKES } from "@/lib/game/scoring";

export function MistakeTracker({ mistakes }: { mistakes: number }) {
  return (
    <div className="rounded-2xl bg-[#ee5a1f] p-4 text-white">
      <p className="mono text-[10px] uppercase tracking-[0.24em] opacity-70">Mistakes</p>
      <div
        className="mt-2 flex items-center gap-2"
        role="status"
        aria-label={`${mistakes} of ${MAX_MISTAKES} mistakes used`}
      >
        {Array.from({ length: MAX_MISTAKES }).map((_, index) => (
          <ShieldAlert
            key={index}
            size={25}
            aria-hidden="true"
            className={index < mistakes ? "opacity-30" : "text-[#fff4d9]"}
            fill="currentColor"
          />
        ))}
        <span className="ml-1 text-sm font-bold">
          {MAX_MISTAKES - mistakes} left
        </span>
      </div>
    </div>
  );
}
