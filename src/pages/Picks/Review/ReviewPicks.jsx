import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import useReviewPicks from "../../../hooks/Picks/Review/useReviewPicks.js";
import ReviewSection from "../../../components/Picks/Review/ReviewSection.jsx";
import {
  constructData,
  steps,
} from "../../../utils/Picks/Review/reviewUtils.js";
import Button from "../../../components/Button.jsx";

const ReviewPicks = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { data, loading, errors, handleSubmit } = useReviewPicks(user);

  if (loading) return <div className="text-center py-5">Loading...</div>;

  if (!profile) return null;

  if (profile.picksSubmitted) {
    return (
      <div className="container text-center py-5 mt-5">
        <h2>You have already submitted your picks.</h2>
      </div>
    )
  }

  return (
    <div className="container py-5 mt-5">
      <div className="card mb-3 shadow-sm p-4 text-center">
        <h2>Review Picks</h2>
      </div>
      {errors.length > 0 && (
        <div className="alert alert-danger">
          <h5>Incomplete Picks:</h5>
          <ul>
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {steps.map(({ step, title, route }) => {
        const items = constructData[step](data);

        return (
          <ReviewSection
            key={step}
            title={title}
            items={items}
            onEdit={() => navigate(route)}
            step={step}
          />
        );
      })}

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
