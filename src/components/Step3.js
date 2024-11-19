import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Step3.css';

const Step3 = ({ topTeams }) => {
  const navigate = useNavigate();
  
  // Assuming topTeams is coming as a prop from Step 2 (already filled with the top 2 teams from each group)
  const roundOf16 = topTeams || []; // Static array filled from Step 2
  
  const [quarterFinals, setQuarterFinals] = useState(Array(8).fill(null));
  const [semiFinals, setSemiFinals] = useState(Array(4).fill(null));
  const [finals, setFinals] = useState(Array(2).fill(null));
  const [thirdPlace, setThirdPlace] = useState(null);
  const [champion, setChampion] = useState(null);

  // Function to handle advancing a team to the next round
  const advanceTeam = (team, round, setNextRound) => {
    const nextRound = [...round];
    const firstEmptyIndex = nextRound.indexOf(null);
    if (firstEmptyIndex !== -1) {
      nextRound[firstEmptyIndex] = team;
      setNextRound(nextRound);
    }
  };

  return (
    <div className="step3-container">
      <h1>STEP 3 - Complete the bracket with your predictions for the knockout stages</h1>
      <div className="bracket">
        {/* Round of 16 */}
        <div className="round round-of-16">
          {roundOf16.length > 0 ? (
            roundOf16.map((team, index) => (
              <div key={index} className="team" onClick={() => advanceTeam(team, quarterFinals, setQuarterFinals)}>
                {team}
              </div>
            ))
          ) : (
            <p>No teams available for Round of 16</p>
          )}
        </div>

        {/* Quarter Finals */}
        <div className="round quarter-finals">
          {quarterFinals.map((team, index) => (
            <div key={index} className="team" onClick={() => advanceTeam(team, semiFinals, setSemiFinals)}>
              {team}
            </div>
          ))}
        </div>

        {/* Semi Finals */}
        <div className="round semi-finals">
          {semiFinals.map((team, index) => (
            <div key={index} className="team" onClick={() => advanceTeam(team, finals, setFinals)}>
              {team}
            </div>
          ))}
        </div>

        {/* Finals */}
        <div className="round finals">
          {finals.map((team, index) => (
            <div key={index} className="team" onClick={() => setChampion(team)}>
              {team}
            </div>
          ))}
        </div>

        {/* 3rd Place */}
        <div className="round third-place">
          <h3>3rd Place</h3>
          <div onClick={() => setThirdPlace(semiFinals[2])}>{semiFinals[2]}</div>
          <div onClick={() => setThirdPlace(semiFinals[3])}>{semiFinals[3]}</div>
        </div>

        {/* Champion */}
        <div className="champion">
          <h3>Champion</h3>
          {champion}
        </div>
      </div>

      <button onClick={() => navigate('/step4')} className="next-button">
        Submit
      </button>
    </div>
  );
};

export default Step3;
