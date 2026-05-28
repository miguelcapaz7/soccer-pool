const TotalGoalsBox = ({ title, prediction, error, handler }) => {
  return (
    <div className="d-flex justify-content-center px-3 py-4">
      <div
        className="card shadow-sm border-0 w-100"
        style={{ maxWidth: "480px" }}
      >
        <div className="card-body p-4 p-md-4">
          <label
            htmlFor="goalPrediction"
            className="form-label small text-uppercase fw-semibold text-muted"
            style={{ letterSpacing: "0.05em" }}
          >
            {title}
          </label>

          <div className="position-relative mb-2">
            <input
              id="goalPrediction"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className={`form-control form-control-lg text-center fw-bold ${
                error ? "is-invalid" : ""
              }`}
              placeholder="0"
              value={prediction}
              onChange={(e) => handler(e.target.value)}
              style={{ fontSize: "2rem", height: "80px" }}
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted small"
              style={{ pointerEvents: "none" }}
            >
              goals
            </span>
          </div>

          {{error} && (
            <div className="text-danger small mb-3">{error}</div>
          )}

          <div className="alert alert-warning border-0 py-2 px-3 mt-3 mb-0 small">
            <strong>Closest without going over</strong> wins. Penalty shootout
            goals don't count.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalGoalsBox;
