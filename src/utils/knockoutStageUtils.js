export const generateEmptyBracket = () => {
  return [
    Array(8).fill(["", ""]),
    Array(4).fill(["", ""]),
    Array(2).fill(["", ""]),
    Array(1).fill(["", ""]),
    [["", ""], ["", ""]],
    Array(1).fill(["", ""]),
    Array(2).fill(["", ""]),
    Array(4).fill(["", ""]),
    Array(8).fill(["", ""]),
  ];
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


export const matchIdMap = {
  // Left side
  "R32-M1": { colIndex: 0, matchupIndex: 0 },
  "R32-M2": { colIndex: 0, matchupIndex: 1 },
  "R32-M3": { colIndex: 0, matchupIndex: 2 },
  "R32-M4": { colIndex: 0, matchupIndex: 3 },
  "R32-M5": { colIndex: 0, matchupIndex: 4 },
  "R32-M6": { colIndex: 0, matchupIndex: 5 },
  "R32-M7": { colIndex: 0, matchupIndex: 6 },
  "R32-M8": { colIndex: 0, matchupIndex: 7 },
  "R16-M1": { colIndex: 1, matchupIndex: 0 },
  "R16-M2": { colIndex: 1, matchupIndex: 1 },
  "R16-M3": { colIndex: 1, matchupIndex: 2 },
  "R16-M4": { colIndex: 1, matchupIndex: 3 },
  "QF-M1": { colIndex: 2, matchupIndex: 0 },
  "QF-M2": { colIndex: 2, matchupIndex: 1 },
  "SF-M1": { colIndex: 3, matchupIndex: 0 },

  // Finals + 3rd Place
  "F": { colIndex: 4, matchupIndex: 0 },
  "3P": { colIndex: 4, matchupIndex: 1 },

  // Right side
  "SF-M2": { colIndex: 5, matchupIndex: 0 },
  "QF-M3": { colIndex: 6, matchupIndex: 0 },
  "QF-M4": { colIndex: 6, matchupIndex: 1 },
  "R16-M5": { colIndex: 7, matchupIndex: 0 },
  "R16-M6": { colIndex: 7, matchupIndex: 1 },
  "R16-M7": { colIndex: 7, matchupIndex: 2 },
  "R16-M8": { colIndex: 7, matchupIndex: 3 },
  "R32-M9": { colIndex: 8, matchupIndex: 0 },
  "R32-M10": { colIndex: 8, matchupIndex: 1 },
  "R32-M11": { colIndex: 8, matchupIndex: 2 },
  "R32-M12": { colIndex: 8, matchupIndex: 3 },
  "R32-M13": { colIndex: 8, matchupIndex: 4 },
  "R32-M14": { colIndex: 8, matchupIndex: 5 },
  "R32-M15": { colIndex: 8, matchupIndex: 6 },
  "R32-M16": { colIndex: 8, matchupIndex: 7 },

};
