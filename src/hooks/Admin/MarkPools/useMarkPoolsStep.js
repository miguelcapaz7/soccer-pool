import { useParams } from "react-router-dom";
import { useRef, useState } from "react";
import MarkGroupStage from "../../../pages/Admin/MarkPools/Steps/MarkGroupStage";
import MarkStandings from "../../../pages/Admin/MarkPools/Steps/MarkStandings";
import MarkKnockoutStage from "../../../pages/Admin/MarkPools/Steps/MarkKnockoutStage";
import MarkTotalGoalsPrediction from "../../../pages/Admin/MarkPools/Steps/MarkTotalGoalsPrediction";

const useMarkPoolsStep = () => {
  const pickSteps = {
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
    totalGoalsPrediction: {
      title: "Step 4 – Total Goals",
      component: MarkTotalGoalsPrediction,
    },
  };
  const { step } = useParams();
  const config = pickSteps[step];

  const saveHandlerRef = useRef(null);
  const [isDirty, setIsDirty] = useState(false);

  const [saving, setSaving] = useState(false);
  const StepComponent = config.component;

  const handleSave = async () => {
    if (!saveHandlerRef.current) return;

    setSaving(true);
    await saveHandlerRef.current();
    setIsDirty(false);
    setSaving(false);
  };

  return {
    config,
    saveHandlerRef,
    isDirty,
    setIsDirty,
    saving,
    StepComponent,
    handleSave,
  };
};

export default useMarkPoolsStep;
