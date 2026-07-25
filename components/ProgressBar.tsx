export function ProgressBar({ found, total }: { found: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((found / total) * 100);

  return (
    <div
      className="mt-5 h-3 overflow-hidden rounded-full bg-[#112f54]/10"
      role="progressbar"
      aria-valuenow={found}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`Progress: ${found} of ${total} teams found`}
    >
      <div
        className="h-full rounded-full bg-[#1f7a45] transition-all duration-500 motion-reduce:transition-none"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
