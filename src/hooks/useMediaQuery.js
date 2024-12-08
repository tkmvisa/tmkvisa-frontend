import { useEffect, useState } from "react";

export function useMediaQuery(query) {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
        const media = window.matchMedia(query);
        const listener = () => setMatches(media.matches);

        // Attach listener
        media.addEventListener('change', listener);

        // Clean up listener on unmount
        return () => media.removeEventListener('change', listener);
    }, [query]);

    return matches;
}