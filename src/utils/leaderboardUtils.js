export const getRankedLeaders = (snap) => {
  if (snap.empty) return [];

  const rows = snap.docs.map((doc) => {
    const d = doc.data();

    const step1pts = d.step1pts || 0;
    const step2pts = d.step2pts || 0;
    const step3pts = d.step3pts || 0;

    const total = step1pts + step2pts + step3pts

    return {
      id: doc.id,
      name: d.name || "Unknown",
      winner: d.champion || "",
      step1pts,
      step2pts,
      step3pts,
      total,
    };
  });

  rows.sort((a, b) => b.total - a.total);

  return rows.map((r, i) => ({
    ...r,
    placing: i + 1,
  }));
};

export const ROW_BG = {
  0: "#fff3cd", // gold
  1: "#f1f3f5", // silver
  2: "#f8e5d0", // bronze
  3: "#d0ebff", // sky
  4: "#e7f5ff", // sky lighter
  5: "#f1f9ff", // sky lightest
  6: "#f8fbfd", // barely there
};

export const PLACING_BADGE_CLASS = {
  1: "bg-warning text-dark",
  2: "bg-secondary",
  3: "bg-dark",
};

export const totalBadgeClass = (value) =>
  `rounded-pill px-2 py-1 fw-semibold ${
    PLACING_BADGE_CLASS[value] ?? "bg-warning text-dark border"
  }`;