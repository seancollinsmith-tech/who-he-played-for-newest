/**
 * Builds spoiler-free share text using the order guesses were made in,
 * not the order teams appear in the answer list — so the emoji sequence
 * never reveals which specific franchises were correct.
 */
export function buildShareText({
  gameNumber,
  totalAnswers,
  correctCount,
  guessSequence,
  score,
  streak
}: {
  gameNumber: number;
  totalAnswers: number;
  correctCount: number;
  /** "correct" | "wrong" in the order the user actually guessed them */
  guessSequence: Array<"correct" | "wrong">;
  score: number;
  streak: number;
}): string {
  const grid = guessSequence.map((g) => (g === "correct" ? "🟩" : "🟥")).join("");

  return [
    `WHO HE PLAYED FOR #${gameNumber}`,
    `${correctCount}/${totalAnswers} TEAMS`,
    "",
    grid,
    "",
    `Score: ${score}/1000`,
    `Streak: ${streak}`
  ].join("\n");
}

export async function shareOrCopy(text: string): Promise<"shared" | "copied" | "failed"> {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ text });
      return "shared";
    } catch {
      // User cancelled or share failed — fall through to clipboard.
    }
  }

  try {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return "copied";
    }
  } catch {
    // ignore
  }

  return "failed";
}
