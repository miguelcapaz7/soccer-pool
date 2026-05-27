export const steps = [
  {
    step: 1,
    title: "Group Stage",
    route: "/picks/groupStagePicks",
    getData: (data) => data.step1Picks,
  },
  {
    step: 2,
    title: "Group Standings",
    route: "/picks/standingsPicks",
    getData: (data) => data.step2Picks,
  },
  {
    step: 3,
    title: "Knockout Stage Bracket",
    route: "/picks/knockoutStagePicks",
    getData: (data) => data.step3Picks,
  },
  {
    step: 4,
    title: "Total Goals Prediction",
    route: "/picks/totalGoalsPrediction",
    getData: (data) => data.step4Picks,
  },
];
