const StatStrip = () => {
  const stats = [
    { value: "48", label: "Teams" },
    { value: "16", label: "Host Cities" },
    { value: "104", label: "Matches" },
    { value: "12", label: "Groups" },
  ];

  return (
    <div className="row g-3 mb-4">
      {stats.map(({ value, label }) => (
        <div className="col-6 col-md-3" key={label}>
          <div className="card border-0 shadow-sm text-center py-3">
            <div className="fw-bold" style={{ fontSize: "1.75rem" }}>
              {value}
            </div>
            <div
              className="text-uppercase small text-muted"
              style={{ letterSpacing: "0.05em", fontSize: "0.75rem" }}
            >
              {label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatStrip;