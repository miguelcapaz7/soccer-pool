import { useParams, Navigate } from "react-router-dom";
import { useRef, useState } from "react";
import MarkGroupStage from "./Steps/MarkGroupStage";
import MarkStandings from "./Steps/MarkStandings";
import MarkKnockoutStage from "./Steps/MarkKnockoutStage";
import MarkTopScorers from "./Steps/MarkTopScorers";
import MarkTotalGoalsPrediction from "./Steps/MarkTotalGoalsPrediction";
import { useAuth } from "../../../context/AuthContext";

const PICK_STEPS = {
  groupStagePicks: {
    title: "Step 1 – Group Stage",
    component: MarkGroupStage,
  },
  standings: {
    title: "Step 2 – Standings",
    component: MarkStandings,
  },
  knockoutStagePicks: {
    title: "Step 3 – Knockout Stage",
    component: MarkKnockoutStage,
  },
  topScorerPicks: {
    title: "Step 4 – Top Scorer",
    component: MarkTopScorers,
  },
  totalGoalsPrediction: {
    title: "Step 5 – Total Goals",
    component: MarkTotalGoalsPrediction,
  },
};

const MarkPoolsStep = () => {
  const { user, profile } = useAuth();
  const { step } = useParams();
  const config = PICK_STEPS[step];

  const saveHandlerRef = useRef(null);
  const [isDirty, setIsDirty] = useState(false);

  const [saving, setSaving] = useState(false);

  if (!user || !profile) {
    return null;
  }

  if (profile.role !== "Admin") {
    return (
      <div className="container py-5 mt-5">
        <h5 className="text-center mt-4">
          You do not have permission to view this page
        </h5>
      </div>
    );
  }

  if (!config) {
    return <Navigate to="/admin/markPools" replace />;
  }

  const StepComponent = config.component;

  const handleSave = async () => {
    if (!saveHandlerRef.current) return;

    setSaving(true);
    await saveHandlerRef.current();
    setIsDirty(false);
    setSaving(false);
  };

  return (
    <div className="container py-5 mt-5">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h4 className="mb-0">{config.title}</h4>

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
