import useYourPicks from "../hooks/useYourPicks.js";
import MainLayout from "../layouts/MainLayout.jsx";
import ReviewSection from "../components/Picks/Review/ReviewSection.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

const YourPicks = () => {
  const { picks, loading, error, steps } = useYourPicks();

  return (
    <MainLayout title="Your Picks">
      <div className="container mt-4">
        {loading && (
          <LoadingSpinner />
        )}

        {!loading && error && (
          <div className="py-5 text-center text-danger">
            <p>{error}</p>
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
                )
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default YourPicks;
