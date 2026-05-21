import { NavLink } from "react-router-dom";
import usePicksSubmitted from "../hooks/usePicksSubmitted";
import PicksSubmittedCard from "../components/Picks/PicksSubmittedCard";
import LoadingSpinner from "../components/LoadingSpinner";

const PicksSubmitted = () => {
  const { user, profile, loading, navigate } = usePicksSubmitted();

  if (loading) return <LoadingSpinner />;
  if (!profile) return null;

  return (
    <PicksSubmittedCard
      title="Picks Submitted"
      message="Your picks have been successfully submitted. Good luck!"
      buttonText="Back to Home"
      onButtonClick={() => navigate("/home")}
    />
  );
};

export default PicksSubmitted;
