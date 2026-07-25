import { Player, Puzzle } from "@/lib/types";

/**
 * Turns a Player + their career stops into a playable Puzzle: a de-duplicated
 * list of answer-eligible current-team ids, plus the full chronological path
 * for the results screen.
 */
export function buildPuzzle(player: Player): Puzzle {
  const eligibleStops = player.careerStops
    .filter((stop) => stop.answerEligible)
    .sort((a, b) => a.sequenceNumber - b.sequenceNumber);

  const seen = new Set<string>();
  const answerTeamIds: string[] = [];
  for (const stop of eligibleStops) {
    if (!seen.has(stop.teamId)) {
      seen.add(stop.teamId);
      answerTeamIds.push(stop.teamId);
    }
  }

  return {
    playerId: player.id,
    playerName: player.fullName,
    imageUrl: player.imageUrl,
    careerYearsLabel: player.careerYearsLabel,
    difficulty: player.difficulty,
    hints: player.hints,
    answerTeamIds,
    path: eligibleStops
  };
}
