import { useState, useEffect } from "react";

const useCountdown = (targetDate) => {
  const calculate = () => {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      done: false,
    };
  };

  const [time, setTime] = useState(calculate());

  useEffect(() => {
    const timer = setInterval(() => setTime(calculate()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return time;
};

const Countdown = () => {
  const time = useCountdown("2026-06-11T12:00:00-07:00");

  if (time.done) return <h2 className="fw-bold">The tournament has begun</h2>;

  const blocks = [
    { value: time.days, label: "Days" },
    { value: time.hours, label: "Hours" },
    { value: time.minutes, label: "Minutes" },
    { value: time.seconds, label: "Seconds" },
  ];

  return (
    <div className="d-flex gap-2 gap-md-3 justify-content-center">
      {blocks.map(({ value, label }) => (
        <div
          key={label}
          className="text-center rounded-3 px-2 px-md-4 py-2 py-md-3"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(4px)",
            minWidth: "70px",
          }}
        >
          <div
            className="fw-bold text-white"
            style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)", fontVariantNumeric: "tabular-nums" }}
          >
            {String(value).padStart(2, "0")}
          </div>
          <div
            className="text-white-50 text-uppercase small"
            style={{ letterSpacing: "0.05em", fontSize: "0.7rem" }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Countdown;