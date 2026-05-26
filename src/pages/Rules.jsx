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
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="fw-bold mb-3">
                  Step 1 — Group Stage Predictions
                </h5>

                <p className="text-muted mb-1">
                  Predict the result for each group stage match.
                </p>
                <ul className="mb-0 lh-lg text-muted small mb-2">
                  <li>
                    Select the team you predict will win under the{" "}
                    <strong>Home</strong> or <strong>Away</strong> column
                  </li>
                  <li>
                    Select <strong>Tie</strong> if you predict that match will
                    end in a draw
                  </li>
                </ul>

                <div className="border rounded-3 bg-light p-3 mb-3">
                  <div className="fw-semibold mb-2">Points & Scoring</div>

                  <div className="d-flex justify-content-between small py-1">
                    <span className="text-muted">Correct prediction</span>
                    <strong>2 pts</strong>
                  </div>

                  <div className="d-flex justify-content-between small py-1 border-top">
                    <span className="text-muted">Maximum points available</span>
                    <strong>144 pts</strong>
                  </div>
                </div>

                <div className="alert alert-warning py-2 px-3 mb-0 small">
                  <strong>$250 Bonus Prize:</strong> Awarded to the contestant
                  with the highest Step 1 score. In the event of a tie, the
                  prize will be divided evenly among tied contestants for this
                  step.
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="col-12 col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Step 2 — Group Standings</h5>
                <p className="text-muted mb-1">
                  Predict the final standings for all 12 groups.
                </p>

                <ul className="mb-0 lh-lg text-muted small mb-2">
                  <li>Select the top 2 teams from each group</li>
                  <li>
                    Also select the <strong>8 best third-place teams </strong>
                    that will advance to the knockout stage
                  </li>
                </ul>

                <div className="border rounded-3 bg-light p-3 mb-3">
                  <div className="fw-semibold mb-2">Points & Scoring</div>

                  <div className="d-flex justify-content-between small py-1">
                    <span className="text-muted">Correct advancing team</span>
                    <strong>2 pts</strong>
                  </div>
                  <div className="d-flex justify-content-between small py-1">
                    <span className="text-muted">
                      <b>[BONUS]</b> Correct standing of{" "}
                      <strong>advancing</strong> team
                    </span>
                    <strong>2 pts</strong>
                  </div>

                  <div className="d-flex justify-content-between small py-1 border-top">
                    <span className="text-muted">Maximum points available</span>
                    <strong>128 pts</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="col-12 col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="fw-bold mb-3">
                  Step 3 — Knockout Stage Bracket
                </h5>
                <div className="alert alert-warning py-2 px-3 mb-3 small">
                  <div>
                    Teams selected in Step 2 will automatically populate the
                    knockout stage bracket. Advancing third-place teams will be
                    positioned according to official FIFA tournament rules.
                  </div>
                </div>
                <p className="text-muted mb-1">
                  Predict the winning team throughout the knockout stage
                </p>
                <ul className="mb-0 lh-md text-muted small mb-2">
                  <li>
                    Complete the bracket by selecting the team you predict will
                    win in each match of the knockout stage
                  </li>
                </ul>

                <div className="border rounded-3 bg-light p-3 mb-3">
                  <div className="fw-semibold mb-2">Points & Scoring</div>

                  <div className="d-flex justify-content-between small py-1">
                    <span className="text-muted">Round of 16</span>
                    <strong>2 pts</strong>
                  </div>
                  <div className="d-flex justify-content-between small py-1">
                    <span className="text-muted">Quarter Finals</span>
                    <strong>4 pts</strong>
                  </div>
                  <div className="d-flex justify-content-between small py-1">
                    <span className="text-muted">Semi Finals</span>
                    <strong>8 pts</strong>
                  </div>
                  <div className="d-flex justify-content-between small py-1">
                    <span className="text-muted">Finalists</span>
                    <strong>10 pts</strong>
                  </div>
                  <div className="d-flex justify-content-between small py-1">
                    <span className="text-muted">3rd Place Winner</span>
                    <strong>5 pts</strong>
                  </div>
                  <div className="d-flex justify-content-between small py-1">
                    <span className="text-muted">World Cup Champion</span>
                    <strong>20 pts</strong>
                  </div>

                  <div className="d-flex justify-content-between small py-1 border-top">
                    <span className="text-muted">Maximum points available</span>
                    <strong>141 pts</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="col-12 col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="fw-bold mb-3">
                  Step 4 — Total Goals Tiebreaker
                </h5>
                <div className="alert alert-warning py-2 px-3 mb-3 small">
                  <div>
                    This step will be used in case there is a tie between
                    contestants in contention for a prize other than the step 1
                    prize.
                  </div>
                </div>
                <p className="text-muted mb-1">
                  Predict the total number of goals scored during the
                  tournament.{" "}
                </p>
                <ul className="mb-0 lh-lg text-muted small mb-2">
                  <li>Enter your total goals prediction in the provided box</li>
                  <li>
                    <strong>
                      Closest without going over will be the winner
                    </strong>
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
          Entry fee is $50 per submission with a target of 50 total entries.
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
