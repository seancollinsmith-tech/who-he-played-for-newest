"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Team, GuessState } from "@/lib/types";
import { TeamMark } from "@/components/TeamMark";

export function TeamCard({
  team,
  state,
  disabled,
  onClick
}: {
  team: Team;
  state: GuessState;
  disabled: boolean;
  onClick: () => void;
}) {
  const stateClasses = {
    idle: "border-white/15 bg-[#1c1d3a] text-[#f5f5ff] hover:-translate-y-1 hover:border-[#f0197c]",
    correct: "border-[#0e8f52] bg-[#12a85a] text-white shadow-lg shadow-green-900/15",
    wrong: "border-[#8a1338] bg-[#d81b4a] text-white"
  }[state];

  const label = `${team.city} ${team.name}${
    state === "correct" ? ", correct" : state === "wrong" ? ", incorrect" : ""
  }`;

  return (
    <motion.button
      type="button"
      aria-label={label}
      aria-pressed={state !== "idle"}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      animate={state === "wrong" ? { x: [0, -6, 6, -4, 4, 0] } : {}}
      transition={{ duration: 0.35 }}
      disabled={disabled}
      onClick={onClick}
      className={`motion-reduce:transform-none relative min-h-20 rounded-2xl border-2 p-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffc93c] ${stateClasses} ${
        disabled ? "cursor-default" : "cursor-pointer"
      }`}
    >
      {state === "idle" && (
        <div className="mb-1">
          <TeamMark primaryColor={team.primaryColor} secondaryColor={team.secondaryColor} seed={team.id} />
        </div>
      )}
      <div className="display text-2xl font-black">{team.abbreviation}</div>
      <div className="mt-1 text-xs font-bold leading-tight opacity-75">
        {team.city}
        <br />
        {team.name}
      </div>
      {state === "correct" && (
        <Check className="absolute right-2 top-2" size={16} aria-hidden="true" />
      )}
      {state === "wrong" && (
        <X className="absolute right-2 top-2" size={16} aria-hidden="true" />
      )}
    </motion.button>
  );
}
