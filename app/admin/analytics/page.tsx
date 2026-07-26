import { Header } from "@/components/Header";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getAnalyticsSummary } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  const supabaseMode = isSupabaseConfigured();
  const summary = supabaseMode ? await getAnalyticsSummary() : null;

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6">
      <div className="game-shell">
        <Header streak={0} />

        <AdminGuard>
          <section className="rounded-[2rem] border-2 border-white/10 bg-[#14152c]/80 p-5 shadow-card backdrop-blur sm:p-8">
            <h1 className="display text-4xl font-black uppercase text-[#f5f5ff]">Analytics</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#c7c6e0]/75">
              Aggregate, anonymous play data — completion rate, average
              score, and daily activity. No personal data is collected.
            </p>

            {!supabaseMode ? (
              <p className="mt-6 rounded-2xl bg-white/5 p-4 text-sm leading-6 text-[#c7c6e0]/70">
                Analytics require Supabase — demo mode has no shared backend
                to aggregate across players, so there's nothing to show here.
                Configure Supabase (see README) and this page will start
                filling in automatically as people play.
              </p>
            ) : !summary ? (
              <p className="mt-6 rounded-2xl bg-white/5 p-4 text-sm leading-6 text-[#c7c6e0]/70">
                No analytics data yet — either no games have been completed,
                or your signed-in account isn't an admin (analytics reads are
                admin-only, same as the player database).
              </p>
            ) : (
              <>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <StatTile label="Daily Completions" value={summary.totalDailyCompleted} />
                  <StatTile label="Completion Rate" value={`${summary.completionRate}%`} />
                  <StatTile label="Average Score" value={summary.averageScore} />
                  <StatTile label="Win Rate" value={`${summary.winRate}%`} />
                </div>

                <p className="mono mt-6 text-xs uppercase tracking-widest text-[#c7c6e0]/50">
                  Activity recorded across {summary.uniqueDaysWithActivity} distinct day
                  {summary.uniqueDaysWithActivity === 1 ? "" : "s"}
                </p>

                <div className="mt-4">
                  <p className="mono mb-2 text-xs font-black uppercase tracking-widest text-[#c7c6e0]/60">
                    Recent daily activity
                  </p>
                  <div className="space-y-2">
                    {summary.recentDays.map((day) => (
                      <div
                        key={day.gameDate}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#1c1d3a]/60 px-4 py-3"
                      >
                        <span className="mono text-sm text-[#f5f5ff]">{day.gameDate}</span>
                        <span className="text-sm text-[#c7c6e0]/70">
                          {day.completions} completion{day.completions === 1 ? "" : "s"} &bull; avg{" "}
                          {day.averageScore}
                        </span>
                      </div>
                    ))}
                    {summary.recentDays.length === 0 && (
                      <p className="text-sm text-[#c7c6e0]/60">No completions recorded yet.</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </section>
        </AdminGuard>
      </div>
    </main>
  );
}

function StatTile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-[#123e91] p-4 text-center text-white">
      <p className="display text-3xl font-black">{value}</p>
      <p className="mono mt-1 text-[10px] uppercase tracking-[0.2em] opacity-70">{label}</p>
    </div>
  );
}
