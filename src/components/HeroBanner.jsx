import Countdown from "./Countdown";
import Button from "./Button";
const HeroBanner = ({ onStartClick }) => {
  const PICKS_DEADLINE = new Date("2026-06-11T12:00:00-07:00");
  const entriesClosed = new Date() >= PICKS_DEADLINE;
  return (
    <div
      className="rounded-4 overflow-hidden mb-4 position-relative"
      style={{
        background:
          "linear-gradient(135deg, #0d1117 0%, #1a1f2e 50%, #0d1117 100%)",
        minHeight: "400px",
      }}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: `radial-gradient(circle at 15% 20%, rgba(220, 38, 38, 0.35) 0%, transparent 45%),
                        radial-gradient(circle at 85% 80%, rgba(0, 122, 61, 0.3) 0%, transparent 45%),
                        radial-gradient(circle at 50% 100%, rgba(255, 255, 255, 0.08) 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      <div className="position-relative p-4 p-md-4 text-center text-white">
        <div className="mb-3">
          <span
            className="badge text-uppercase fw-semibold"
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "white",
              letterSpacing: "0.1em",
              padding: "0.5rem 1rem",
              fontSize: "0.75rem",
            }}
          >
            June 11 to July 19, 2026
          </span>
        </div>

        <h1
          className="fw-bold mb-2"
          style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)" }}
        >
          FIFA World Cup 2026
        </h1>

        <div className="d-flex justify-content-center align-items-center gap-2 gap-md-3 mb-4 flex-wrap">
          <span className="d-flex align-items-center gap-2">
            <span style={{ fontSize: "1.5rem" }}>🇨🇦</span>
            <span className="small">Canada</span>
          </span>
          <span className="text-white-50">·</span>
          <span className="d-flex align-items-center gap-2">
            <span style={{ fontSize: "1.5rem" }}>🇺🇸</span>
            <span className="small">USA</span>
          </span>
          <span className="text-white-50">·</span>
          <span className="d-flex align-items-center gap-2">
            <span style={{ fontSize: "1.5rem" }}>🇲🇽</span>
            <span className="small">Mexico</span>
          </span>
        </div>
        {entriesClosed ? (
          <h4 className="fw-bold mb-4">The tournament has begun</h4>
        ) : (
          <div className="mb-4">
            <div
              className="text-uppercase small text-white-50 mb-3"
              style={{ letterSpacing: "0.1em" }}
            >
              Tournament begins in
            </div>
            <Countdown />
          </div>
        )}

        <Button
          onClick={onStartClick}
          color="light"
          className="px-4 py-2 fw-semibold"
          disabled={entriesClosed}
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default HeroBanner;
