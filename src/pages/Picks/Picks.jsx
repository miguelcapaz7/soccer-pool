import usePicks from "../../hooks/Picks/usePicks";
import PicksSubmittedCard from "../../components/Picks/PicksSubmittedCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import "../../assets/styles/Picks.css";

const Picks = () => {
  const {
    user,
    profile,
    loading,
    navigate,
    stepData,
    StepComponent,
    containerClass,
    totalSteps,
  } = usePicks();

  if (loading) return <LoadingSpinner />;
  if (!profile) return null;

  if (profile.picksSubmitted) {
    return (
      <PicksSubmittedCard
        title="Picks Submitted"
        message="You have submitted your picks. Good luck!"
        buttonText="View Your Picks"
        onButtonClick={() => navigate("/yourPicks")}
      />
    );
  }

  const { stepNumber, isReview, title, subtitle, previous, next } = stepData;
  const progressPct = isReview ? 100 : (stepNumber / totalSteps) * 100;

  return (
    <div
      className={`${containerClass} picks-page px-3 px-md-4 py-4 py-md-5 mt-4`}
    >
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4 text-center">
          <div
            className="text-uppercase small fw-semibold text-muted mb-3"
            style={{ letterSpacing: "0.08em" }}
          >
            {isReview ? "Final Review" : `Step ${stepNumber} of ${totalSteps}`}
          </div>

          <div
            className="progress mb-4"
            style={{ height: "6px", backgroundColor: "#f1f3f5" }}
          >
            <div
              className="progress-bar bg-dark"
              role="progressbar"
              style={{
                width: `${progressPct}%`,
                transition: "width 0.4s ease",
              }}
              aria-valuenow={progressPct}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>

          <h3 className="fw-bold mb-2">{title}</h3>
          <p className="text-muted mb-0 small">{subtitle}</p>
        </div>
      </div>

      <StepComponent user={user} />

      <div className="picks-nav mt-4 mt-md-5 d-flex gap-2 gap-md-3">
        {previous ? (
          <button
            className="btn btn-outline-dark flex-grow-1 flex-md-grow-0 px-md-4"
            onClick={() => navigate(`/picks/${previous}`)}
          >
            Back
          </button>
        ) : (
          <div className="flex-grow-1 flex-md-grow-0" />
        )}

        {next && (
          <button
            className="btn btn-dark flex-grow-1 flex-md-grow-0 ms-md-auto px-md-4"
            onClick={() => navigate(`/picks/${next}`)}
          >
            {isReview ? "Submit Picks" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Picks;
