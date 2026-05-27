import MainLayout from "../layouts/MainLayout.jsx";

const Rules = () => {
  return (
    <MainLayout title="Rules">
      <section className="mb-5">
        <h3 className="fw-bold mb-3 border-bottom pb-2">
          World Cup 2026 Tournament Format
        </h3>

        <p className="text-muted lh-lg">
          The 2026 FIFA World Cup features 48 teams divided into 12 groups of 4,
          with a total of 104 games.
        </p>
        <h6 className="fw-bold"> Matches</h6>
        <ul className="text-muted lh-lg">
          <li>72 Group stage matches</li>
          <li>32 Knockout stage matches</li>
        </ul>
        <h6 className="fw-bold"> Advancement</h6>

        <ul className="text-muted lh-lg">
          <li>Top 2 teams from each group automatically advance</li>
          <li>Best 8 third-place teams also advance</li>
          <li>32 teams enter the knockout stage</li>
          <li>Single-elimination bracket until a champion is crowned</li>
        </ul>
      </section>

      <section className="mb-5">
        <h3 className="fw-bold mb-4 border-bottom pb-2">Pool Structure</h3>

        <p className="text-muted mb-4">
          There are 4 steps to complete your pool entry. Each step awards points
          toward the overall leaderboard.
        </p>

        <div className="row g-4">
          {/* Step 1 */}
          <div className="col-12 col-md-6">
            <div className="card shadow-sm h-100 border-0">
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle bg-dark text-white fw-bold flex-shrink-0"
                    style={{
                      width: "40px",
                      height: "40px",
                      fontSize: "1.1rem",
                    }}
                  >
                    1
                  </div>
                  <h5 className="fw-bold mb-0">Group Stage Predictions</h5>
                </div>

                <p className="text-muted mb-2">
                  Predict the result for each group stage match.
                </p>
                <ul className="text-muted small lh-lg ps-3 mb-3">
                  <li>
                    Select your predicted winner under <strong>Home</strong> or{" "}
                    <strong>Away</strong>
                  </li>
                  <li>
                    Select <strong>Tie</strong> if you predict a draw
                  </li>
                </ul>

                <div className="rounded-3 bg-light p-3 mb-3">
                  <div
                    className="text-uppercase small fw-semibold text-muted mb-2"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    Points & Scoring
                  </div>
                  <div className="d-flex justify-content-between small py-1">
                    <span>Correct prediction</span>
                    <span className="fw-bold">2 pts</span>
                  </div>
                  <div className="d-flex justify-content-between small py-2 mt-1 border-top">
                    <span className="text-muted">Maximum available</span>
                    <span className="fw-bold">144 pts</span>
                  </div>
                </div>

                <div className="alert alert-warning border-0 py-2 px-3 mb-0 small">
                  <strong>$250 Bonus Prize</strong> for the highest Step 1
                  score. Ties split evenly.
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="col-12 col-md-6">
            <div className="card shadow-sm h-100 border-0">
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle bg-dark text-white fw-bold flex-shrink-0"
                    style={{
                      width: "40px",
                      height: "40px",
                      fontSize: "1.1rem",
                    }}
                  >
                    2
                  </div>
                  <h5 className="fw-bold mb-0">Group Standings</h5>
                </div>

                <p className="text-muted mb-2">
                  Predict the final standings for all 12 groups.
                </p>
                <ul className="text-muted small lh-lg ps-3 mb-3">
                  <li>Select the top 2 teams from each group</li>
                  <li>
                    Also select the <strong>8 best third-place teams</strong>{" "}
                    that will advance to the knockout stage
                  </li>
                </ul>

                <div className="rounded-3 bg-light p-3 mb-0">
                  <div
                    className="text-uppercase small fw-semibold text-muted mb-2"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    Points & Scoring
                  </div>

                  <div className="d-flex justify-content-between small py-1">
                    <span>Correct advancing team</span>
                    <span className="fw-bold">2 pts</span>
                  </div>
                  <div className="d-flex justify-content-between small py-1">
                    <span>
                      Correct standing of <strong>advancing</strong> team
                    </span>
                    <span className="fw-bold">2 pts</span>
                  </div>

                  <div className="d-flex justify-content-between small py-2 mt-1 border-top">
                    <span className="text-muted">Maximum available</span>
                    <span className="fw-bold">128 pts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="col-12 col-md-6">
            <div className="card shadow-sm h-100 border-0">
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle bg-dark text-white fw-bold flex-shrink-0"
                    style={{
                      width: "40px",
                      height: "40px",
                      fontSize: "1.1rem",
                    }}
                  >
                    3
                  </div>
                  <h5 className="fw-bold mb-0">Knockout Stage Bracket</h5>
                </div>

                <div className="alert alert-warning border-0 py-2 px-3 mb-3 small">
                  Teams selected in Step 2 will automatically populate the
                  bracket. Advancing third-place teams are positioned according
                  to official FIFA rules.
                </div>

                <p className="text-muted mb-2">
                  Predict the winning team throughout the knockout stage.
                </p>
                <ul className="text-muted small lh-lg ps-3 mb-3">
                  <li>
                    Select the team you predict will win in each match of the
                    bracket
                  </li>
                </ul>

                <div className="rounded-3 bg-light p-3 mb-0">
                  <div
                    className="text-uppercase small fw-semibold text-muted mb-2"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    Points & Scoring
                  </div>

                  {[
                    ["Round of 16", "2 pts"],
                    ["Quarter Finals", "4 pts"],
                    ["Semi Finals", "8 pts"],
                    ["Finalists", "10 pts"],
                    ["3rd Place Winner", "5 pts"],
                    ["World Cup Champion", "20 pts"],
                  ].map(([label, points]) => (
                    <div
                      key={label}
                      className="d-flex justify-content-between small py-1"
                    >
                      <span>{label}</span>
                      <span className="fw-bold">{points}</span>
                    </div>
                  ))}

                  <div className="d-flex justify-content-between small py-2 mt-1 border-top">
                    <span className="text-muted">Maximum available</span>
                    <span className="fw-bold">141 pts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="col-12 col-md-6">
            <div className="card shadow-sm h-100 border-0">
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle bg-dark text-white fw-bold flex-shrink-0"
                    style={{
                      width: "40px",
                      height: "40px",
                      fontSize: "1.1rem",
                    }}
                  >
                    4
                  </div>
                  <h5 className="fw-bold mb-0">Total Goals Tiebreaker</h5>
                </div>

                <div className="alert alert-warning border-0 py-2 px-3 mb-3 small">
                  Used in case there is a tie between contestants in contention
                  for a prize other than the Step 1 bonus
                </div>

                <p className="text-muted mb-2">
                  Predict the total number of goals scored during the
                  tournament.
                </p>
                <ul className="text-muted small lh-lg ps-3 mb-0">
                  <li>Enter your prediction in the provided box</li>
                  <li>
                    <strong>Closest without going over wins</strong>
                  </li>
                  <li>Penalty shootout goals do not count</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <h3 className="fw-bold mb-3 border-bottom pb-2">Entry Fee</h3>

        <p className="text-muted">
          Entry fee is <strong>$50</strong> per submission with a target of 50
          total entries.
        </p>
      </section>

      <section className="mb-5">
        <h3 className="fw-bold mb-3 border-bottom pb-2">Prize Allocation</h3>

        <div className="text-muted">
          <p className="mb-3">
            Total projected prize pool is approximately <strong>$2500</strong>{" "}
            depending on total entries received, and will be awarded as follows:
          </p>

          <div
            style={{
              width: "100%",
              maxWidth: "350px",
            }}
          >
            <div className="card shadow-sm border-0">
              <div className="card-body p-0">
                {[
                  ["1st place", "$700"],
                  ["2nd place", "$500"],
                  ["3rd place", "$400"],
                  ["4th place", "$300"],
                  ["5th place", "$200"],
                  ["6th place", "$100"],
                  ["7th place", "$50"],
                ].map(([place, prize], index) => (
                  <div
                    key={place}
                    className={`d-flex justify-content-between align-items-center px-3 py-3 ${
                      index !== 6 ? "border-bottom" : ""
                    }`}
                  >
                    <span className="fw-semibold">{place}</span>
                    <span className="text-success fw-bold">{prize}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="alert alert-warning mt-3 mb-0 py-2 shadow-sm d-flex justify-content-between align-items-center">
              <strong>Step 1 Winner Prize</strong>{" "}
              <span className="text-success fw-bold">$250</span>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Rules;
