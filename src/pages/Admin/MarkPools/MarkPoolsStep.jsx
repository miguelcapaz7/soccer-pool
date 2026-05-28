import { Navigate } from "react-router-dom";
import useMarkPoolsStep from "../../../hooks/Admin/MarkPools/useMarkPoolsStep";

const MarkPoolsStep = () => {
  const {
    config,
    saveHandlerRef,
    isDirty,
    setIsDirty,
    saving,
    StepComponent,
    handleSave,
  } = useMarkPoolsStep();

  if (!config) {
    return <Navigate to="/admin/markPools" replace />;
  }

  return (
    <div className="container py-5 mt-5">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h4 className="mb-0 fw-bold">{config.title}</h4>

        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={saving || !isDirty}
        >
          {saving ? "Saving..." : "Update Master Picks"}
        </button>
      </div>

      <StepComponent
        registerSave={(fn) => (saveHandlerRef.current = fn)}
        markDirty={() => setIsDirty(true)}
        isSaving={saving}
      />
    </div>
  );
};

export default MarkPoolsStep;
