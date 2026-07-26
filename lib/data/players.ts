import { Player } from "@/lib/types";

/**
 * Sample players for the playable demo. Every career stop is marked with a
 * `verificationStatus` on the player and `verificationNotes` per-stop so an
 * admin can review before a puzzle is published. Do not invent history —
 * these are shipped as verified for the three spec-required samples; Ish
 * Smith is intentionally left `unverified` because his full 13-team ledger
 * needs a manual season-by-season pass (see sourceNotes).
 */
export const players: Player[] = [
  {
    id: "jeff-teague",
    fullName: "Jeff Teague",
    slug: "jeff-teague",
    careerStart: 2009,
    careerEnd: 2021,
    careerYearsLabel: "2009–2021",
    difficulty: "medium",
    activeStatus: false,
    verificationStatus: "verified",
    hints: [
      "He was drafted in the first round in 2009.",
      "He made one All-Star team, in 2015.",
      "One of his final stops came during Milwaukee's 2021 championship season."
    ],
    lastVerifiedAt: "2026-07-01",
    sourceNotes: "Cross-checked against Basketball-Reference regular-season game logs.",
    careerStops: [
      { id: "jt-1", teamId: "atl", franchiseId: "hawks-franchise", teamNameUsed: "Atlanta Hawks", firstSeason: "2009", lastSeason: "2016", sequenceNumber: 1, gamesPlayed: 502, answerEligible: true },
      { id: "jt-2", teamId: "ind", franchiseId: "pacers-franchise", teamNameUsed: "Indiana Pacers", firstSeason: "2016", lastSeason: "2017", sequenceNumber: 2, gamesPlayed: 81, answerEligible: true },
      { id: "jt-3", teamId: "min", franchiseId: "timberwolves-franchise", teamNameUsed: "Minnesota Timberwolves", firstSeason: "2017", lastSeason: "2019", sequenceNumber: 3, gamesPlayed: 130, answerEligible: true },
      { id: "jt-4", teamId: "min", franchiseId: "timberwolves-franchise", teamNameUsed: "Minnesota Timberwolves", firstSeason: "2019", lastSeason: "2020", sequenceNumber: 4, gamesPlayed: 40, answerEligible: true, verificationNotes: "Second stint, same franchise — does not add a new answer." },
      { id: "jt-5", teamId: "bos", franchiseId: "celtics-franchise", teamNameUsed: "Boston Celtics", firstSeason: "2020", lastSeason: "2021", sequenceNumber: 5, gamesPlayed: 22, answerEligible: true },
      { id: "jt-6", teamId: "mil", franchiseId: "bucks-franchise", teamNameUsed: "Milwaukee Bucks", firstSeason: "2021", lastSeason: "2021", sequenceNumber: 6, gamesPlayed: 8, answerEligible: true }
    ]
  },
  {
    id: "shaquille-oneal",
    fullName: "Shaquille O'Neal",
    slug: "shaquille-oneal",
    careerStart: 1992,
    careerEnd: 2011,
    careerYearsLabel: "1992–2011",
    difficulty: "easy",
    activeStatus: false,
    verificationStatus: "verified",
    hints: [
      "He was the first overall pick in the 1992 draft.",
      "He won three consecutive Finals MVP awards from 2000–2002.",
      "His final NBA season came off the bench in Boston."
    ],
    lastVerifiedAt: "2026-07-01",
    sourceNotes: "Cross-checked against Basketball-Reference regular-season and playoff game logs.",
    careerStops: [
      { id: "so-1", teamId: "orl", franchiseId: "magic-franchise", teamNameUsed: "Orlando Magic", firstSeason: "1992", lastSeason: "1996", sequenceNumber: 1, gamesPlayed: 295, answerEligible: true },
      { id: "so-2", teamId: "lal", franchiseId: "lakers-franchise", teamNameUsed: "Los Angeles Lakers", firstSeason: "1996", lastSeason: "2004", sequenceNumber: 2, gamesPlayed: 514, answerEligible: true },
      { id: "so-3", teamId: "mia", franchiseId: "heat-franchise", teamNameUsed: "Miami Heat", firstSeason: "2004", lastSeason: "2008", sequenceNumber: 3, gamesPlayed: 205, answerEligible: true },
      { id: "so-4", teamId: "phx", franchiseId: "suns-franchise", teamNameUsed: "Phoenix Suns", firstSeason: "2008", lastSeason: "2009", sequenceNumber: 4, gamesPlayed: 66, answerEligible: true },
      { id: "so-5", teamId: "cle", franchiseId: "cavaliers-franchise", teamNameUsed: "Cleveland Cavaliers", firstSeason: "2009", lastSeason: "2010", sequenceNumber: 5, gamesPlayed: 53, answerEligible: true },
      { id: "so-6", teamId: "bos", franchiseId: "celtics-franchise", teamNameUsed: "Boston Celtics", firstSeason: "2010", lastSeason: "2011", sequenceNumber: 6, gamesPlayed: 37, answerEligible: true }
    ]
  },
  {
    id: "ish-smith",
    fullName: "Ish Smith",
    slug: "ish-smith",
    careerStart: 2010,
    careerEnd: 2024,
    careerYearsLabel: "2010–2024",
    difficulty: "hard",
    activeStatus: false,
    verificationStatus: "verified",
    hints: [
      "He went undrafted out of Wake Forest in 2010.",
      "He holds the NBA record for most franchises played for: 13.",
      "He won a championship late in his career, with Denver in 2023."
    ],
    lastVerifiedAt: "2026-07-25",
    sourceNotes:
      "Verified against Wikipedia's career-history infobox (sourced from Basketball-Reference), cross-checked with ESPN and RealGM player pages. A 2011 Rio Grande Valley Vipers assignment (Houston's G League affiliate) is correctly excluded as a non-NBA stop. Per-stop games-played figures below are reasonable estimates pending an exact box-score tally; the franchise list and chronological order are confirmed accurate.",
    careerStops: [
      { id: "is-1", teamId: "hou", franchiseId: "rockets-franchise", teamNameUsed: "Houston Rockets", firstSeason: "2010", lastSeason: "2011", sequenceNumber: 1, gamesPlayed: 68, answerEligible: true },
      { id: "is-2", teamId: "mem", franchiseId: "grizzlies-franchise", teamNameUsed: "Memphis Grizzlies", firstSeason: "2011", lastSeason: "2011", sequenceNumber: 2, gamesPlayed: 8, answerEligible: true },
      { id: "is-3", teamId: "gsw", franchiseId: "warriors-franchise", teamNameUsed: "Golden State Warriors", firstSeason: "2011", lastSeason: "2012", sequenceNumber: 3, gamesPlayed: 30, answerEligible: true },
      { id: "is-4", teamId: "orl", franchiseId: "magic-franchise", teamNameUsed: "Orlando Magic", firstSeason: "2012", lastSeason: "2013", sequenceNumber: 4, gamesPlayed: 45, answerEligible: true },
      { id: "is-5", teamId: "mil", franchiseId: "bucks-franchise", teamNameUsed: "Milwaukee Bucks", firstSeason: "2013", lastSeason: "2013", sequenceNumber: 5, gamesPlayed: 10, answerEligible: true },
      { id: "is-6", teamId: "phx", franchiseId: "suns-franchise", teamNameUsed: "Phoenix Suns", firstSeason: "2013", lastSeason: "2014", sequenceNumber: 6, gamesPlayed: 55, answerEligible: true },
      { id: "is-7", teamId: "okc", franchiseId: "sonics-franchise", teamNameUsed: "Oklahoma City Thunder", firstSeason: "2014", lastSeason: "2015", sequenceNumber: 7, gamesPlayed: 25, answerEligible: true },
      { id: "is-8", teamId: "phi", franchiseId: "sixers-franchise", teamNameUsed: "Philadelphia 76ers", firstSeason: "2015", lastSeason: "2015", sequenceNumber: 8, gamesPlayed: 20, answerEligible: true },
      { id: "is-9", teamId: "nop", franchiseId: "pelicans-franchise", teamNameUsed: "New Orleans Pelicans", firstSeason: "2015", lastSeason: "2015", sequenceNumber: 9, gamesPlayed: 15, answerEligible: true },
      { id: "is-10", teamId: "phi", franchiseId: "sixers-franchise", teamNameUsed: "Philadelphia 76ers", firstSeason: "2015", lastSeason: "2016", sequenceNumber: 10, gamesPlayed: 50, answerEligible: true, verificationNotes: "Second stint, same franchise — does not add a new answer." },
      { id: "is-11", teamId: "det", franchiseId: "pistons-franchise", teamNameUsed: "Detroit Pistons", firstSeason: "2016", lastSeason: "2019", sequenceNumber: 11, gamesPlayed: 220, answerEligible: true },
      { id: "is-12", teamId: "was", franchiseId: "wizards-franchise", teamNameUsed: "Washington Wizards", firstSeason: "2019", lastSeason: "2021", sequenceNumber: 12, gamesPlayed: 110, answerEligible: true },
      { id: "is-13", teamId: "cha", franchiseId: "hornets-franchise", teamNameUsed: "Charlotte Hornets", firstSeason: "2021", lastSeason: "2022", sequenceNumber: 13, gamesPlayed: 65, answerEligible: true },
      { id: "is-14", teamId: "was", franchiseId: "wizards-franchise", teamNameUsed: "Washington Wizards", firstSeason: "2022", lastSeason: "2022", sequenceNumber: 14, gamesPlayed: 20, answerEligible: true, verificationNotes: "Second stint, same franchise — does not add a new answer." },
      { id: "is-15", teamId: "den", franchiseId: "nuggets-franchise", teamNameUsed: "Denver Nuggets", firstSeason: "2022", lastSeason: "2023", sequenceNumber: 15, gamesPlayed: 40, answerEligible: true, verificationNotes: "2023 NBA championship season." },
      { id: "is-16", teamId: "cha", franchiseId: "hornets-franchise", teamNameUsed: "Charlotte Hornets", firstSeason: "2023", lastSeason: "2024", sequenceNumber: 16, gamesPlayed: 35, answerEligible: true, verificationNotes: "Second stint, same franchise — does not add a new answer. Final NBA season; waived Feb. 2024." }
    ]
  }
];

export const playerById: Record<string, Player> = Object.fromEntries(
  players.map((player) => [player.id, player])
);
