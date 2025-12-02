import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import useReviewPicks from "../../../hooks/Picks/Review/useReviewPicks.js";
import ReviewSection from "../../../components/Picks/Review/ReviewSection.jsx";
import Button from "../../../components/Button.jsx";

const ReviewPicks = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data, loading, errors, handleSubmit} = useReviewPicks(user);

  if (loading) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container py-5 mt-5">
      <div className="card mb-3 shadow-sm p-4 text-center">
        <h2>Review Picks</h2>
      </div>
      {errors.length > 0 && (
        <div className="alert alert-danger">
          <h5>Validation Errors:</h5>
          <ul>
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <ReviewSection
        title="Step 1: Group Stage Picks"
        items={Object.entries(data.step1Picks).map(([matchId, pick]) => ({
          matchId,
          team1: pick.teams[0],
          team2: pick.teams[1],
          result: pick.result,
        }))}
        onEdit={() => navigate("/groupStagePicks")}
        step={1}
      />

      <ReviewSection
        title="Step 2: Standings Picks"
        items={(() => {
          const step2 = data.step2Picks || {};

          const hasData =
            Array.isArray(step2.standings) ||
            Array.isArray(step2.thirdPlaceOrder);

          if (!hasData) return null;

          return {
            standings: (step2.standings ?? []).map((group) => ({
              group: group?.group,
              topTwo: Array.isArray(group?.teams)
                ? group.teams.slice(0, 2)
                : [],
            })),
            thirdPlaceOrder: (step2.thirdPlaceOrder ?? []).slice(0, 8),
          };
        })()}
        onEdit={() => navigate("/standingsPicks")}
        step={2}
      />

      <ReviewSection
        title="Step 3: Knockout Stage Picks"
        items={Object.entries(data.step3Picks).map(
          (match, idx) => `${match[0]}: ${match[1]}`
        )}
        onEdit={() => navigate("/knockoutStagePicks")}
      />

      <ReviewSection
        title="Step 4: Top Scorer Picks"
        items={data.step4Picks.map((p) => `${p.player} (${p.team})`)}
        onEdit={() => navigate("/topScorerPicks")}
      />

      <ReviewSection
        title="Step 5: Goal Prediction"
        items={data.step5Picks}
        onEdit={() => navigate("/topScorerPicks")}
        step={5}
      />

      <div className="text-center mt-4">
        <Button
          color="success"
          disabled={errors.length > 0}
          onClick={handleSubmit}
        >
          Submit Final Picks
        </Button>
      </div>
    </div>
  );
};

export default ReviewPicks;
