import usePicks from "../../hooks/Picks/usePicks";
import PicksSubmittedCard from "../../components/Picks/PicksSubmittedCard";
import LoadingSpinner from "../../components/LoadingSpinner";

const Picks = () => {
  const {
    user,
    profile,
    loading,
    navigate,
    stepData,
    StepComponent,
    containerClass,
  } = usePicks();

  if (loading) return <LoadingSpinner />;
  if (!profile) return null;

  if (profile.picksSubmitted) {
    return (
      <PicksSubmittedCard
        title="Picks Already Submitted"
        message="You have already submitted your picks. No further changes can be
              made at this time."
        buttonText="View Your Picks"
        onButtonClick={() => navigate("/yourPicks")}
      />
    );
  }
  return (
    <div className={`${containerClass} py-5 mt-5`}>
      <div className="card text-center mb-3 shadow-sm p-4">
        <h3 className="mb-3">{stepData.title}</h3>
        <p className="text-muted mb-0 small">{stepData.subtitle}</p>
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
