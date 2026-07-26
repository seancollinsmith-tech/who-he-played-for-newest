"use client";

import { useEffect, useState } from "react";

function timeUntilMidnight(): string {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const diff = Math.max(0, midnight.getTime() - now.getTime());

  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);

  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function Countdown() {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    setLabel(timeUntilMidnight());
    const id = setInterval(() => setLabel(timeUntilMidnight()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="text-center">
      <p className="mono text-[10px] uppercase tracking-[0.24em] text-[#c7c6e0]/60">
        Next game in
      </p>
      <p className="display mono text-2xl font-black text-[#f5f5ff]" aria-live="off">
        {label ?? "--:--:--"}
      </p>
    </div>
  );
}
