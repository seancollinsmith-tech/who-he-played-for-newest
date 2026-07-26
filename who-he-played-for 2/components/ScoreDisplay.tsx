export function ScoreDisplay({ score }: { score: number }) {
  return (
    <div className="rounded-2xl bg-[#ffbb33] p-4 text-[#112f54]">
      <p className="mono text-[10px] uppercase tracking-[0.24em] opacity-65">Score</p>
      <p className="display mt-1 text-3xl font-black" aria-live="polite">
        {score}
        <span className="text-lg">/1000</span>
      </p>
    </div>
  );
}
