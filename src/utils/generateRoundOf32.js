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