import { notFound } from "next/navigation";
import { players } from "@/lib/data/players";
import { buildPuzzle } from "@/lib/game/puzzle";
import { PracticeGameLoader } from "@/components/PracticeGameLoader";

export function generateStaticParams() {
  return players
    .filter((p) => p.verificationStatus === "verified")
    .map((p) => ({ slug: p.slug }));
}

export default async function PracticeSlugPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const player = players.find((p) => p.slug === slug && p.verificationStatus === "verified");

  if (!player) notFound();

  const puzzle = buildPuzzle(player);

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6">
      <PracticeGameLoader puzzle={puzzle} />
    </main>
  );
}
