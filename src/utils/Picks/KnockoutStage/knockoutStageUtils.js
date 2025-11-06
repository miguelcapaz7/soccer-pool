import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export const generateBracketMap = () => {
  const stages = [
    { stage: "R32", numMatches: 16, cols: [0, 8] },
    { stage: "R16", numMatches: 8, cols: [1, 7]},
    { stage: "QF", numMatches: 4, cols: [2, 6] },
    { stage: "SF", numMatches: 2, cols: [3, 5] },
    { stage: "F", numMatches: 1, cols: [4] },
    { stage: "3P", numMatches: 1, cols: [4] },
  ];

  const map = {}; 

  stages.forEach(({ stage, numMatches, cols }) => {
    cols.forEach((colIndex, colIdx) => {
      const matchesPerCol = numMatches / cols.length;

      for (let i = 1; i <= matchesPerCol; i++) {
        const matchId =
          stage === "F" || stage === "3P"
            ? stage
            : `${stage}-M${colIdx * matchesPerCol + i}`;

        const matchupIndex =
          stage === "F" ? 0 :
          stage === "3P" ? 1 :
          i - 1;

        map[matchId] = {
          colIndex,
          matchupIndex,
          teams: ["", ""],
        };
      }
    });
  });

  return map;
};

export const convertBracketMapToColumns = (bracketMap) => {
  const totalCols = Math.max(...Object.values(bracketMap).map(m => m.colIndex)) + 1;
  const columns = Array.from({ length: totalCols }, () => []);
  Object.entries(bracketMap).forEach(([matchId, { colIndex, matchupIndex, teams }]) => {
    columns[colIndex][matchupIndex] = { matchId, teams: [...teams] };
  });
  return columns;
};

export const generateBracket = () => {
  const bracketMap = generateBracketMap();
  const bracketColumns = convertBracketMapToColumns(bracketMap);
  return { bracketMap, bracketColumns };
};

export const generateRoundOf32 = (step2Results) => {
  const getPlacing = (groupLetter, placing) => {
    const group = step2Results.find((g) => g.group === groupLetter);
    if (!group) return "";
    return placing === 1 ? group.first : placing === 2 ? group.second : group.third;
  };

  return [
    [getPlacing("A", 2), getPlacing("B", 2)],
    [getPlacing("E", 1), getPlacing("A", 3)],
    [getPlacing("F", 1), getPlacing("C", 2)],
    [getPlacing("C", 1), getPlacing("F", 2)],
    [getPlacing("I", 1), getPlacing("C", 3)],
    [getPlacing("E", 2), getPlacing("I", 2)],
    [getPlacing("A", 1), getPlacing("E", 3)],
    [getPlacing("L", 1), getPlacing("H", 3)],
    [getPlacing("D", 1), getPlacing("B", 3)],
    [getPlacing("G", 1), getPlacing("J", 3)],
    [getPlacing("K", 2), getPlacing("L", 2)],
    [getPlacing("H", 1), getPlacing("J", 2)],
    [getPlacing("B", 1), getPlacing("G", 3)],
    [getPlacing("J", 1), getPlacing("H", 2)],
    [getPlacing("K", 1), getPlacing("D", 3)],
    [getPlacing("D", 2), getPlacing("G", 2)],
  ];
};

export const getUserPicks = async (uid) => {
  const docRef = doc(db, "userPicks", uid);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? snapshot.data() : null;
};

export const updateStep3Picks = async (uid, updates) => {
  const docRef = doc(db, "userPicks", uid);
  await updateDoc(docRef, updates, { merge: true });
};

export const updateBracketWithR32 = (bracketMap, roundOf32, validTeams) => {
  const updatedMap = { ...bracketMap };
  for (let i = 1; i <= 16; i++) {
    const matchId = `R32-M${i}`;
    const pair = roundOf32[i - 1];
    if (updatedMap[matchId]) {
      updatedMap[matchId].teams = pair.map(team =>
        validTeams.has(team) ? team : ""
      );
    }
  }
  return updatedMap;
};