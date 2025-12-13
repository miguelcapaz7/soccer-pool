export const steps = [
  {
    step: 1,
    title: "Step 1: Group Stage Picks",
    route: "/picks/groupStagePicks",
    getData: (data) => data.step1Picks,
  },
  {
    step: 2,
    title: "Step 2: Standings Picks",
    route: "/picks/standingsPicks",
    getData: (data) => data.step2Picks,
  },
  {
    step: 3,
    title: "Step 3: Knockout Stage Picks",
    route: "/picks/knockoutStagePicks",
    getData: (data) => data.step3Picks,
  },
  {
    step: 4,
    title: "Step 4: Top Scorer Picks",
    route: "/picks/topScorerPicks",
    getData: (data) => data.step4Picks,
  },
  {
    step: 5,
    title: "Step 5: Goal Prediction",
    route: "/picks/topScorerPicks",
    getData: (data) => data.step5Picks,
  },
];
