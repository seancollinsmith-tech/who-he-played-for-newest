import { Team } from "@/lib/types";

/**
 * The 30 CURRENT franchise identities. These are the only cards shown in the
 * answer grid. Franchises that relocated or renamed keep their lineage via
 * `historicalNames`, so a career stop from e.g. "Seattle SuperSonics" still
 * resolves to the Oklahoma City Thunder card.
 */
export const teams: Team[] = [
  { id: "atl", franchiseId: "hawks-franchise", city: "Atlanta", name: "Hawks", abbreviation: "ATL", primaryColor: "#E03A3E", secondaryColor: "#112F54", displayOrder: 1 },
  { id: "bos", franchiseId: "celtics-franchise", city: "Boston", name: "Celtics", abbreviation: "BOS", primaryColor: "#1F7A45", secondaryColor: "#F4EBD5", displayOrder: 2 },
  {
    id: "bkn",
    franchiseId: "nets-franchise",
    city: "Brooklyn",
    name: "Nets",
    abbreviation: "BKN",
    primaryColor: "#112F54",
    secondaryColor: "#F4EBD5",
    displayOrder: 3,
    historicalNames: [
      { name: "New Jersey Nets", city: "New Jersey", firstSeason: "1977", lastSeason: "2012" }
    ]
  },
  {
    id: "cha",
    franchiseId: "hornets-franchise",
    city: "Charlotte",
    name: "Hornets",
    abbreviation: "CHA",
    primaryColor: "#00788C",
    secondaryColor: "#112F54",
    displayOrder: 4,
    historicalNames: [
      { name: "Charlotte Bobcats", city: "Charlotte", firstSeason: "2004", lastSeason: "2014" }
    ]
  },
  { id: "chi", franchiseId: "bulls-franchise", city: "Chicago", name: "Bulls", abbreviation: "CHI", primaryColor: "#BD2C2C", secondaryColor: "#112F54", displayOrder: 5 },
  { id: "cle", franchiseId: "cavaliers-franchise", city: "Cleveland", name: "Cavaliers", abbreviation: "CLE", primaryColor: "#860038", secondaryColor: "#FFBB33", displayOrder: 6 },
  { id: "dal", franchiseId: "mavericks-franchise", city: "Dallas", name: "Mavericks", abbreviation: "DAL", primaryColor: "#00538C", secondaryColor: "#112F54", displayOrder: 7 },
  { id: "den", franchiseId: "nuggets-franchise", city: "Denver", name: "Nuggets", abbreviation: "DEN", primaryColor: "#EE5A1F", secondaryColor: "#112F54", displayOrder: 8 },
  { id: "det", franchiseId: "pistons-franchise", city: "Detroit", name: "Pistons", abbreviation: "DET", primaryColor: "#BD2C2C", secondaryColor: "#112F54", displayOrder: 9 },
  { id: "gsw", franchiseId: "warriors-franchise", city: "Golden State", name: "Warriors", abbreviation: "GSW", primaryColor: "#FFBB33", secondaryColor: "#112F54", displayOrder: 10 },
  { id: "hou", franchiseId: "rockets-franchise", city: "Houston", name: "Rockets", abbreviation: "HOU", primaryColor: "#BD2C2C", secondaryColor: "#112F54", displayOrder: 11 },
  { id: "ind", franchiseId: "pacers-franchise", city: "Indiana", name: "Pacers", abbreviation: "IND", primaryColor: "#112F54", secondaryColor: "#FFBB33", displayOrder: 12 },
  { id: "lac", franchiseId: "clippers-franchise", city: "Los Angeles", name: "Clippers", abbreviation: "LAC", primaryColor: "#EE5A1F", secondaryColor: "#112F54", displayOrder: 13 },
  { id: "lal", franchiseId: "lakers-franchise", city: "Los Angeles", name: "Lakers", abbreviation: "LAL", primaryColor: "#552583", secondaryColor: "#FFBB33", displayOrder: 14 },
  { id: "mem", franchiseId: "grizzlies-franchise", city: "Memphis", name: "Grizzlies", abbreviation: "MEM", primaryColor: "#5D76A9", secondaryColor: "#112F54", displayOrder: 15 },
  { id: "mia", franchiseId: "heat-franchise", city: "Miami", name: "Heat", abbreviation: "MIA", primaryColor: "#BD2C2C", secondaryColor: "#FFBB33", displayOrder: 16 },
  { id: "mil", franchiseId: "bucks-franchise", city: "Milwaukee", name: "Bucks", abbreviation: "MIL", primaryColor: "#1F7A45", secondaryColor: "#FFBB33", displayOrder: 17 },
  { id: "min", franchiseId: "timberwolves-franchise", city: "Minnesota", name: "Timberwolves", abbreviation: "MIN", primaryColor: "#112F54", secondaryColor: "#1F7A45", displayOrder: 18 },
  {
    id: "nop",
    franchiseId: "pelicans-franchise",
    city: "New Orleans",
    name: "Pelicans",
    abbreviation: "NOP",
    primaryColor: "#112F54",
    secondaryColor: "#BD2C2C",
    displayOrder: 19,
    historicalNames: [
      { name: "New Orleans Hornets", city: "New Orleans", firstSeason: "2002", lastSeason: "2013" }
    ]
  },
  { id: "nyk", franchiseId: "knicks-franchise", city: "New York", name: "Knicks", abbreviation: "NYK", primaryColor: "#112F54", secondaryColor: "#EE5A1F", displayOrder: 20 },
  {
    id: "okc",
    franchiseId: "sonics-franchise",
    city: "Oklahoma City",
    name: "Thunder",
    abbreviation: "OKC",
    primaryColor: "#00538C",
    secondaryColor: "#EE5A1F",
    displayOrder: 21,
    historicalNames: [
      { name: "Seattle SuperSonics", city: "Seattle", firstSeason: "1967", lastSeason: "2008" }
    ]
  },
  { id: "orl", franchiseId: "magic-franchise", city: "Orlando", name: "Magic", abbreviation: "ORL", primaryColor: "#00538C", secondaryColor: "#112F54", displayOrder: 22 },
  { id: "phi", franchiseId: "sixers-franchise", city: "Philadelphia", name: "76ers", abbreviation: "PHI", primaryColor: "#00538C", secondaryColor: "#BD2C2C", displayOrder: 23 },
  { id: "phx", franchiseId: "suns-franchise", city: "Phoenix", name: "Suns", abbreviation: "PHX", primaryColor: "#EE5A1F", secondaryColor: "#552583", displayOrder: 24 },
  { id: "por", franchiseId: "blazers-franchise", city: "Portland", name: "Trail Blazers", abbreviation: "POR", primaryColor: "#BD2C2C", secondaryColor: "#112F54", displayOrder: 25 },
  { id: "sac", franchiseId: "kings-franchise", city: "Sacramento", name: "Kings", abbreviation: "SAC", primaryColor: "#5A2D81", secondaryColor: "#FFBB33", displayOrder: 26 },
  { id: "sas", franchiseId: "spurs-franchise", city: "San Antonio", name: "Spurs", abbreviation: "SAS", primaryColor: "#112F54", secondaryColor: "#7C7C7C", displayOrder: 27 },
  { id: "tor", franchiseId: "raptors-franchise", city: "Toronto", name: "Raptors", abbreviation: "TOR", primaryColor: "#BD2C2C", secondaryColor: "#112F54", displayOrder: 28 },
  { id: "uta", franchiseId: "jazz-franchise", city: "Utah", name: "Jazz", abbreviation: "UTA", primaryColor: "#112F54", secondaryColor: "#FFBB33", displayOrder: 29 },
  { id: "was", franchiseId: "wizards-franchise", city: "Washington", name: "Wizards", abbreviation: "WAS", primaryColor: "#112F54", secondaryColor: "#BD2C2C", displayOrder: 30 }
];

export const teamById: Record<string, Team> = Object.fromEntries(
  teams.map((team) => [team.id, team])
);

export const teamsInDisplayOrder = [...teams].sort(
  (a, b) => a.displayOrder - b.displayOrder
);
