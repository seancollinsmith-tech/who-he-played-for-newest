export const MAX_MISTAKES = 3;
export const STARTING_SCORE = 1000;
export const WRONG_GUESS_PENALTY = 100;
export const HINT_PENALTY = 75;
export const MAX_HINTS = 3;

export function calculateScore(wrongGuesses: number, hintsUsed: number): number {
  return Math.max(
    0,
    STARTING_SCORE - wrongGuesses * WRONG_GUESS_PENALTY - hintsUsed * HINT_PENALTY
  );
}
