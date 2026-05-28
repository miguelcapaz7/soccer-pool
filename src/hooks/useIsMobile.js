import { useState, useEffect } from "react";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (event) => setMatches(event.matches);
    setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
};

// Default 767.98px = below Bootstrap's `md` breakpoint (phones + small tablets,
// where the group columns are narrowest). Pass 575.98 for xs-only if you'd
// rather only abbreviate on the smallest screens.
export const useIsMobile = (maxWidth = 767.98) =>
  useMediaQuery(`(max-width: ${maxWidth}px)`);

export default useIsMobile;
