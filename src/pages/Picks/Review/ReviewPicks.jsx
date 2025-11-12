
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import useReviewPicks from "../../../hooks/Picks/Review/useReviewPicks";
import ReviewSection from "../../../components/Picks/Review/ReviewSection";
import MainLayout from "../../../layouts/MainLayout";
import Button from "../../../components/Button";

const ReviewPicks = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data, loading, errors } = useReviewPicks(user);

  if (loading) return <div className="text-center py-5">Loading...</div>;

  return (
    <MainLayout title="Review Your Picks">
      {errors.length > 0 && (
        <div className="alert alert-danger">
          <h5>Validation Errors:</h5>
          <ul>
            {errors.map((err, idx) => <li key={idx}>{err}</li>)}
          </ul>
        </div>
      )}

      <ReviewSection
        title="Step 1: Group Stage Picks"
        items={Object.entries(data.step1Picks || {}).map(([matchId, pick]) => `${matchId}: ${pick}`)}
        onEdit={() => navigate("/groupStagePicks")}
      />

      <ReviewSection
        title="Step 2: Standings Picks"
        items={(data.step2Picks || []).map(group => `${group.group}: ${group.teams.map(t => t.name || t).join(", ")}`)}
        onEdit={() => navigate("/standingsPicks")}
      />

      <ReviewSection
        title="Step 3: Knockout Bracket"
        items={(data.bracket || []).flat().map((match, idx) => `Match ${idx + 1}: ${match[0]} vs ${match[1]}`)}
        onEdit={() => navigate("/knockoutStagePicks")}
      />

      <ReviewSection
        title="Step 4: Top Scorer Picks"
        items={(data.topScorer || []).map((p, idx) => `Pick ${idx + 1}: ${p.player} (${p.team})`)}
        onEdit={() => navigate("/topScorerPicks")}
      />

      <ReviewSection
        title="Step 5: Goal Prediction"
        items={[`Predicted Total Goals: ${data.goalPrediction}`]}
        onEdit={() => navigate("/topScorerPicks")}
      />

      <div className="text-center mt-4">
        <Button
          color="success"
          disabled={errors.length > 0}
          onClick={() => alert("Final picks submitted!")}
        >
          Submit Final Picks
        </Button>
      </div>
    </MainLayout>
  );
};

export default ReviewPicks;
