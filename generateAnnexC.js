import fs from "fs";

// const PRIORITY = {
//   E: ["A","B","C","D","F"],
//   I: ["C","D","F","G","H"],
//   A: ["C","E","F","H","I"],
//   L: ["E","H","I","J","K"],
//   D: ["B","E","F","I","J"],
//   G: ["A","E","H","I","J"],
//   B: ["E","F","G","I","J"],
//   K: ["D","E","I","J","L"],
// };

// const GROUPS = ["A","B","C","D","E","F","G","H","I","J","K","L"];

// // combinations nCk
// function combinations(arr, k, start = 0, prefix = [], res = []) {
//   if (prefix.length === k) {
//     res.push(prefix);
//     return res;
//   }
//   for (let i = start; i < arr.length; i++) {
//     combinations(arr, k, i + 1, [...prefix, arr[i]], res);
//   }
//   return res;
// }

// function generateAnnexC() {
//   const combos = combinations(GROUPS, 8);
//   const table = {};

//   for (const combo of combos) {
//     const key = combo.slice().sort().join("");
//     const remaining = [...combo];
//     const assignment = {};

//     for (const [winner, priority] of Object.entries(PRIORITY)) {
//       for (const g of priority) {
//         if (remaining.includes(g)) {
//           assignment[winner] = g;
//           remaining.splice(remaining.indexOf(g), 1);
//           break;
//         }
//       }
//     }

//     table[key] = assignment;
//   }

//   return table;
// }


// const annexC = generateAnnexC();
// fs.writeFileSync(
//   "fifaAnnexC.json",
//   JSON.stringify(annexC, null, 2),
//   "utf8"
// );
// console.log(Object.keys(annexC).length)

const WINNERS = ["E", "I", "A", "L", "D", "G", "B", "K"];

const THIRD_GROUPS = ["A","B","C","D","E","F","G","H","I","J","K","L"];

const ALLOWED = {
  E: ["A","B","C","D","F"],
  I: ["C","D","F","G","H"],
  A: ["C","E","F","H","I"],
  L: ["E","H","I","J","K"],
  D: ["B","E","F","I","J"],
  G: ["A","E","H","I","J"],
  B: ["E","F","G","I","J"],
  K: ["D","E","I","J","L"]
};

function combinations(arr, k, start = 0, prefix = [], result = []) {
  if (prefix.length === k) {
    result.push(prefix);
    return result;
  }

  for (let i = start; i <= arr.length - (k - prefix.length); i++) {
    combinations(arr, k, i + 1, [...prefix, arr[i]], result);
  }

  return result;
}

function solveMapping(winners, remainingThirds, mapping = {}) {
  // All winners assigned → valid solution
  if (winners.length === 0) return mapping;

  // Pick the most constrained winner first (important!)
  const winner = winners
    .map(w => ({
      w,
      options: ALLOWED[w].filter(g => remainingThirds.includes(g))
    }))
    .sort((a, b) => a.options.length - b.options.length)[0];

  // Dead branch → no solution
  if (winner.options.length === 0) return null;

  for (const g of winner.options) {
    const result = solveMapping(
      winners.filter(w => w !== winner.w),
      remainingThirds.filter(t => t !== g),
      { ...mapping, [winner.w]: g }
    );

    if (result) return result;
  }

  return null;
}

function generateAnnexC() {
  const annex = {};
  const combos = combinations(THIRD_GROUPS, 8);

  for (const combo of combos) {
    const key = combo.join("");
    const mapping = solveMapping(WINNERS, combo);

    if (!mapping) {
      throw new Error(`No valid mapping for combo ${key}`);
    }

    annex[key] = mapping;
  }

  return annex;
}

const annexC = generateAnnexC();

// Must be 495
console.log("Total combinations:", Object.keys(annexC).length);

// Validate each row
for (const [key, map] of Object.entries(annexC)) {
  if (Object.keys(map).length !== 8) {
    throw new Error(`Invalid row ${key}`);
  }

  const used = Object.values(map);
  if (new Set(used).size !== 8) {
    throw new Error(`Duplicate third-place group in ${key}`);
  }
}

console.log("Annex C generated successfully ✔️");
fs.writeFileSync(
  "fifaAnnexC.json",
  JSON.stringify(annexC, null, 2),
  "utf8"
);