import MainLayout from "../layouts/MainLayout.jsx";
import RulesData from "../data/RulesData.js";

const Rules = () => {
  return (
    <MainLayout title="Rules">
      <section className="mb-5">
        <h3 className="fw-bold mb-3 border-bottom pb-2">
          World Cup Tournament Format
        </h3>

        <p className="text-muted lh-lg">
          The 2026 FIFA World Cup features 48 teams divided into 12 groups of 4, with a total of 104 games.
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
                <h5 className="fw-bold">Step 1 — Group Stage Predictions</h5>

                <ul className="mb-0 lh-lg text-muted">
                  <li>Predict the result of each group stage match</li>
                  <li>2 points per correct prediction</li>
                  <li>144 total points available</li>
                  <li>$200 prize for highest score</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="col-12 col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="fw-bold">Step 2 — Group Standings</h5>

                <ul className="mb-0 lh-lg text-muted">
                  <li>Select the top 2 teams from each group</li>
                  <li>Select the best 8 third-place teams that will advance</li>
                  <li>2 points awarded for each correct advancing team</li>
                  <li>Bonus 2 points for exact standings positions</li>
                  <li>128 total points available</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="col-12 col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="fw-bold">Step 3 — Knockout Stage</h5>

                <ul className="mb-0 lh-lg text-muted">
                  <li>Predict the knockout bracket</li>
                  <li>Round of 16: 2 pts per correct team</li>
                  <li>Quarter Finals: 4 pts per correct team</li>
                  <li>Semi Finals: 8 pts per correct team</li>
                  <li>Finalists: 10 pts each</li>
                  <li>Champion: 15 pts</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="col-12 col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="fw-bold">Step 4 — Total Goals Tiebreaker</h5>

                <ul className="mb-0 lh-lg text-muted">
                  <li>Predict the total goals scored in the tournament <b>without going over </b></li>
                  <li>Penalty shootout goals do not count</li>
                  <li>Tiebreaking purposes only, in the case where the top contestants are tied</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <h3 className="fw-bold mb-3 border-bottom pb-2">Entry Fee</h3>

        <p className="text-muted">
          Entry fee is $30 per submission with a target of 50 total entries.
        </p>
      </section>

      <section className="mb-5">
        <h3 className="fw-bold mb-3 border-bottom pb-2">Prize Allocation</h3>

        <p className="text-muted">
          Total projected prize pool is approximately $1500 depending on total
          entries received.
        </p>
      </section>
    </MainLayout>
  );
};

export default Rules;
