import { useEffect } from "react";
import { createPortal } from "react-dom";
import useTrailer from "../../Utility/useTrailer";
import styles from "./TrailerModal.module.css";

function TrailerModal({ movie, onClose }) {
  const mediaType = movie.media_type || (movie.title ? "movie" : "tv");
  const { key, loading } = useTrailer(movie.id, mediaType);
  const title = movie.title || movie.name || movie.original_name;

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    // stop the page behind the modal from scrolling
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      {/* stopPropagation: clicking the video must NOT close the modal */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Close">
          ✕
        </button>

        {loading && <p className={styles.message}>Loading trailer...</p>}

        {!loading && key && (
          <iframe
            className={styles.video}
            src={`https://www.youtube.com/embed/${key}?autoplay=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          />
        )}

        {!loading && !key && (
          <p className={styles.message}>No trailer is available for "{title}".</p>
        )}
      </div>

      {!loading && key && (
        <a
          className={styles.fallback}
          href={`https://www.youtube.com/watch?v=${key}`}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          Video not playing? Watch on YouTube
        </a>
      )}
    </div>,
    document.body
  );
}

export default TrailerModal;
