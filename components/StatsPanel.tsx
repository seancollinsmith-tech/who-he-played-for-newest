import { StatsRecord } from "@/lib/types";
import { averageScore, winPercentage } from "@/lib/storage/stats";

export function StatsPanel({ stats }: { stats: StatsRecord }) {
  const items: Array<{ label: string; value: string | number }> = [
    { label: "Current Streak", value: stats.currentStreak },
    { label: "Longest Streak", value: stats.longestStreak },
    { label: "Games Played", value: stats.totalGamesPlayed },
    { label: "Win %", value: `${winPercentage(stats)}%` },
    { label: "Average Score", value: averageScore(stats) },
    { label: "Perfect Games", value: stats.perfectGames }
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl bg-[#123e91] p-4 text-center text-white">
          <p className="display text-3xl font-black">{item.value}</p>
          <p className="mono mt-1 text-[10px] uppercase tracking-[0.2em] opacity-70">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
