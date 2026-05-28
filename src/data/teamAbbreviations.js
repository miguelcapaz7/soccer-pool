// Display-only lookup. Keyed by the exact team strings used in your group data
// and localStorage, so nothing about your existing structure needs to change.
// If a team isn't found here, getTeamLabel falls back to the full name.
export const TEAM_ABBREVIATIONS = {
  // Group A
  Mexico: "MEX",
  "South Africa": "RSA",
  "South Korea": "KOR",
  Czechia: "CZE",
  // Group B
  Canada: "CAN",
  Bosnia: "BIH",
  Qatar: "QAT",
  Switzerland: "SUI",
  // Group C
  Brazil: "BRA",
  Morocco: "MAR",
  Haiti: "HAI",
  Scotland: "SCO",
  // Group D
  USA: "USA",
  Paraguay: "PAR",
  Australia: "AUS",
  Turkey: "TUR",
  // Group E
  Germany: "GER",
  Curacao: "CUW",
  "Cote d'Ivoire": "CIV",
  Ecuador: "ECU",
  // Group F
  Netherlands: "NED",
  Japan: "JPN",
  Sweden: "SWE",
  Tunisia: "TUN",
  // Group G
  Belgium: "BEL",
  Egypt: "EGY",
  Iran: "IRN",
  "New Zealand": "NZL",
  // Group H
  Spain: "ESP",
  "Cape Verde": "CPV",
  "Saudi Arabia": "KSA",
  Uruguay: "URU",
  // Group I
  France: "FRA",
  Senegal: "SEN",
  Iraq: "IRQ",
  Norway: "NOR",
  // Group J
  Argentina: "ARG",
  Algeria: "ALG",
  Austria: "AUT",
  Jordan: "JOR",
  // Group K
  Portugal: "POR",
  "Congo DR": "COD",
  Uzbekistan: "UZB",
  Colombia: "COL",
  // Group L
  England: "ENG",
  Croatia: "CRO",
  Ghana: "GHA",
  Panama: "PAN",
};

export const getTeamLabel = (team, abbreviate = false) =>
  abbreviate ? TEAM_ABBREVIATIONS[team] ?? team : team;
