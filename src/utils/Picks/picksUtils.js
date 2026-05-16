import GroupStagePicks from "../../pages/Picks/GroupStage/GroupStagePicks";
import StandingsPicks from "../../pages/Picks/Standings/StandingsPicks";
import KnockoutStagePicks from "../../pages/Picks/KnockoutStage/KnockoutStagePicks";
import TotalGoalsPrediction from "../../pages/Picks/TotalGoalsPrediction/TotalGoalsPrediction";
import ReviewPicks from "../../pages/Picks/Review/ReviewPicks";

export const getPickSteps = () => {
  const pickSteps = {
    groupStagePicks: {
      component: GroupStagePicks,
      title: "STEP 1 - Group Stage",
      subtitle:
        "Predict the result of each group stage match by selecting the team or tie. 2 points for every correct prediction.",
      previous: null,
      next: "standingsPicks",
    },
    standingsPicks: {
      component: StandingsPicks,
      title: "STEP 2 - Group Standings",
      subtitle:
        "Drag & drop the teams within each table to predict the final group stage standings. 2 points for each correct advancing team, +2 bonus if the order is exact.",
      previous: "groupStagePicks",
      next: "knockoutStagePicks",
    },
    knockoutStagePicks: {
      component: KnockoutStagePicks,
      title: "STEP 3 - Knockout Stage Bracket",
      subtitle:
        "Complete the bracket with your predictions for the knockout stages",
      previous: "standingsPicks",
      next: "totalGoalsPrediction",
      wider: true,
    },
    totalGoalsPrediction: {
      component: TotalGoalsPrediction,
      title: "STEP 4 - Total Goals Tiebreaker",
      subtitle:
        "For tie breaker purpose only, predict the total amount of goals that \
          will be scored in the tournament (excluding shootout goals). Closest \
          without going over wins.",
      previous: "knockoutStagePicks",
      next: "reviewPicks",
    },
    reviewPicks: {
      component: ReviewPicks,
      title: "Review Picks",
      subtitle: "Please review all your picks.",
      previous: "totalGoalsPrediction",
      next: null,
    },
  };

  return pickSteps;
};
