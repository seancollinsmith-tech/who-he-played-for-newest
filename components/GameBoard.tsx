"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { BookOpen, BarChart3 } from "lucide-react";
import { PlayerCard } from "@/components/PlayerCard";
import { TeamGrid } from "@/components/TeamGrid";
import { MistakeTracker } from "@/components/MistakeTracker";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { ProgressBar } from "@/components/ProgressBar";
import { HintPanel } from "@/components/HintPanel";
import { HowToPlayModal } from "@/components/HowToPlayModal";
import { StatisticsModal } from "@/components/StatisticsModal";
import { ResultsModal } from "@/components/ResultsModal";
import { GameProgress, Puzzle, StatsRecord } from "@/lib/types";
import { MAX_HINTS, MAX_MISTAKES, calculateScore } from "@/lib/game/scoring";
import { buildShareText } from "@/lib/game/share";

export function GameBoard({
  puzzle,
  mode,
  gameNumber,
  gameDateLabel,
  streak,
  stats,
  initialProgress,
  locked = false,
  onProgressChange,
  onComplete,
  onPracticeAgain
}: {
  puzzle: Puzzle;
  mode: "daily" | "practice";
  gameNumber?: number;
  gameDateLabel?: string;
  streak: number;
  stats: StatsRecord;
  initialProgress?: GameProgress | null;
  /** True once a daily game has already been completed — grid stays visible
   *  but frozen, and the results modal opens automatically. */
  locked?: boolean;
  onProgressChange?: (progress: GameProgress) => void;
  onComplete?: (progress: GameProgress) => void;
  onPracticeAgain?: () => void;
}) {
  const [correct, setCorrect] = useState<string[]>(initialProgress?.correctTeamIds ?? []);
  const [wrong, setWrong] = useState<string[]>(initialProgress?.wrongTeamIds ?? []);
  const [guessOrder, setGuessOrder] = useState<string[]>(initialProgress?.guessOrder ?? []);
  const [hintsUsed, setHintsUsed] = useState(initialProgress?.hintsUsed ?? 0);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showResults, setShowResults] = useState(locked);
  const [statusMessage, setStatusMessage] = useState("");

  const won = correct.length === puzzle.answerTeamIds.length;
  const lost = wrong.length >= MAX_MISTAKES;
  const complete = won || lost;
  const score = calculateScore(wrong.length, hintsUsed);

  // Persist progress on every change.
  useEffect(() => {
    if (!onProgressChange) return;
    const progress: GameProgress = {
      puzzleKey: mode === "daily" ? `daily-${gameNumber}` : `practice-${puzzle.playerId}`,
      playerId: puzzle.playerId,
      correctTeamIds: correct,
      wrongTeamIds: wrong,
      guessOrder,
      hintsUsed,
      score,
      status: won ? "won" : lost ? "lost" : "in_progress",
      startedAt: initialProgress?.startedAt ?? new Date().toISOString(),
      completedAt: complete ? new Date().toISOString() : undefined
    };
    onProgressChange(progress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [correct, wrong, guessOrder, hintsUsed]);

  const completeHandled = useMemo(() => ({ current: false }), [puzzle.playerId]);
  useEffect(() => {
    if (!complete || completeHandled.current) return;
    completeHandled.current = true;
    setShowResults(true);
    if (onComplete) {
      onComplete({
        puzzleKey: mode === "daily" ? `daily-${gameNumber}` : `practice-${puzzle.playerId}`,
        playerId: puzzle.playerId,
        correctTeamIds: correct,
        wrongTeamIds: wrong,
        guessOrder,
        hintsUsed,
        score,
        status: won ? "won" : "lost",
        startedAt: initialProgress?.startedAt ?? new Date().toISOString(),
        completedAt: new Date().toISOString()
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complete]);

  const selectTeam = useCallback(
    (id: string) => {
      if (locked || complete || correct.includes(id) || wrong.includes(id)) return;

      if (puzzle.answerTeamIds.includes(id)) {
        setCorrect((current) => [...current, id]);
        setStatusMessage("Correct! That franchise is confirmed.");
      } else {
        setWrong((current) => [...current, id]);
        setStatusMessage("Incorrect. One mistake used.");
      }
      setGuessOrder((current) => [...current, id]);
    },
    [locked, complete, correct, wrong, puzzle.answerTeamIds]
  );

  function useHint() {
    if (locked || complete || hintsUsed >= MAX_HINTS) return;
    setHintsUsed((current) => current + 1);
  }

  const shareText = buildShareText({
    gameNumber: gameNumber ?? 0,
    totalAnswers: puzzle.answerTeamIds.length,
    correctCount: correct.length,
    guessSequence: guessOrder.map((id) => (correct.includes(id) ? "correct" : "wrong")),
    score,
    streak
  });

  return (
    <section className="rounded-[2rem] border-2 border-[#112f54]/15 bg-[#f7efdc]/75 p-5 shadow-card backdrop-blur sm:p-8">
      <PlayerCard
        puzzle={puzzle}
        gameNumber={gameNumber}
        gameDateLabel={gameDateLabel}
        eyebrow={mode === "daily" ? "Daily Challenge" : "Practice Mode"}
      />

      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-[#112f54] p-4 text-white">
          <p className="mono text-[10px] uppercase tracking-[0.24em] opacity-65">Progress</p>
          <p className="display mt-1 text-3xl font-black">
            {correct.length}/{puzzle.answerTeamIds.length}
          </p>
        </div>
        <ScoreDisplay score={score} />
        <MistakeTracker mistakes={wrong.length} />
      </div>

      <ProgressBar found={correct.length} total={puzzle.answerTeamIds.length} />

      <div className="sr-only" role="status" aria-live="assertive">
        {statusMessage}
      </div>

      <TeamGrid
        correctTeamIds={correct}
        wrongTeamIds={wrong}
        disabled={locked || complete}
        onSelect={selectTeam}
      />

      <HintPanel
        hints={puzzle.hints}
        hintsUsed={hintsUsed}
        disabled={locked || complete}
        onUseHint={useHint}
      />

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => setShowHowToPlay(true)}
          className="flex items-center gap-2 rounded-2xl border-2 border-[#112f54]/25 px-4 py-2 text-sm font-black uppercase tracking-wide text-[#112f54] transition hover:bg-[#112f54]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee5a1f]"
        >
          <BookOpen size={16} aria-hidden="true" />
          How to Play
        </button>
        <button
          type="button"
          onClick={() => setShowStats(true)}
          className="flex items-center gap-2 rounded-2xl border-2 border-[#112f54]/25 px-4 py-2 text-sm font-black uppercase tracking-wide text-[#112f54] transition hover:bg-[#112f54]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee5a1f]"
        >
          <BarChart3 size={16} aria-hidden="true" />
          Statistics
        </button>
        {complete && !showResults && (
          <button
            type="button"
            onClick={() => setShowResults(true)}
            className="rounded-2xl bg-[#ee5a1f] px-4 py-2 text-sm font-black uppercase tracking-wide text-white"
          >
            View Results
          </button>
        )}
      </div>

      {showHowToPlay && <HowToPlayModal onClose={() => setShowHowToPlay(false)} />}
      {showStats && <StatisticsModal stats={stats} onClose={() => setShowStats(false)} />}
      {showResults && complete && (
        <ResultsModal
          puzzle={puzzle}
          won={won}
          score={score}
          wrongCount={wrong.length}
          hintsUsed={hintsUsed}
          streak={streak}
          correctTeamIds={correct}
          shareText={shareText}
          mode={mode}
          onClose={() => setShowResults(false)}
          onPracticeAgain={() => {
            setShowResults(false);
            onPracticeAgain?.();
          }}
        />
      )}
    </section>
  );
}
