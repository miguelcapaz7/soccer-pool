import React from "react";
import { useNavigate } from "react-router-dom";

const Step4 = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/step5");
  };

  return (
    <div className="container py-5 text-center">
      <h2>STEP 4 - Choose 3 players from any team in the tournament</h2>
      <p>3 pts will be awarded for each goal that player scores.</p>
      <button onClick={handleNext} className="btn btn-dark">
        Next
      </button>
    </div>
  );
};

export default Step4;