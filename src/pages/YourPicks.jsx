import useYourPicks from "../hooks/useYourPicks.js";
import MainLayout from "../layouts/MainLayout.jsx";
import ReviewSection from "../components/Picks/Review/ReviewSection.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

const YourPicks = () => {
  const { picks, loading, error, steps, navigate } = useYourPicks();

  return (
    <MainLayout title="Your Picks">
      <div className="container mt-4">
        {loading && <LoadingSpinner />}

        {!loading && error && (
          <div className="d-flex justify-content-center align-items-center py-5 px-3">
            <div
              className="card border-0 shadow-sm text-center w-100"
              style={{ maxWidth: "440px" }}
            >
              <div className="card-body p-4 p-md-4">
                {/* <h4 className="fw-bold mb-2">No Picks Submitted Yet</h4> */}
                <h5 className="text-danger mb-4">{error}</h5>

                <button
                  className="btn btn-dark px-4"
                  onClick={() => navigate("/picks/groupStagePicks")}
                >
                  Make Your Picks
                </button>

                <div className="mt-4 pt-4 border-top small text-muted">
                  Picks close once the tournament begins on June 11, 2026.
                </div>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && picks && (
          <>
            {steps.map(
              ({ key, title, step }) =>
                picks[key] && (
                  <ReviewSection
                    key={key}
                    title={title}
                    items={picks[key]}
                    step={step}
                  />
                ),
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default YourPicks;
