import GroupStagePicks from "./GroupStage/GroupStagePicks";
import StandingsPicks from "./Standings/StandingsPicks";
import KnockoutStagePicks from "./KnockoutStage/KnockoutStagePicks";
import TopScorerPicks from "./TopScorers/TopScorerPicks";
import ReviewPicks from "./Review/ReviewPicks";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PICK_STEPS = {
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

const Picks = () => {
  const { step } = useParams();
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const stepData = PICK_STEPS[step];
  const StepComponent = stepData.component;

  const containerClass = stepData.wider
    ? "page-container"
    : "container";

  window.scroll(0, 0);

  if (!profile) return null;

  if (profile.picksSubmitted) {
    return (
      <div className="container text-center py-5 mt-5">
        <h2>You have already submitted your picks.</h2>
      </div>
    );
  }
  return (
    <div className={`${containerClass} py-5 mt-5`}>
      <div className="card text-center mb-3 shadow-sm p-4">
        <h2 className="mb-3">{stepData.title}</h2>
        <p className="text-muted mb-0">{stepData.subtitle}</p>
      </div>

      <StepComponent user={user} />

      <div className="mt-4 d-flex justify-content-around">
        {stepData.previous && (
          <button
            className="btn btn-dark"
            onClick={() => navigate(`/picks/${stepData.previous}`)}
          >
            Back
          </button>
        )}
        {stepData.next && (
          <button
            className="btn btn-dark"
            onClick={() => navigate(`/picks/${stepData.next}`)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Picks;
