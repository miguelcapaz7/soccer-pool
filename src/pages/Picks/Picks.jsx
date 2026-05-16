import usePicks from "../../hooks/Picks/usePicks";

const Picks = () => {
  const { user, profile, navigate, stepData, StepComponent, containerClass } =
    usePicks();

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
