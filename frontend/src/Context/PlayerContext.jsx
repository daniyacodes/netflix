import { createContext, useCallback, useContext, useState } from "react";
import TrailerModal from "../Components/TrailerModal/TrailerModal";

// Context lets ANY component read shared data without passing props through
// every level (Banner, Card, HoverCard all need "open the trailer").
const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const openTrailer = useCallback((movie) => setSelectedMovie(movie), []);
  const closeTrailer = useCallback(() => setSelectedMovie(null), []);

  return (
    <PlayerContext.Provider value={{ openTrailer }}>
      {children}
      {selectedMovie && <TrailerModal movie={selectedMovie} onClose={closeTrailer} />}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside <PlayerProvider>");
  return ctx;
}
