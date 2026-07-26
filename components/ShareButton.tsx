"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";
import { shareOrCopy } from "@/lib/game/share";

export function ShareButton({ text }: { text: string }) {
  const [status, setStatus] = useState<"idle" | "copied">("idle");

  async function handleShare() {
    const result = await shareOrCopy(text);
    if (result === "copied") {
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 1800);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleShare}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#12a85a] px-5 py-4 font-black uppercase tracking-wider text-white transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffc93c]"
      >
        <Share2 size={18} aria-hidden="true" />
        Share Result
      </button>
      <p className="mt-1 text-center text-xs font-bold text-[#22e584]" role="status" aria-live="polite">
        {status === "copied" ? "Copied to clipboard" : "\u00A0"}
      </p>
    </div>
  );
}
