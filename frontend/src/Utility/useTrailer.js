import { useEffect, useState } from "react";
import movieInstance from "./MovieInstance";

// A module-level cache: it lives as long as the page is open and is shared by
// every component. Hovering the same movie twice will NOT hit the API twice.
const cache = new Map();

// Returns a Promise that resolves to a YouTube video key (or null if none).
export function getTrailerKey(id, mediaType) {
  const cacheKey = `${mediaType}-${id}`;

  if (!cache.has(cacheKey)) {
    const request = movieInstance
      .get(`/movies/${mediaType}/${id}/trailer`)
      .then((res) => {
        const videos = res.data.results || [];
        const youtube = videos.filter((v) => v.site === "YouTube");
        const best =
          youtube.find((v) => v.type === "Trailer") ||
          youtube.find((v) => v.type === "Teaser") ||
          youtube[0];
        return best ? best.key : null;
      })
      .catch((error) => {
        console.log(error);
        cache.delete(cacheKey); // allow a retry next time
        return null;
      });

    cache.set(cacheKey, request);
  }

  return cache.get(cacheKey);
}

// A custom hook = a function that starts with "use" and can use other hooks.
export default function useTrailer(id, mediaType) {
  const [state, setState] = useState({ key: null, loading: true });

  useEffect(() => {
    let cancelled = false; // don't set state if the component already went away

    getTrailerKey(id, mediaType).then((key) => {
      if (!cancelled) setState({ key, loading: false });
    });

    return () => {
      cancelled = true;
    };
  }, [id, mediaType]);

  return state; // { key, loading }
}
