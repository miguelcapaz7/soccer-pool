import React from "react";
import useReviewPicks from "../../../hooks/Picks/Review/useReviewPicks.js";
import ReviewSection from "../../../components/Picks/Review/ReviewSection.jsx";
import { steps } from "../../../utils/Picks/Review/reviewUtils.js";
import Button from "../../../components/Button.jsx";
import LoadingSpinner from "../../../components/LoadingSpinner.jsx";

const ReviewPicks = ({ user }) => {
  const { data, loading, errors, submitting, handleSubmit, navigate } = useReviewPicks(user);

  if (loading) return <LoadingSpinner />;

  return (
    <>
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

      {steps.map(({ step, title, route, getData }) => {
        const items = getData(data);

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
          disabled={errors.length > 0 || submitting}
          onClick={handleSubmit}
        >
          {submitting ? "Submitting..." : "Submit Final Picks"}
        </Button>
      </div>
    </>
  );
};

export default ReviewPicks;
