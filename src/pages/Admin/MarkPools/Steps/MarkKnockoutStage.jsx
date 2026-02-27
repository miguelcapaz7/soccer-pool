import useMarkKnockoutStage from "../../../../hooks/Admin/MarkPools/useMarkKnockoutStage";
import Bracket from "../../../../components/Picks/KnockoutStage/Bracket";
import LoadingSpinner from "../../../../components/LoadingSpinner";

const MarkKnockoutStage = (props) => {
  const { loading, bracketColumns, handleSelectTeam, resetMatch } =
    useMarkKnockoutStage(props);

  if (loading) return <LoadingSpinner />;

  return (
    <Bracket
      bracket={bracketColumns}
      handleSelectTeam={handleSelectTeam}
      resetMatch={resetMatch}
    />
  );
};

export default MarkKnockoutStage;