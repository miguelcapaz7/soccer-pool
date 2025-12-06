export const constructData = {
  1: (data) =>
    Object.entries(data.step1Picks || {}).map(([matchId, pick]) => ({
      matchId,
      team1: pick.teams[0],
      team2: pick.teams[1],
      result: pick.result,
    })),

  2: (data) => {
    const step2 = data.step2Picks || {};
    const hasData =
      Array.isArray(step2.standings) || Array.isArray(step2.thirdPlaceOrder);

    if (!hasData) return null;

    return {
      standings: (step2.standings ?? []).map((group) => ({
        group: group?.group,
        topTwo: Array.isArray(group?.teams) ? group.teams.slice(0, 2) : [],
      })),
      thirdPlaceOrder: (step2.thirdPlaceOrder ?? []).slice(0, 8),
    };
  },

  3: (data) =>
    Object.entries(data.step3Picks || {}).map(
      ([matchId, pick]) => `${matchId}: ${pick}`
    ),

  4: (data) => (data.step4Picks || []).map((p) => `${p.player} (${p.team})`),

  5: (data) => data.step5Picks,
};

export const steps = [
  {
    step: 1,
    title: "Step 1: Group Stage Picks",
    route: "/groupStagePicks",
  },
  {
    step: 2,
    title: "Step 2: Standings Picks",
    route: "/standingsPicks",
  },
  {
    step: 3,
    title: "Step 3: Knockout Stage Picks",
    route: "/knockoutStagePicks",
  },
  {
    step: 4,
    title: "Step 4: Top Scorer Picks",
    route: "/topScorerPicks",
  },
  {
    step: 5,
    title: "Step 5: Goal Prediction",
    route: "/topScorerPicks",
  },
];
