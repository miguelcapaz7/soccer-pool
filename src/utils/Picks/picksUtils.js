import GroupStagePicks from "../../pages/Picks/GroupStage/GroupStagePicks";
import StandingsPicks from "../../pages/Picks/Standings/StandingsPicks";
import KnockoutStagePicks from "../../pages/Picks/KnockoutStage/KnockoutStagePicks";
import TotalGoalsPrediction from "../../pages/Picks/TotalGoalsPrediction/TotalGoalsPrediction";
import ReviewPicks from "../../pages/Picks/Review/ReviewPicks";

export const getPickSteps = () => {
  const pickSteps = {
    groupStagePicks: {
      component: GroupStagePicks,
      stepNumber: 1,
      title: "Group Stage",
      subtitle: "Select your predicted winner or tie for each group stage match. 2 points for every correct prediction.",
      previous: null,
      next: "standingsPicks",
    },
    standingsPicks: {
      component: StandingsPicks,
      stepNumber: 2,
      title: "Group Standings",
      subtitle: "Drag & drop the teams within each table to predict the group stage standings. 2 points for each correct advancing team, plus 2 bonus points for the correct standing of the advancing team.",
      previous: "groupStagePicks",
      next: "knockoutStagePicks",
    },
    knockoutStagePicks: {
      component: KnockoutStagePicks,
      stepNumber: 3,
      title: "Knockout Stage Bracket",
      subtitle: "Select the team you predict will win in each match of the bracket.",
      previous: "standingsPicks",
      next: "totalGoalsPrediction",
      wider: true,
    },
    totalGoalsPrediction: {
      component: TotalGoalsPrediction,
      stepNumber: 4,
      title: "Total Goals Tiebreaker",
      subtitle: "For tiebreaking purposes, enter your prediction for the total amount of goals scored in the tournament.",
      previous: "knockoutStagePicks",
      next: "reviewPicks",
    },
    reviewPicks: {
      component: ReviewPicks,
      isReview: true,
      title: "Review Your Picks",
      subtitle: "Once submitted, picks can't be changed.",
      previous: "totalGoalsPrediction",
      next: null,
    },
  };

  return pickSteps;
};