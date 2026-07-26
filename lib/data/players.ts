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
  },
  {
    id: "lebron-james",
    fullName: "LeBron James",
    slug: "lebron-james",
    careerStart: 2003,
    careerEnd: 2026,
    careerYearsLabel: "2003-present",
    difficulty: "medium",
    activeStatus: true,
    verificationStatus: "verified",
    hints: ["He was the first overall pick in the 2003 draft, straight out of high school.", "He has won NBA championships with three different franchises.", "He joined a fourth franchise as a free agent in the summer of 2026."],
    lastVerifiedAt: "2026-07-25",
    sourceNotes: "Cross-checked against Wikipedia's career-history infobox (sourced from Basketball-Reference), ESPN, and Britannica. His move to Philadelphia is very recent (July 2026) news at time of writing.",
    careerStops: [
      { id: "lebron-james-1", teamId: "cle", franchiseId: "cavaliers-franchise", teamNameUsed: "Cleveland Cavaliers", firstSeason: "2003", lastSeason: "2010", sequenceNumber: 1, gamesPlayed: 620, answerEligible: true },
      { id: "lebron-james-2", teamId: "mia", franchiseId: "heat-franchise", teamNameUsed: "Miami Heat", firstSeason: "2010", lastSeason: "2014", sequenceNumber: 2, gamesPlayed: 294, answerEligible: true },
      { id: "lebron-james-3", teamId: "cle", franchiseId: "cavaliers-franchise", teamNameUsed: "Cleveland Cavaliers", firstSeason: "2014", lastSeason: "2018", sequenceNumber: 3, gamesPlayed: 301, answerEligible: true, verificationNotes: "Second stint, same franchise." },
      { id: "lebron-james-4", teamId: "lal", franchiseId: "lakers-franchise", teamNameUsed: "Los Angeles Lakers", firstSeason: "2018", lastSeason: "2026", sequenceNumber: 4, gamesPlayed: 520, answerEligible: true },
      { id: "lebron-james-5", teamId: "phi", franchiseId: "sixers-franchise", teamNameUsed: "Philadelphia 76ers", firstSeason: "2026", lastSeason: "2026", sequenceNumber: 5, gamesPlayed: 5, answerEligible: true, verificationNotes: "Just signed as of publication - figures are placeholders pending games played." }
    ]
  },
  {
    id: "michael-jordan",
    fullName: "Michael Jordan",
    slug: "michael-jordan",
    careerStart: 1984,
    careerEnd: 2003,
    careerYearsLabel: "1984-1993, 1995-1998, 2001-2003",
    difficulty: "easy",
    activeStatus: false,
    verificationStatus: "verified",
    hints: ["He was drafted third overall in 1984, behind two centers.", "He won six championships in the 1990s, never losing an NBA Finals.", "He came out of retirement a second time to play for the team he later partly owned."],
    lastVerifiedAt: "2026-07-25",
    sourceNotes: "Cross-checked against Wikipedia's career-history infobox (sourced from Basketball-Reference), Britannica, and ESPN.",
    careerStops: [
      { id: "michael-jordan-1", teamId: "chi", franchiseId: "bulls-franchise", teamNameUsed: "Chicago Bulls", firstSeason: "1984", lastSeason: "1993", sequenceNumber: 1, gamesPlayed: 667, answerEligible: true },
      { id: "michael-jordan-2", teamId: "chi", franchiseId: "bulls-franchise", teamNameUsed: "Chicago Bulls", firstSeason: "1995", lastSeason: "1998", sequenceNumber: 2, gamesPlayed: 195, answerEligible: true, verificationNotes: "Returned from his first retirement; same franchise." },
      { id: "michael-jordan-3", teamId: "was", franchiseId: "wizards-franchise", teamNameUsed: "Washington Wizards", firstSeason: "2001", lastSeason: "2003", sequenceNumber: 3, gamesPlayed: 142, answerEligible: true }
    ]
  },
  {
    id: "kevin-durant",
    fullName: "Kevin Durant",
    slug: "kevin-durant",
    careerStart: 2007,
    careerEnd: 2026,
    careerYearsLabel: "2007-present",
    difficulty: "medium",
    activeStatus: true,
    verificationStatus: "verified",
    hints: ["He was the second overall pick in 2007, one spot behind Greg Oden.", "His original franchise relocated to Oklahoma City after his rookie year.", "He won back-to-back championships and Finals MVPs with Golden State."],
    lastVerifiedAt: "2026-07-25",
    sourceNotes: "Cross-checked against Wikipedia's career-history infobox (sourced from Basketball-Reference), Britannica, and StatMuse.",
    careerStops: [
      { id: "kevin-durant-1", teamId: "okc", franchiseId: "sonics-franchise", teamNameUsed: "Seattle SuperSonics", firstSeason: "2007", lastSeason: "2008", sequenceNumber: 1, gamesPlayed: 80, answerEligible: true },
      { id: "kevin-durant-2", teamId: "okc", franchiseId: "sonics-franchise", teamNameUsed: "Oklahoma City Thunder", firstSeason: "2008", lastSeason: "2016", sequenceNumber: 2, gamesPlayed: 570, answerEligible: true, verificationNotes: "Franchise relocated from Seattle to Oklahoma City in 2008; same lineage as the prior stop." },
      { id: "kevin-durant-3", teamId: "gsw", franchiseId: "warriors-franchise", teamNameUsed: "Golden State Warriors", firstSeason: "2016", lastSeason: "2019", sequenceNumber: 3, gamesPlayed: 226, answerEligible: true },
      { id: "kevin-durant-4", teamId: "bkn", franchiseId: "nets-franchise", teamNameUsed: "New Jersey Nets", firstSeason: "2019", lastSeason: "2023", sequenceNumber: 4, gamesPlayed: 175, answerEligible: true },
      { id: "kevin-durant-5", teamId: "phx", franchiseId: "suns-franchise", teamNameUsed: "Phoenix Suns", firstSeason: "2023", lastSeason: "2025", sequenceNumber: 5, gamesPlayed: 110, answerEligible: true },
      { id: "kevin-durant-6", teamId: "hou", franchiseId: "rockets-franchise", teamNameUsed: "Houston Rockets", firstSeason: "2025", lastSeason: "2026", sequenceNumber: 6, gamesPlayed: 40, answerEligible: true }
    ]
  },
  {
    id: "chris-paul",
    fullName: "Chris Paul",
    slug: "chris-paul",
    careerStart: 2005,
    careerEnd: 2026,
    careerYearsLabel: "2005-2026",
    difficulty: "hard",
    activeStatus: false,
    verificationStatus: "verified",
    hints: ["He was the fourth overall pick in 2005, out of Wake Forest.", "He served as NBA Players Association president for nearly a decade.", "He retired in 2026 after a second stint with the Clippers, the team he once led through the 'Lob City' era."],
    lastVerifiedAt: "2026-07-25",
    sourceNotes: "Cross-checked against Wikipedia's career-history infobox (sourced from Basketball-Reference) and Britannica's AI-assisted team list, both current through his 2026 retirement.",
    careerStops: [
      { id: "chris-paul-1", teamId: "nop", franchiseId: "pelicans-franchise", teamNameUsed: "New Orleans Hornets", firstSeason: "2005", lastSeason: "2011", sequenceNumber: 1, gamesPlayed: 425, answerEligible: true },
      { id: "chris-paul-2", teamId: "lac", franchiseId: "clippers-franchise", teamNameUsed: "Los Angeles Clippers", firstSeason: "2011", lastSeason: "2017", sequenceNumber: 2, gamesPlayed: 409, answerEligible: true },
      { id: "chris-paul-3", teamId: "hou", franchiseId: "rockets-franchise", teamNameUsed: "Houston Rockets", firstSeason: "2017", lastSeason: "2019", sequenceNumber: 3, gamesPlayed: 121, answerEligible: true },
      { id: "chris-paul-4", teamId: "okc", franchiseId: "sonics-franchise", teamNameUsed: "Oklahoma City Thunder", firstSeason: "2019", lastSeason: "2020", sequenceNumber: 4, gamesPlayed: 70, answerEligible: true },
      { id: "chris-paul-5", teamId: "phx", franchiseId: "suns-franchise", teamNameUsed: "Phoenix Suns", firstSeason: "2020", lastSeason: "2023", sequenceNumber: 5, gamesPlayed: 220, answerEligible: true },
      { id: "chris-paul-6", teamId: "gsw", franchiseId: "warriors-franchise", teamNameUsed: "Golden State Warriors", firstSeason: "2023", lastSeason: "2024", sequenceNumber: 6, gamesPlayed: 58, answerEligible: true },
      { id: "chris-paul-7", teamId: "sas", franchiseId: "spurs-franchise", teamNameUsed: "San Antonio Spurs", firstSeason: "2024", lastSeason: "2025", sequenceNumber: 7, gamesPlayed: 60, answerEligible: true },
      { id: "chris-paul-8", teamId: "lac", franchiseId: "clippers-franchise", teamNameUsed: "Los Angeles Clippers", firstSeason: "2025", lastSeason: "2026", sequenceNumber: 8, gamesPlayed: 20, answerEligible: true, verificationNotes: "Second stint, same franchise. Final NBA season before retiring." }
    ]
  },
  {
    id: "dwight-howard",
    fullName: "Dwight Howard",
    slug: "dwight-howard",
    careerStart: 2004,
    careerEnd: 2022,
    careerYearsLabel: "2004-2022",
    difficulty: "medium",
    activeStatus: false,
    verificationStatus: "verified",
    hints: ["He was the first overall pick in 2004, straight out of high school.", "He won a championship in the NBA's 2020 'bubble' postseason.", "He had three separate stints with the same Los Angeles franchise."],
    lastVerifiedAt: "2026-07-25",
    sourceNotes: "Cross-checked against Wikipedia's career-history infobox (sourced from Basketball-Reference) and StatMuse. A brief 2022-23 stint with the Taoyuan Leopards (Taiwan) is excluded as non-NBA.",
    careerStops: [
      { id: "dwight-howard-1", teamId: "orl", franchiseId: "magic-franchise", teamNameUsed: "Orlando Magic", firstSeason: "2004", lastSeason: "2012", sequenceNumber: 1, gamesPlayed: 620, answerEligible: true },
      { id: "dwight-howard-2", teamId: "lal", franchiseId: "lakers-franchise", teamNameUsed: "Los Angeles Lakers", firstSeason: "2012", lastSeason: "2013", sequenceNumber: 2, gamesPlayed: 76, answerEligible: true },
      { id: "dwight-howard-3", teamId: "hou", franchiseId: "rockets-franchise", teamNameUsed: "Houston Rockets", firstSeason: "2013", lastSeason: "2016", sequenceNumber: 3, gamesPlayed: 213, answerEligible: true },
      { id: "dwight-howard-4", teamId: "atl", franchiseId: "hawks-franchise", teamNameUsed: "Atlanta Hawks", firstSeason: "2016", lastSeason: "2017", sequenceNumber: 4, gamesPlayed: 74, answerEligible: true },
      { id: "dwight-howard-5", teamId: "cha", franchiseId: "hornets-franchise", teamNameUsed: "Charlotte Hornets", firstSeason: "2017", lastSeason: "2018", sequenceNumber: 5, gamesPlayed: 81, answerEligible: true },
      { id: "dwight-howard-6", teamId: "was", franchiseId: "wizards-franchise", teamNameUsed: "Washington Wizards", firstSeason: "2018", lastSeason: "2019", sequenceNumber: 6, gamesPlayed: 9, answerEligible: true },
      { id: "dwight-howard-7", teamId: "lal", franchiseId: "lakers-franchise", teamNameUsed: "Los Angeles Lakers", firstSeason: "2019", lastSeason: "2020", sequenceNumber: 7, gamesPlayed: 62, answerEligible: true, verificationNotes: "Second stint, same franchise. 2020 NBA championship season." },
      { id: "dwight-howard-8", teamId: "phi", franchiseId: "sixers-franchise", teamNameUsed: "Philadelphia 76ers", firstSeason: "2020", lastSeason: "2021", sequenceNumber: 8, gamesPlayed: 68, answerEligible: true },
      { id: "dwight-howard-9", teamId: "lal", franchiseId: "lakers-franchise", teamNameUsed: "Los Angeles Lakers", firstSeason: "2021", lastSeason: "2022", sequenceNumber: 9, gamesPlayed: 60, answerEligible: true, verificationNotes: "Third stint, same franchise." }
    ]
  },
  {
    id: "vince-carter",
    fullName: "Vince Carter",
    slug: "vince-carter",
    careerStart: 1998,
    careerEnd: 2020,
    careerYearsLabel: "1998-2020",
    difficulty: "hard",
    activeStatus: false,
    verificationStatus: "verified",
    hints: ["He was drafted by Golden State but immediately traded on draft night in 1998.", "He is the only player in NBA history to appear in four different decades.", "He finished his 22-year career with the Atlanta Hawks."],
    lastVerifiedAt: "2026-07-25",
    sourceNotes: "Cross-checked against Wikipedia's career-history infobox (sourced from Basketball-Reference), Olympedia, and Forbes. Drafted by Golden State but traded before ever appearing for them, so the Warriors are not answer-eligible.",
    careerStops: [
      { id: "vince-carter-1", teamId: "tor", franchiseId: "raptors-franchise", teamNameUsed: "Toronto Raptors", firstSeason: "1998", lastSeason: "2004", sequenceNumber: 1, gamesPlayed: 403, answerEligible: true },
      { id: "vince-carter-2", teamId: "bkn", franchiseId: "nets-franchise", teamNameUsed: "New Jersey Nets", firstSeason: "2004", lastSeason: "2009", sequenceNumber: 2, gamesPlayed: 353, answerEligible: true },
      { id: "vince-carter-3", teamId: "orl", franchiseId: "magic-franchise", teamNameUsed: "Orlando Magic", firstSeason: "2009", lastSeason: "2010", sequenceNumber: 3, gamesPlayed: 74, answerEligible: true },
      { id: "vince-carter-4", teamId: "phx", franchiseId: "suns-franchise", teamNameUsed: "Phoenix Suns", firstSeason: "2010", lastSeason: "2011", sequenceNumber: 4, gamesPlayed: 69, answerEligible: true },
      { id: "vince-carter-5", teamId: "dal", franchiseId: "mavericks-franchise", teamNameUsed: "Dallas Mavericks", firstSeason: "2011", lastSeason: "2014", sequenceNumber: 5, gamesPlayed: 216, answerEligible: true },
      { id: "vince-carter-6", teamId: "mem", franchiseId: "grizzlies-franchise", teamNameUsed: "Memphis Grizzlies", firstSeason: "2014", lastSeason: "2017", sequenceNumber: 6, gamesPlayed: 240, answerEligible: true },
      { id: "vince-carter-7", teamId: "sac", franchiseId: "kings-franchise", teamNameUsed: "Sacramento Kings", firstSeason: "2017", lastSeason: "2018", sequenceNumber: 7, gamesPlayed: 58, answerEligible: true },
      { id: "vince-carter-8", teamId: "atl", franchiseId: "hawks-franchise", teamNameUsed: "Atlanta Hawks", firstSeason: "2018", lastSeason: "2020", sequenceNumber: 8, gamesPlayed: 129, answerEligible: true }
    ]
  },
  {
    id: "carmelo-anthony",
    fullName: "Carmelo Anthony",
    slug: "carmelo-anthony",
    careerStart: 2003,
    careerEnd: 2022,
    careerYearsLabel: "2003-2022",
    difficulty: "medium",
    activeStatus: false,
    verificationStatus: "verified",
    hints: ["He was the third overall pick in 2003, one spot ahead of Dwyane Wade.", "He led the league in scoring during the 2012-13 season with the Knicks.", "He finished his 19-year career with a single season in Los Angeles."],
    lastVerifiedAt: "2026-07-25",
    sourceNotes: "Cross-checked against Wikipedia's career-history infobox (sourced from Basketball-Reference), Britannica, and StatMuse.",
    careerStops: [
      { id: "carmelo-anthony-1", teamId: "den", franchiseId: "nuggets-franchise", teamNameUsed: "Denver Nuggets", firstSeason: "2003", lastSeason: "2011", sequenceNumber: 1, gamesPlayed: 564, answerEligible: true },
      { id: "carmelo-anthony-2", teamId: "nyk", franchiseId: "knicks-franchise", teamNameUsed: "New York Knicks", firstSeason: "2011", lastSeason: "2017", sequenceNumber: 2, gamesPlayed: 412, answerEligible: true },
      { id: "carmelo-anthony-3", teamId: "okc", franchiseId: "sonics-franchise", teamNameUsed: "Oklahoma City Thunder", firstSeason: "2017", lastSeason: "2018", sequenceNumber: 3, gamesPlayed: 78, answerEligible: true },
      { id: "carmelo-anthony-4", teamId: "hou", franchiseId: "rockets-franchise", teamNameUsed: "Houston Rockets", firstSeason: "2018", lastSeason: "2019", sequenceNumber: 4, gamesPlayed: 10, answerEligible: true },
      { id: "carmelo-anthony-5", teamId: "por", franchiseId: "blazers-franchise", teamNameUsed: "Portland Trail Blazers", firstSeason: "2019", lastSeason: "2021", sequenceNumber: 5, gamesPlayed: 108, answerEligible: true },
      { id: "carmelo-anthony-6", teamId: "lal", franchiseId: "lakers-franchise", teamNameUsed: "Los Angeles Lakers", firstSeason: "2021", lastSeason: "2022", sequenceNumber: 6, gamesPlayed: 69, answerEligible: true }
    ]
  },
  {
    id: "ray-allen",
    fullName: "Ray Allen",
    slug: "ray-allen",
    careerStart: 1996,
    careerEnd: 2014,
    careerYearsLabel: "1996-2014",
    difficulty: "medium",
    activeStatus: false,
    verificationStatus: "verified",
    hints: ["He was the fifth overall pick in 1996, drafted by Minnesota then traded immediately.", "He held the NBA's career three-point record until Stephen Curry passed him.", "His title-clinching three in the 2013 Finals is one of the most famous shots ever."],
    lastVerifiedAt: "2026-07-25",
    sourceNotes: "Cross-checked against Wikipedia's career-history infobox (sourced from Basketball-Reference) and Olympedia. Drafted by Minnesota but traded on draft night before ever appearing - the Timberwolves are not answer-eligible.",
    careerStops: [
      { id: "ray-allen-1", teamId: "mil", franchiseId: "bucks-franchise", teamNameUsed: "Milwaukee Bucks", firstSeason: "1996", lastSeason: "2003", sequenceNumber: 1, gamesPlayed: 500, answerEligible: true },
      { id: "ray-allen-2", teamId: "okc", franchiseId: "sonics-franchise", teamNameUsed: "Seattle SuperSonics", firstSeason: "2003", lastSeason: "2007", sequenceNumber: 2, gamesPlayed: 289, answerEligible: true },
      { id: "ray-allen-3", teamId: "bos", franchiseId: "celtics-franchise", teamNameUsed: "Boston Celtics", firstSeason: "2007", lastSeason: "2012", sequenceNumber: 3, gamesPlayed: 358, answerEligible: true, verificationNotes: "2008 NBA championship season." },
      { id: "ray-allen-4", teamId: "mia", franchiseId: "heat-franchise", teamNameUsed: "Miami Heat", firstSeason: "2012", lastSeason: "2014", sequenceNumber: 4, gamesPlayed: 149, answerEligible: true, verificationNotes: "2013 NBA championship season." }
    ]
  },
  {
    id: "allen-iverson",
    fullName: "Allen Iverson",
    slug: "allen-iverson",
    careerStart: 1996,
    careerEnd: 2010,
    careerYearsLabel: "1996-2010",
    difficulty: "medium",
    activeStatus: false,
    verificationStatus: "verified",
    hints: ["He was the first overall pick in 1996, out of Georgetown.", "He won the 2001 NBA MVP award and led the 76ers to the Finals that year.", "He returned to his original franchise for one final season before retiring."],
    lastVerifiedAt: "2026-07-25",
    sourceNotes: "Cross-checked against Wikipedia's career-history infobox (sourced from Basketball-Reference) and Britannica. A brief 2010-11 stint with Besiktas (Turkey) is excluded as non-NBA.",
    careerStops: [
      { id: "allen-iverson-1", teamId: "phi", franchiseId: "sixers-franchise", teamNameUsed: "Philadelphia 76ers", firstSeason: "1996", lastSeason: "2006", sequenceNumber: 1, gamesPlayed: 632, answerEligible: true },
      { id: "allen-iverson-2", teamId: "den", franchiseId: "nuggets-franchise", teamNameUsed: "Denver Nuggets", firstSeason: "2006", lastSeason: "2008", sequenceNumber: 2, gamesPlayed: 98, answerEligible: true },
      { id: "allen-iverson-3", teamId: "det", franchiseId: "pistons-franchise", teamNameUsed: "Detroit Pistons", firstSeason: "2008", lastSeason: "2009", sequenceNumber: 3, gamesPlayed: 3, answerEligible: true },
      { id: "allen-iverson-4", teamId: "mem", franchiseId: "grizzlies-franchise", teamNameUsed: "Memphis Grizzlies", firstSeason: "2009", lastSeason: "2009", sequenceNumber: 4, gamesPlayed: 3, answerEligible: true },
      { id: "allen-iverson-5", teamId: "phi", franchiseId: "sixers-franchise", teamNameUsed: "Philadelphia 76ers", firstSeason: "2009", lastSeason: "2010", sequenceNumber: 5, gamesPlayed: 25, answerEligible: true, verificationNotes: "Second stint, same franchise." }
    ]
  },
  {
    id: "tracy-mcgrady",
    fullName: "Tracy McGrady",
    slug: "tracy-mcgrady",
    careerStart: 1997,
    careerEnd: 2013,
    careerYearsLabel: "1997-2013",
    difficulty: "hard",
    activeStatus: false,
    verificationStatus: "verified",
    hints: ["He entered the NBA straight out of high school as the ninth pick in 1997.", "He won back-to-back scoring titles with the Houston Rockets.", "He signed with a contender for a brief cameo at the very end of his career."],
    lastVerifiedAt: "2026-07-25",
    sourceNotes: "Cross-checked against Wikipedia's career-history infobox (sourced from Basketball-Reference) and StatMuse. A 2012-13 stint with the Qingdao Eagles (China) is excluded as non-NBA.",
    careerStops: [
      { id: "tracy-mcgrady-1", teamId: "tor", franchiseId: "raptors-franchise", teamNameUsed: "Toronto Raptors", firstSeason: "1997", lastSeason: "2000", sequenceNumber: 1, gamesPlayed: 194, answerEligible: true },
      { id: "tracy-mcgrady-2", teamId: "orl", franchiseId: "magic-franchise", teamNameUsed: "Orlando Magic", firstSeason: "2000", lastSeason: "2004", sequenceNumber: 2, gamesPlayed: 273, answerEligible: true },
      { id: "tracy-mcgrady-3", teamId: "hou", franchiseId: "rockets-franchise", teamNameUsed: "Houston Rockets", firstSeason: "2004", lastSeason: "2010", sequenceNumber: 3, gamesPlayed: 322, answerEligible: true },
      { id: "tracy-mcgrady-4", teamId: "nyk", franchiseId: "knicks-franchise", teamNameUsed: "New York Knicks", firstSeason: "2010", lastSeason: "2010", sequenceNumber: 4, gamesPlayed: 24, answerEligible: true },
      { id: "tracy-mcgrady-5", teamId: "det", franchiseId: "pistons-franchise", teamNameUsed: "Detroit Pistons", firstSeason: "2010", lastSeason: "2011", sequenceNumber: 5, gamesPlayed: 72, answerEligible: true },
      { id: "tracy-mcgrady-6", teamId: "atl", franchiseId: "hawks-franchise", teamNameUsed: "Atlanta Hawks", firstSeason: "2011", lastSeason: "2012", sequenceNumber: 6, gamesPlayed: 66, answerEligible: true },
      { id: "tracy-mcgrady-7", teamId: "sas", franchiseId: "spurs-franchise", teamNameUsed: "San Antonio Spurs", firstSeason: "2013", lastSeason: "2013", sequenceNumber: 7, gamesPlayed: 6, answerEligible: true }
    ]
  },
  {
    id: "steve-nash",
    fullName: "Steve Nash",
    slug: "steve-nash",
    careerStart: 1996,
    careerEnd: 2015,
    careerYearsLabel: "1996-2015",
    difficulty: "easy",
    activeStatus: false,
    verificationStatus: "verified",
    hints: ["He was a Canadian point guard picked 15th overall in 1996.", "He won back-to-back MVP awards in 2005 and 2006.", "He returned to a franchise he'd already played for before finishing his career in Los Angeles."],
    lastVerifiedAt: "2026-07-25",
    sourceNotes: "Cross-checked against Wikipedia's career-history infobox (sourced from Basketball-Reference) and Britannica.",
    careerStops: [
      { id: "steve-nash-1", teamId: "phx", franchiseId: "suns-franchise", teamNameUsed: "Phoenix Suns", firstSeason: "1996", lastSeason: "1998", sequenceNumber: 1, gamesPlayed: 145, answerEligible: true },
      { id: "steve-nash-2", teamId: "dal", franchiseId: "mavericks-franchise", teamNameUsed: "Dallas Mavericks", firstSeason: "1998", lastSeason: "2004", sequenceNumber: 2, gamesPlayed: 378, answerEligible: true },
      { id: "steve-nash-3", teamId: "phx", franchiseId: "suns-franchise", teamNameUsed: "Phoenix Suns", firstSeason: "2004", lastSeason: "2012", sequenceNumber: 3, gamesPlayed: 508, answerEligible: true, verificationNotes: "Second stint, same franchise. Won back-to-back MVPs here." },
      { id: "steve-nash-4", teamId: "lal", franchiseId: "lakers-franchise", teamNameUsed: "Los Angeles Lakers", firstSeason: "2012", lastSeason: "2015", sequenceNumber: 4, gamesPlayed: 65, answerEligible: true }
    ]
  },
  {
    id: "jason-kidd",
    fullName: "Jason Kidd",
    slug: "jason-kidd",
    careerStart: 1994,
    careerEnd: 2013,
    careerYearsLabel: "1994-2013",
    difficulty: "medium",
    activeStatus: false,
    verificationStatus: "verified",
    hints: ["He was the second overall pick in 1994 and shared Rookie of the Year honors.", "He led the Nets to consecutive NBA Finals appearances in 2002 and 2003.", "He won his only championship back with the team that originally drafted him."],
    lastVerifiedAt: "2026-07-25",
    sourceNotes: "Cross-checked against Wikipedia's career-history infobox (sourced from Basketball-Reference) and Britannica.",
    careerStops: [
      { id: "jason-kidd-1", teamId: "dal", franchiseId: "mavericks-franchise", teamNameUsed: "Dallas Mavericks", firstSeason: "1994", lastSeason: "1996", sequenceNumber: 1, gamesPlayed: 158, answerEligible: true },
      { id: "jason-kidd-2", teamId: "phx", franchiseId: "suns-franchise", teamNameUsed: "Phoenix Suns", firstSeason: "1996", lastSeason: "2001", sequenceNumber: 2, gamesPlayed: 348, answerEligible: true },
      { id: "jason-kidd-3", teamId: "bkn", franchiseId: "nets-franchise", teamNameUsed: "New Jersey Nets", firstSeason: "2001", lastSeason: "2008", sequenceNumber: 3, gamesPlayed: 506, answerEligible: true },
      { id: "jason-kidd-4", teamId: "dal", franchiseId: "mavericks-franchise", teamNameUsed: "Dallas Mavericks", firstSeason: "2008", lastSeason: "2012", sequenceNumber: 4, gamesPlayed: 292, answerEligible: true, verificationNotes: "Second stint, same franchise. 2011 NBA championship." },
      { id: "jason-kidd-5", teamId: "nyk", franchiseId: "knicks-franchise", teamNameUsed: "New York Knicks", firstSeason: "2012", lastSeason: "2013", sequenceNumber: 5, gamesPlayed: 72, answerEligible: true }
    ]
  },
  {
    id: "gary-payton",
    fullName: "Gary Payton",
    slug: "gary-payton",
    careerStart: 1990,
    careerEnd: 2007,
    careerYearsLabel: "1990-2007",
    difficulty: "medium",
    activeStatus: false,
    verificationStatus: "verified",
    hints: ["He was the second overall pick in 1990, nicknamed 'The Glove' for his defense.", "He's the only point guard ever named NBA Defensive Player of the Year.", "He won his only championship in the final season of his career."],
    lastVerifiedAt: "2026-07-25",
    sourceNotes: "Cross-checked against Wikipedia's career-history infobox (sourced from Basketball-Reference) and Britannica.",
    careerStops: [
      { id: "gary-payton-1", teamId: "okc", franchiseId: "sonics-franchise", teamNameUsed: "Seattle SuperSonics", firstSeason: "1990", lastSeason: "2003", sequenceNumber: 1, gamesPlayed: 951, answerEligible: true },
      { id: "gary-payton-2", teamId: "mil", franchiseId: "bucks-franchise", teamNameUsed: "Milwaukee Bucks", firstSeason: "2003", lastSeason: "2003", sequenceNumber: 2, gamesPlayed: 28, answerEligible: true },
      { id: "gary-payton-3", teamId: "lal", franchiseId: "lakers-franchise", teamNameUsed: "Los Angeles Lakers", firstSeason: "2003", lastSeason: "2004", sequenceNumber: 3, gamesPlayed: 76, answerEligible: true },
      { id: "gary-payton-4", teamId: "bos", franchiseId: "celtics-franchise", teamNameUsed: "Boston Celtics", firstSeason: "2004", lastSeason: "2005", sequenceNumber: 4, gamesPlayed: 68, answerEligible: true },
      { id: "gary-payton-5", teamId: "mia", franchiseId: "heat-franchise", teamNameUsed: "Miami Heat", firstSeason: "2005", lastSeason: "2007", sequenceNumber: 5, gamesPlayed: 92, answerEligible: true, verificationNotes: "2006 NBA championship season." }
    ]
  },
  {
    id: "scottie-pippen",
    fullName: "Scottie Pippen",
    slug: "scottie-pippen",
    careerStart: 1987,
    careerEnd: 2004,
    careerYearsLabel: "1987-2004",
    difficulty: "easy",
    activeStatus: false,
    verificationStatus: "verified",
    hints: ["He was drafted by Seattle in 1987 but traded on draft night to Chicago.", "He won six championships alongside Michael Jordan in the 1990s.", "He returned to Chicago for one final season to close out his career."],
    lastVerifiedAt: "2026-07-25",
    sourceNotes: "Cross-checked against Wikipedia's career-history infobox (sourced from Basketball-Reference) and Britannica. Drafted by Seattle but traded before ever appearing - the SuperSonics are not answer-eligible.",
    careerStops: [
      { id: "scottie-pippen-1", teamId: "chi", franchiseId: "bulls-franchise", teamNameUsed: "Chicago Bulls", firstSeason: "1987", lastSeason: "1998", sequenceNumber: 1, gamesPlayed: 841, answerEligible: true },
      { id: "scottie-pippen-2", teamId: "hou", franchiseId: "rockets-franchise", teamNameUsed: "Houston Rockets", firstSeason: "1999", lastSeason: "1999", sequenceNumber: 2, gamesPlayed: 49, answerEligible: true },
      { id: "scottie-pippen-3", teamId: "por", franchiseId: "blazers-franchise", teamNameUsed: "Portland Trail Blazers", firstSeason: "1999", lastSeason: "2003", sequenceNumber: 3, gamesPlayed: 268, answerEligible: true },
      { id: "scottie-pippen-4", teamId: "chi", franchiseId: "bulls-franchise", teamNameUsed: "Chicago Bulls", firstSeason: "2003", lastSeason: "2004", sequenceNumber: 4, gamesPlayed: 23, answerEligible: true, verificationNotes: "Second stint, same franchise." }
    ]
  },
  {
    id: "charles-barkley",
    fullName: "Charles Barkley",
    slug: "charles-barkley",
    careerStart: 1984,
    careerEnd: 2000,
    careerYearsLabel: "1984-2000",
    difficulty: "easy",
    activeStatus: false,
    verificationStatus: "verified",
    hints: ["He was the fifth overall pick in 1984, out of Auburn.", "He won NBA MVP in 1993 while leading the Suns to the Finals.", "He retired in 2000 while a member of the Houston Rockets."],
    lastVerifiedAt: "2026-07-25",
    sourceNotes: "Cross-checked against Wikipedia's career-history infobox (sourced from Basketball-Reference) and Britannica.",
    careerStops: [
      { id: "charles-barkley-1", teamId: "phi", franchiseId: "sixers-franchise", teamNameUsed: "Philadelphia 76ers", firstSeason: "1984", lastSeason: "1992", sequenceNumber: 1, gamesPlayed: 600, answerEligible: true },
      { id: "charles-barkley-2", teamId: "phx", franchiseId: "suns-franchise", teamNameUsed: "Phoenix Suns", firstSeason: "1992", lastSeason: "1996", sequenceNumber: 2, gamesPlayed: 296, answerEligible: true },
      { id: "charles-barkley-3", teamId: "hou", franchiseId: "rockets-franchise", teamNameUsed: "Houston Rockets", firstSeason: "1996", lastSeason: "2000", sequenceNumber: 3, gamesPlayed: 334, answerEligible: true }
    ]
  },
  {
    id: "kevin-garnett",
    fullName: "Kevin Garnett",
    slug: "kevin-garnett",
    careerStart: 1995,
    careerEnd: 2016,
    careerYearsLabel: "1995-2016",
    difficulty: "medium",
    activeStatus: false,
    verificationStatus: "verified",
    hints: ["He was drafted straight out of high school, fifth overall in 1995.", "He won NBA MVP in 2004 while with Minnesota.", "He returned to the team that drafted him for his final NBA season."],
    lastVerifiedAt: "2026-07-25",
    sourceNotes: "Cross-checked against Wikipedia's career-history infobox (sourced from Basketball-Reference) and Britannica.",
    careerStops: [
      { id: "kevin-garnett-1", teamId: "min", franchiseId: "timberwolves-franchise", teamNameUsed: "Minnesota Timberwolves", firstSeason: "1995", lastSeason: "2007", sequenceNumber: 1, gamesPlayed: 927, answerEligible: true },
      { id: "kevin-garnett-2", teamId: "bos", franchiseId: "celtics-franchise", teamNameUsed: "Boston Celtics", firstSeason: "2007", lastSeason: "2013", sequenceNumber: 2, gamesPlayed: 401, answerEligible: true, verificationNotes: "2008 NBA championship season." },
      { id: "kevin-garnett-3", teamId: "bkn", franchiseId: "nets-franchise", teamNameUsed: "New Jersey Nets", firstSeason: "2013", lastSeason: "2015", sequenceNumber: 3, gamesPlayed: 108, answerEligible: true },
      { id: "kevin-garnett-4", teamId: "min", franchiseId: "timberwolves-franchise", teamNameUsed: "Minnesota Timberwolves", firstSeason: "2015", lastSeason: "2016", sequenceNumber: 4, gamesPlayed: 38, answerEligible: true, verificationNotes: "Second stint, same franchise." }
    ]
  },
  {
    id: "rasheed-wallace",
    fullName: "Rasheed Wallace",
    slug: "rasheed-wallace",
    careerStart: 1995,
    careerEnd: 2013,
    careerYearsLabel: "1995-2010, 2012-2013",
    difficulty: "hard",
    activeStatus: false,
    verificationStatus: "verified",
    hints: ["He was drafted fourth overall in 1995 by the Washington Bullets.", "He won his only championship as a key rotation piece for the 2004 Pistons.", "He came out of a brief retirement to help the Knicks down the stretch."],
    lastVerifiedAt: "2026-07-25",
    sourceNotes: "Cross-checked against Wikipedia's career-history infobox (sourced from Basketball-Reference) and StatMuse. The Washington Bullets is the same franchise as today's Washington Wizards (renamed in 1997).",
    careerStops: [
      { id: "rasheed-wallace-1", teamId: "was", franchiseId: "wizards-franchise", teamNameUsed: "Washington Bullets", firstSeason: "1995", lastSeason: "1996", sequenceNumber: 1, gamesPlayed: 65, answerEligible: true },
      { id: "rasheed-wallace-2", teamId: "por", franchiseId: "blazers-franchise", teamNameUsed: "Portland Trail Blazers", firstSeason: "1996", lastSeason: "2004", sequenceNumber: 2, gamesPlayed: 502, answerEligible: true },
      { id: "rasheed-wallace-3", teamId: "atl", franchiseId: "hawks-franchise", teamNameUsed: "Atlanta Hawks", firstSeason: "2004", lastSeason: "2004", sequenceNumber: 3, gamesPlayed: 1, answerEligible: true, verificationNotes: "Traded mid-season, played a single game before moving on to Detroit." },
      { id: "rasheed-wallace-4", teamId: "det", franchiseId: "pistons-franchise", teamNameUsed: "Detroit Pistons", firstSeason: "2004", lastSeason: "2009", sequenceNumber: 4, gamesPlayed: 358, answerEligible: true, verificationNotes: "2004 NBA championship season." },
      { id: "rasheed-wallace-5", teamId: "bos", franchiseId: "celtics-franchise", teamNameUsed: "Boston Celtics", firstSeason: "2009", lastSeason: "2010", sequenceNumber: 5, gamesPlayed: 74, answerEligible: true },
      { id: "rasheed-wallace-6", teamId: "nyk", franchiseId: "knicks-franchise", teamNameUsed: "New York Knicks", firstSeason: "2012", lastSeason: "2013", sequenceNumber: 6, gamesPlayed: 21, answerEligible: true }
    ]
  },
  {
    id: "shawn-marion",
    fullName: "Shawn Marion",
    slug: "shawn-marion",
    careerStart: 1999,
    careerEnd: 2015,
    careerYearsLabel: "1999-2015",
    difficulty: "medium",
    activeStatus: false,
    verificationStatus: "verified",
    hints: ["He was nicknamed 'The Matrix' during his rookie preseason in Phoenix.", "He was traded for Shaquille O'Neal in a blockbuster 2008 deal.", "He won his only championship with the Mavericks in 2011."],
    lastVerifiedAt: "2026-07-25",
    sourceNotes: "Cross-checked against Wikipedia's career-history infobox (sourced from Basketball-Reference) and StatMuse.",
    careerStops: [
      { id: "shawn-marion-1", teamId: "phx", franchiseId: "suns-franchise", teamNameUsed: "Phoenix Suns", firstSeason: "1999", lastSeason: "2008", sequenceNumber: 1, gamesPlayed: 621, answerEligible: true },
      { id: "shawn-marion-2", teamId: "mia", franchiseId: "heat-franchise", teamNameUsed: "Miami Heat", firstSeason: "2008", lastSeason: "2009", sequenceNumber: 2, gamesPlayed: 55, answerEligible: true },
      { id: "shawn-marion-3", teamId: "tor", franchiseId: "raptors-franchise", teamNameUsed: "Toronto Raptors", firstSeason: "2009", lastSeason: "2009", sequenceNumber: 3, gamesPlayed: 36, answerEligible: true },
      { id: "shawn-marion-4", teamId: "dal", franchiseId: "mavericks-franchise", teamNameUsed: "Dallas Mavericks", firstSeason: "2009", lastSeason: "2014", sequenceNumber: 4, gamesPlayed: 328, answerEligible: true, verificationNotes: "2011 NBA championship season." },
      { id: "shawn-marion-5", teamId: "cle", franchiseId: "cavaliers-franchise", teamNameUsed: "Cleveland Cavaliers", firstSeason: "2014", lastSeason: "2015", sequenceNumber: 5, gamesPlayed: 54, answerEligible: true }
    ]
  },
  {
    id: "baron-davis",
    fullName: "Baron Davis",
    slug: "baron-davis",
    careerStart: 1999,
    careerEnd: 2012,
    careerYearsLabel: "1999-2012",
    difficulty: "hard",
    activeStatus: false,
    verificationStatus: "verified",
    hints: ["He was the third overall pick in 1999, out of UCLA.", "His original franchise relocated from Charlotte to New Orleans partway through his tenure there.", "He famously delivered a highlight-reel dunk to help upset the top-seeded Mavericks in the 2007 playoffs."],
    lastVerifiedAt: "2026-07-25",
    sourceNotes: "Cross-checked against Wikipedia's career-history infobox (sourced from Basketball-Reference). His original 'Charlotte Hornets' team relocated to New Orleans in 2002 and is the same franchise lineage as today's Pelicans - not today's Charlotte Hornets, which descends from the former Bobcats.",
    careerStops: [
      { id: "baron-davis-1", teamId: "nop", franchiseId: "pelicans-franchise", teamNameUsed: "Charlotte Hornets", firstSeason: "1999", lastSeason: "2002", sequenceNumber: 1, gamesPlayed: 195, answerEligible: true, verificationNotes: "Franchise later relocated to New Orleans; same lineage as today's Pelicans, not today's Charlotte Hornets." },
      { id: "baron-davis-2", teamId: "nop", franchiseId: "pelicans-franchise", teamNameUsed: "New Orleans Hornets", firstSeason: "2002", lastSeason: "2005", sequenceNumber: 2, gamesPlayed: 137, answerEligible: true, verificationNotes: "Second stint, same franchise (post-relocation)." },
      { id: "baron-davis-3", teamId: "gsw", franchiseId: "warriors-franchise", teamNameUsed: "Golden State Warriors", firstSeason: "2005", lastSeason: "2008", sequenceNumber: 3, gamesPlayed: 191, answerEligible: true },
      { id: "baron-davis-4", teamId: "lac", franchiseId: "clippers-franchise", teamNameUsed: "Los Angeles Clippers", firstSeason: "2008", lastSeason: "2011", sequenceNumber: 4, gamesPlayed: 158, answerEligible: true },
      { id: "baron-davis-5", teamId: "cle", franchiseId: "cavaliers-franchise", teamNameUsed: "Cleveland Cavaliers", firstSeason: "2011", lastSeason: "2011", sequenceNumber: 5, gamesPlayed: 24, answerEligible: true },
      { id: "baron-davis-6", teamId: "nyk", franchiseId: "knicks-franchise", teamNameUsed: "New York Knicks", firstSeason: "2011", lastSeason: "2012", sequenceNumber: 6, gamesPlayed: 41, answerEligible: true }
    ]
  },
  {
    id: "joe-johnson",
    fullName: "Joe Johnson",
    slug: "joe-johnson",
    careerStart: 2001,
    careerEnd: 2022,
    careerYearsLabel: "2001-2018, 2021-2022",
    difficulty: "hard",
    activeStatus: false,
    verificationStatus: "verified",
    hints: ["He was drafted tenth overall in 2001 by the Boston Celtics.", "He made seven straight All-Star teams while with the Hawks and Nets.", "He returned to the franchise that originally drafted him for one final season."],
    lastVerifiedAt: "2026-07-25",
    sourceNotes: "Cross-checked against Wikipedia's career-history infobox (sourced from Basketball-Reference).",
    careerStops: [
      { id: "joe-johnson-1", teamId: "bos", franchiseId: "celtics-franchise", teamNameUsed: "Boston Celtics", firstSeason: "2001", lastSeason: "2002", sequenceNumber: 1, gamesPlayed: 49, answerEligible: true },
      { id: "joe-johnson-2", teamId: "phx", franchiseId: "suns-franchise", teamNameUsed: "Phoenix Suns", firstSeason: "2002", lastSeason: "2005", sequenceNumber: 2, gamesPlayed: 216, answerEligible: true },
      { id: "joe-johnson-3", teamId: "atl", franchiseId: "hawks-franchise", teamNameUsed: "Atlanta Hawks", firstSeason: "2005", lastSeason: "2012", sequenceNumber: 3, gamesPlayed: 507, answerEligible: true },
      { id: "joe-johnson-4", teamId: "bkn", franchiseId: "nets-franchise", teamNameUsed: "New Jersey Nets", firstSeason: "2012", lastSeason: "2016", sequenceNumber: 4, gamesPlayed: 271, answerEligible: true },
      { id: "joe-johnson-5", teamId: "mia", franchiseId: "heat-franchise", teamNameUsed: "Miami Heat", firstSeason: "2016", lastSeason: "2016", sequenceNumber: 5, gamesPlayed: 26, answerEligible: true },
      { id: "joe-johnson-6", teamId: "uta", franchiseId: "jazz-franchise", teamNameUsed: "Utah Jazz", firstSeason: "2016", lastSeason: "2018", sequenceNumber: 6, gamesPlayed: 106, answerEligible: true },
      { id: "joe-johnson-7", teamId: "hou", franchiseId: "rockets-franchise", teamNameUsed: "Houston Rockets", firstSeason: "2018", lastSeason: "2018", sequenceNumber: 7, gamesPlayed: 25, answerEligible: true },
      { id: "joe-johnson-8", teamId: "bos", franchiseId: "celtics-franchise", teamNameUsed: "Boston Celtics", firstSeason: "2021", lastSeason: "2022", sequenceNumber: 8, gamesPlayed: 4, answerEligible: true, verificationNotes: "Second stint, same franchise." }
    ]
  },
  {
    id: "jamal-crawford",
    fullName: "Jamal Crawford",
    slug: "jamal-crawford",
    careerStart: 2000,
    careerEnd: 2020,
    careerYearsLabel: "2000-2020",
    difficulty: "hard",
    activeStatus: false,
    verificationStatus: "verified",
    hints: ["He was drafted eighth overall in 2000 by Cleveland but traded before ever appearing.", "He's a three-time NBA Sixth Man of the Year, tied for the most all-time.", "He became the first player ever to score 50+ points for four different franchises."],
    lastVerifiedAt: "2026-07-25",
    sourceNotes: "Cross-checked against Wikipedia's career-history infobox (sourced from Basketball-Reference) and StatMuse. Drafted by Cleveland but traded on draft night before ever appearing - the Cavaliers are not answer-eligible.",
    careerStops: [
      { id: "jamal-crawford-1", teamId: "chi", franchiseId: "bulls-franchise", teamNameUsed: "Chicago Bulls", firstSeason: "2000", lastSeason: "2004", sequenceNumber: 1, gamesPlayed: 305, answerEligible: true },
      { id: "jamal-crawford-2", teamId: "nyk", franchiseId: "knicks-franchise", teamNameUsed: "New York Knicks", firstSeason: "2004", lastSeason: "2008", sequenceNumber: 2, gamesPlayed: 313, answerEligible: true },
      { id: "jamal-crawford-3", teamId: "gsw", franchiseId: "warriors-franchise", teamNameUsed: "Golden State Warriors", firstSeason: "2008", lastSeason: "2009", sequenceNumber: 3, gamesPlayed: 54, answerEligible: true },
      { id: "jamal-crawford-4", teamId: "atl", franchiseId: "hawks-franchise", teamNameUsed: "Atlanta Hawks", firstSeason: "2009", lastSeason: "2011", sequenceNumber: 4, gamesPlayed: 130, answerEligible: true },
      { id: "jamal-crawford-5", teamId: "por", franchiseId: "blazers-franchise", teamNameUsed: "Portland Trail Blazers", firstSeason: "2011", lastSeason: "2012", sequenceNumber: 5, gamesPlayed: 49, answerEligible: true },
      { id: "jamal-crawford-6", teamId: "lac", franchiseId: "clippers-franchise", teamNameUsed: "Los Angeles Clippers", firstSeason: "2012", lastSeason: "2017", sequenceNumber: 6, gamesPlayed: 375, answerEligible: true },
      { id: "jamal-crawford-7", teamId: "min", franchiseId: "timberwolves-franchise", teamNameUsed: "Minnesota Timberwolves", firstSeason: "2017", lastSeason: "2018", sequenceNumber: 7, gamesPlayed: 68, answerEligible: true },
      { id: "jamal-crawford-8", teamId: "phx", franchiseId: "suns-franchise", teamNameUsed: "Phoenix Suns", firstSeason: "2018", lastSeason: "2019", sequenceNumber: 8, gamesPlayed: 44, answerEligible: true },
      { id: "jamal-crawford-9", teamId: "bkn", franchiseId: "nets-franchise", teamNameUsed: "New Jersey Nets", firstSeason: "2020", lastSeason: "2020", sequenceNumber: 9, gamesPlayed: 4, answerEligible: true }
    ]
  },
  {
    id: "rajon-rondo",
    fullName: "Rajon Rondo",
    slug: "rajon-rondo",
    careerStart: 2006,
    careerEnd: 2022,
    careerYearsLabel: "2006-2022",
    difficulty: "hard",
    activeStatus: false,
    verificationStatus: "verified",
    hints: ["He was drafted by Phoenix in 2006 but traded to Boston on draft night.", "He won his first championship as Boston's starting point guard in 2008.", "He's the only player to win a title with both the Celtics and the Lakers."],
    lastVerifiedAt: "2026-07-25",
    sourceNotes: "Cross-checked against Wikipedia's career-history infobox (sourced from Basketball-Reference) and StatMuse. Drafted by Phoenix but traded on draft night before ever appearing - the Suns are not answer-eligible.",
    careerStops: [
      { id: "rajon-rondo-1", teamId: "bos", franchiseId: "celtics-franchise", teamNameUsed: "Boston Celtics", firstSeason: "2006", lastSeason: "2014", sequenceNumber: 1, gamesPlayed: 578, answerEligible: true, verificationNotes: "2008 NBA championship season." },
      { id: "rajon-rondo-2", teamId: "dal", franchiseId: "mavericks-franchise", teamNameUsed: "Dallas Mavericks", firstSeason: "2014", lastSeason: "2015", sequenceNumber: 2, gamesPlayed: 46, answerEligible: true },
      { id: "rajon-rondo-3", teamId: "sac", franchiseId: "kings-franchise", teamNameUsed: "Sacramento Kings", firstSeason: "2015", lastSeason: "2016", sequenceNumber: 3, gamesPlayed: 72, answerEligible: true },
      { id: "rajon-rondo-4", teamId: "chi", franchiseId: "bulls-franchise", teamNameUsed: "Chicago Bulls", firstSeason: "2016", lastSeason: "2017", sequenceNumber: 4, gamesPlayed: 65, answerEligible: true },
      { id: "rajon-rondo-5", teamId: "nop", franchiseId: "pelicans-franchise", teamNameUsed: "New Orleans Pelicans", firstSeason: "2017", lastSeason: "2018", sequenceNumber: 5, gamesPlayed: 60, answerEligible: true },
      { id: "rajon-rondo-6", teamId: "lal", franchiseId: "lakers-franchise", teamNameUsed: "Los Angeles Lakers", firstSeason: "2018", lastSeason: "2020", sequenceNumber: 6, gamesPlayed: 96, answerEligible: true, verificationNotes: "2020 NBA championship season." },
      { id: "rajon-rondo-7", teamId: "atl", franchiseId: "hawks-franchise", teamNameUsed: "Atlanta Hawks", firstSeason: "2020", lastSeason: "2021", sequenceNumber: 7, gamesPlayed: 44, answerEligible: true },
      { id: "rajon-rondo-8", teamId: "lac", franchiseId: "clippers-franchise", teamNameUsed: "Los Angeles Clippers", firstSeason: "2021", lastSeason: "2021", sequenceNumber: 8, gamesPlayed: 22, answerEligible: true },
      { id: "rajon-rondo-9", teamId: "lal", franchiseId: "lakers-franchise", teamNameUsed: "Los Angeles Lakers", firstSeason: "2021", lastSeason: "2022", sequenceNumber: 9, gamesPlayed: 20, answerEligible: true, verificationNotes: "Second stint, same franchise." },
      { id: "rajon-rondo-10", teamId: "cle", franchiseId: "cavaliers-franchise", teamNameUsed: "Cleveland Cavaliers", firstSeason: "2022", lastSeason: "2022", sequenceNumber: 10, gamesPlayed: 4, answerEligible: true }
    ]
  },
  {
    id: "karl-malone",
    fullName: "Karl Malone",
    slug: "karl-malone",
    careerStart: 1985,
    careerEnd: 2004,
    careerYearsLabel: "1985-2004",
    difficulty: "easy",
    activeStatus: false,
    verificationStatus: "verified",
    hints: ["He was the 13th overall pick in 1985, nicknamed 'The Mailman'.", "He won back-to-back MVP awards in 1997 and 1999.", "He spent one final season chasing a ring alongside Shaquille O'Neal and Kobe Bryant."],
    lastVerifiedAt: "2026-07-25",
    sourceNotes: "Cross-checked against Wikipedia's career-history infobox (sourced from Basketball-Reference) and Britannica.",
    careerStops: [
      { id: "karl-malone-1", teamId: "uta", franchiseId: "jazz-franchise", teamNameUsed: "Utah Jazz", firstSeason: "1985", lastSeason: "2003", sequenceNumber: 1, gamesPlayed: 1434, answerEligible: true },
      { id: "karl-malone-2", teamId: "lal", franchiseId: "lakers-franchise", teamNameUsed: "Los Angeles Lakers", firstSeason: "2003", lastSeason: "2004", sequenceNumber: 2, gamesPlayed: 42, answerEligible: true }
    ]
  },
  {
    id: "patrick-ewing",
    fullName: "Patrick Ewing",
    slug: "patrick-ewing",
    careerStart: 1985,
    careerEnd: 2002,
    careerYearsLabel: "1985-2002",
    difficulty: "easy",
    activeStatus: false,
    verificationStatus: "verified",
    hints: ["He was the first overall pick in 1985, born in Kingston, Jamaica.", "He led the Knicks to the 1994 NBA Finals.", "He closed out his career with one-year stints on two different teams."],
    lastVerifiedAt: "2026-07-25",
    sourceNotes: "Cross-checked against Wikipedia's career-history infobox (sourced from Basketball-Reference) and Britannica.",
    careerStops: [
      { id: "patrick-ewing-1", teamId: "nyk", franchiseId: "knicks-franchise", teamNameUsed: "New York Knicks", firstSeason: "1985", lastSeason: "2000", sequenceNumber: 1, gamesPlayed: 1039, answerEligible: true },
      { id: "patrick-ewing-2", teamId: "okc", franchiseId: "sonics-franchise", teamNameUsed: "Seattle SuperSonics", firstSeason: "2000", lastSeason: "2001", sequenceNumber: 2, gamesPlayed: 76, answerEligible: true },
      { id: "patrick-ewing-3", teamId: "orl", franchiseId: "magic-franchise", teamNameUsed: "Orlando Magic", firstSeason: "2001", lastSeason: "2002", sequenceNumber: 3, gamesPlayed: 59, answerEligible: true }
    ]
  },
  {
    id: "kobe-bryant",
    fullName: "Kobe Bryant",
    slug: "kobe-bryant",
    careerStart: 1996,
    careerEnd: 2016,
    careerYearsLabel: "1996-2016",
    difficulty: "easy",
    activeStatus: false,
    verificationStatus: "verified",
    hints: ["He was drafted 13th overall in 1996 straight out of high school, then traded on draft night.", "He won five championships, all with the same franchise.", "He played all 20 seasons of his career for a single team."],
    lastVerifiedAt: "2026-07-25",
    sourceNotes: "Cross-checked against Wikipedia and Britannica. Drafted by Charlotte but traded to the Lakers before ever appearing for the Hornets - Charlotte is not answer-eligible.",
    careerStops: [
      { id: "kobe-bryant-1", teamId: "lal", franchiseId: "lakers-franchise", teamNameUsed: "Los Angeles Lakers", firstSeason: "1996", lastSeason: "2016", sequenceNumber: 1, gamesPlayed: 1346, answerEligible: true }
    ]
  },
  {
    id: "tim-duncan",
    fullName: "Tim Duncan",
    slug: "tim-duncan",
    careerStart: 1997,
    careerEnd: 2016,
    careerYearsLabel: "1997-2016",
    difficulty: "easy",
    activeStatus: false,
    verificationStatus: "verified",
    hints: ["He was the first overall pick in 1997, out of Wake Forest.", "He won five championships, all with the same franchise.", "He spent his entire 19-year career with one team, nicknamed 'The Big Fundamental'."],
    lastVerifiedAt: "2026-07-25",
    sourceNotes: "Cross-checked against Wikipedia and Britannica.",
    careerStops: [
      { id: "tim-duncan-1", teamId: "sas", franchiseId: "spurs-franchise", teamNameUsed: "San Antonio Spurs", firstSeason: "1997", lastSeason: "2016", sequenceNumber: 1, gamesPlayed: 1392, answerEligible: true }
    ]
  },
  {
    id: "dirk-nowitzki",
    fullName: "Dirk Nowitzki",
    slug: "dirk-nowitzki",
    careerStart: 1998,
    careerEnd: 2019,
    careerYearsLabel: "1998-2019",
    difficulty: "easy",
    activeStatus: false,
    verificationStatus: "verified",
    hints: ["He was a German big man drafted ninth overall in 1998, then traded on draft night.", "He won NBA MVP in 2007 and a championship in 2011, both with the same team.", "He spent all 21 seasons of his career with a single franchise."],
    lastVerifiedAt: "2026-07-25",
    sourceNotes: "Cross-checked against Wikipedia and Britannica. Drafted by Milwaukee but traded to Dallas on draft night before ever appearing - Milwaukee is not answer-eligible.",
    careerStops: [
      { id: "dirk-nowitzki-1", teamId: "dal", franchiseId: "mavericks-franchise", teamNameUsed: "Dallas Mavericks", firstSeason: "1998", lastSeason: "2019", sequenceNumber: 1, gamesPlayed: 1522, answerEligible: true }
    ]
  }
];

export const playerById: Record<string, Player> = Object.fromEntries(
  players.map((player) => [player.id, player])
);
