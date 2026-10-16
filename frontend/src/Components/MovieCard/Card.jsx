import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import HoverCard from "./HoverCard";
import { usePlayer } from "../../Context/PlayerContext";
import styles from "./Card.module.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function Card({ movie }) {
  const { openTrailer } = usePlayer();
  const [rect, setRect] = useState(null); // where the card is on the screen
  const timer = useRef(null);

  // trending results have media_type; discover/tv and discover/movie don't.
  // movies have "title", TV shows have "name".
  const mediaType = movie.media_type || (movie.title ? "movie" : "tv");

  // landscape image (backdrop) fits a 16:9 thumbnail. Poster is only a fallback.
  const image = movie.backdrop_path || movie.poster_path;

  const handleEnter = (e) => {
    // measure NOW (e.currentTarget changes after the delay)
    const box = e.currentTarget.getBoundingClientRect();
    // small delay: moving the mouse quickly across the row shouldn't open popups
    timer.current = setTimeout(() => setRect(box), 350);
  };
  const handleLeave = () => clearTimeout(timer.current);

  // useCallback keeps the same function between renders (HoverCard's effects use it)
  const closeHover = useCallback(() => setRect(null), []);

  // clean up the timer if the card disappears
  useEffect(() => () => clearTimeout(timer.current), []);

  if (!image) return null;

  return (
    <div
      className={styles.cardWrapper}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={() => openTrailer({ ...movie, media_type: mediaType })}
    >
      <img
        className={styles.poster}
        src={`${IMAGE_BASE}${image}`}
        alt={movie.title || movie.name || "movie thumbnail"}
      />

      {/* A portal renders this OUTSIDE the slider (straight into <body>),
          so the slider's overflow:hidden can't clip it. */}
      {rect &&
        createPortal(
          <HoverCard
            movie={movie}
            mediaType={mediaType}
            rect={rect}
            onClose={closeHover}
          />,
          document.body
        )}
    </div>
  );
}

export default Card;
