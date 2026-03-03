import GroupStagePicks from "../../pages/Picks/GroupStage/GroupStagePicks";
import StandingsPicks from "../../pages/Picks/Standings/StandingsPicks";
import KnockoutStagePicks from "../../pages/Picks/KnockoutStage/KnockoutStagePicks";
import TopScorerPicks from "../../pages/Picks/TopScorers/TopScorerPicks";
import ReviewPicks from "../../pages/Picks/Review/ReviewPicks";

export const getPickSteps = () => {
  const pickSteps = {
    groupStagePicks: {
      component: GroupStagePicks,
      title: "STEP 1 - Predict the Winners of Each Match",
      subtitle: "2 points for every correct prediction.",
      previous: null,
      next: "standingsPicks",
    },
    standingsPicks: {
      component: StandingsPicks,
      title: "STEP 2 — Group Stage Predictions",
      subtitle:
        "Drag & drop to rank the top 2 in each group. 2 points for each correct team, +2 bonus if the order is exact.",
      previous: "groupStagePicks",
      next: "knockoutStagePicks",
    },
    knockoutStagePicks: {
      component: KnockoutStagePicks,
      title:
        "STEP 3 - Complete the bracket with your predictions for the knockout stages",
      subtitle: "Click a team to advance them.",
      previous: "standingsPicks",
      next: "topScorerPicks",
      wider: true,
    },
    topScorerPicks: {
      component: TopScorerPicks,
      title: "STEP 4 - Choose 3 players from any team in the tournament",
      subtitle: "3 pts will be awarded for each goal that player scores.",
      previous: "knockoutStagePicks",
      next: "reviewPicks",
    },
    reviewPicks: {
      component: ReviewPicks,
      title: "Review Picks",
      subtitle: "Please review all your picks.",
      previous: "topScorerPicks",
      next: null,
    },
  };

  return pickSteps
};
