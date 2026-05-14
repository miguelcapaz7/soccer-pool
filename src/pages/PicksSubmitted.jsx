import { NavLink } from "react-router-dom";
import usePicksSubmitted from "../hooks/usePicksSubmitted";

const PicksSubmitted = () => {
  const { user, profile, navigate } = usePicksSubmitted();

  if (!profile) return null;

  return (
    <div className="container text-center py-5 mt-5">
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h3 className="text-success mb-3">✅ Picks Submitted!</h3>
        <p className="mb-4">
          Your picks have been successfully submitted. Good luck!
        </p>

        <button className="btn btn-dark" onClick={() => navigate("/home")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PicksSubmitted;
