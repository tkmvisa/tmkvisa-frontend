import { useEffect, useState } from "react";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if window is available (i.e., we're in the browser)
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query);
      const listener = () => setMatches(media.matches);

      // Set initial match
      setMatches(media.matches);

      // Attach listener
      media.addEventListener("change", listener);

      // Clean up listener on unmount
      return () => media.removeEventListener("change", listener);
    }
  }, [query]);

  return matches;
}
