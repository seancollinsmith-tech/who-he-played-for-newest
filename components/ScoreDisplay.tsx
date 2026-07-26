export function ScoreDisplay({ score }: { score: number }) {
  return (
    <div className="rounded-2xl border-2 border-[#ffc93c]/50 bg-[#1c1d3a] p-4 text-[#ffc93c]">
      <p className="mono text-[10px] uppercase tracking-[0.24em] text-[#ffc93c]/70">Score</p>
      <p className="display mt-1 text-3xl font-black" aria-live="polite">
        {score}
        <span className="text-lg">/1000</span>
      </p>
    </div>
  );
}
