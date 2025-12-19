import ANNEX_C from "../../../data/thirdPlaceCombos.json";

export const generateBracketMap = (() => {
  const stages = [
    { stage: "R32", numMatches: 16, cols: [0, 8] },
    { stage: "R16", numMatches: 8, cols: [1, 7] },
    { stage: "QF", numMatches: 4, cols: [2, 6] },
    { stage: "SF", numMatches: 2, cols: [3, 5] },
    { stage: "F", numMatches: 1, cols: [4] },
    { stage: "CHAMPION", numMatches: 1, cols: [4] },
    { stage: "3P", numMatches: 1, cols: [4] },
  ];

  const map = {};

  stages.forEach(({ stage, numMatches, cols }) => {
    cols.forEach((colIndex, colIdx) => {
      const matchesPerCol = numMatches / cols.length;
      for (let i = 1; i <= matchesPerCol; i++) {
        const matchId =
          stage === "F" || stage === "CHAMPION" || stage === "3P"
            ? stage
            : `${stage}-M${colIdx * matchesPerCol + i}`;
        const matchupIndex =
          stage === "F"
            ? 0
            : stage === "CHAMPION"
            ? 1
            : stage === "3P"
            ? 2
            : i - 1;
        map[matchId] = {
          colIndex,
          matchupIndex,
        };
      }
    });
  });

  return map;
})();

// Sets the teams to empty string in the list
export const generateEmptyTeamsMap = () => {
  const map = {};
  Object.keys(generateBracketMap).forEach((matchId) => {
    if (matchId === "CHAMPION") {
      map[matchId] = [""];
    } else {
      map[matchId] = ["", ""];
    }
  });
  map["3rdWinner"] = map["3rdWinner"] || [""];
  return map;
};

// Creates an object that maps columns to the match
export const convertTeamsToColumns = (teamsByMatchId) => {
  const totalCols =
    Math.max(...Object.values(generateBracketMap).map((m) => m.colIndex)) + 1;
  const columns = Array.from({ length: totalCols }, () => []);
  const thirdPlaceWinner = teamsByMatchId["3rdWinner"];
  Object.entries(generateBracketMap).forEach(([matchId, meta]) => {
    const { colIndex, matchupIndex } = meta;
    const teams =
      teamsByMatchId && teamsByMatchId[matchId]
        ? teamsByMatchId[matchId]
        : matchId === "CHAMPION"
        ? [""]
        : ["", ""];
    columns[colIndex][matchupIndex] = { matchId, teams };
  });
  columns.thirdPlaceWinner = thirdPlaceWinner;

  return columns;
};

export const generateRoundOf32 = (step2Results) => {
  if (!step2Results || !Array.isArray(step2Results.groups)) return [];
  const { groups, thirdPlace } = step2Results;

  const getPlacing = (groupLetter, placing) => {
    const group = groups.find((g) => g.group === groupLetter);
    if (!group) return "";
    if (placing === 1) return group.first;
    if (placing === 2) return group.second;
  };
  const thirdPlaceGroups = thirdPlace.map((t) => t.group).sort();
  const annexKey = thirdPlaceGroups.join("");

  const mapping = ANNEX_C[annexKey];
  if (!mapping) {
    console.error("Missing Annex C mapping for:", annexKey);
    return [];
  }

  // Map group -> team name
  const thirdPlaceByGroup = Object.fromEntries(
    thirdPlace.map((t) => [t.group, t.team])
  );

  // Resolve actual third-place teams for winners
  const third = (winnerGroup) => thirdPlaceByGroup[mapping[winnerGroup]] || "";

  return [
    [getPlacing("E", 1), third("E")],
    [getPlacing("I", 1), third("I")],
    [getPlacing("A", 2), getPlacing("B", 2)],
    [getPlacing("F", 1), getPlacing("C", 2)],

    [getPlacing("K", 2), getPlacing("L", 2)],
    [getPlacing("H", 1), getPlacing("J", 2)],
    [getPlacing("D", 1), third("D")],
    [getPlacing("G", 1), third("G")],

    [getPlacing("C", 1), getPlacing("F", 2)],
    [getPlacing("E", 2), getPlacing("I", 2)],
    [getPlacing("A", 1), third("A")],
    [getPlacing("L", 1), third("L")],

    [getPlacing("J", 1), getPlacing("H", 2)],
    [getPlacing("D", 2), getPlacing("G", 2)],
    [getPlacing("B", 1), third("B")],
    [getPlacing("K", 1), third("K")],
  ];
};

export const updateBracketWithR32 = (prevTeams, r32, validTeams) => {
  const updated = { ...prevTeams };
  for (let i = 1; i <= 16; i++) {
    const matchId = `R32-M${i}`;
    const pair = r32[i - 1];
    updated[matchId] = pair.map((t) => (validTeams.has(t) ? t : ""));
  }

  return updated;
};
