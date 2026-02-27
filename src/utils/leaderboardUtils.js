export const getRankedLeaders = (snap) => {
  if (snap.empty) return [];

  const rows = snap.docs.map((doc) => {
    const d = doc.data();

    const step1pts = d.step1pts || 0;
    const step2pts = d.step2pts || 0;
    const step3pts = d.step3pts || 0;
    const step4pts = d.step4pts || 0;

    const total = step1pts + step2pts + step3pts + step4pts;

    return {
      id: doc.id,
      name: d.name || "Unknown",
      winner: d.champion || "",
      step1pts,
      step2pts,
      step3pts,
      step4pts,
      total,
    };
  });

  rows.sort((a, b) => b.total - a.total);

  return rows.map((r, i) => ({
    ...r,
    placing: i + 1,
  }));
};