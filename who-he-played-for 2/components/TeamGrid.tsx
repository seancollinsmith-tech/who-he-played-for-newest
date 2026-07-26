"use client";

import { teamsInDisplayOrder } from "@/lib/data/teams";
import { TeamCard } from "@/components/TeamCard";
import { GuessState } from "@/lib/types";

export function TeamGrid({
  correctTeamIds,
  wrongTeamIds,
  disabled,
  onSelect
}: {
  correctTeamIds: string[];
  wrongTeamIds: string[];
  disabled: boolean;
  onSelect: (teamId: string) => void;
}) {
  return (
    <div
      role="group"
      aria-label="NBA franchises. Select every team this player appeared for."
      className="mt-7 grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3 lg:grid-cols-6"
    >
      {teamsInDisplayOrder.map((team) => {
        const state: GuessState = correctTeamIds.includes(team.id)
          ? "correct"
          : wrongTeamIds.includes(team.id)
            ? "wrong"
            : "idle";

        return (
          <TeamCard
            key={team.id}
            team={team}
            state={state}
            disabled={disabled || state !== "idle"}
            onClick={() => onSelect(team.id)}
          />
        );
      })}
    </div>
  );
}
