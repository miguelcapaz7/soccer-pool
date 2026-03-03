import useViewPool from "../../../hooks/Admin/Users/ViewPool/useViewPool";
import MainLayout from "../../../layouts/MainLayout";
import ReviewSection from "../../../components/Picks/Review/ReviewSection";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ViewPool = () => {
  const { user, profile, picks, loading, error } = useViewPool();

  const steps = [
    { key: "step1Picks", title: "Step 1", step: 1 },
    { key: "step2Picks", title: "Step 2", step: 2 },
    { key: "step3Picks", title: "Step 3", step: 3 },
    { key: "step4Picks", title: "Step 4", step: 4 },
    { key: "step5Picks", title: "Step 5", step: 5 },
  ];

  if (!user || !profile) return null;
  if (profile.role !== "Admin")
    return (
      <div className="container py-5 mt-5">
        <h5 className="text-center mt-4">
          You do not have permission to view this page
        </h5>
      </div>
    );

  return (
    <MainLayout title="View User Pool">
      <div className="container mt-4">
        {loading && <LoadingSpinner />}

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

export default ViewPool;
