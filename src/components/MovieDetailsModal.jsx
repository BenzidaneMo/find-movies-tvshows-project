import { useEffect, useRef, useState } from 'react';
import { fetchMediaDetails, getBackdropUrl, getCertification, getPosterUrl } from '../services/tmdb';

const formatRuntime = (minutes) => {
  if (!minutes) return null;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

/**
 * Movie/TV details modal. Fetches full details for the given
 * {id, mediaType} from TMDB and renders them over the current page
 * without navigating away. Closes on ESC, backdrop click, or the close
 * button, and restores focus/scroll on close.
 */
const MovieDetailsModal = ({ id, mediaType, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const closeButtonRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  // Fetch details whenever the selected movie/show changes.
  useEffect(() => {
    let cancelled = false;
    setDetails(null);
    setError(null);
    setLoading(true);

    fetchMediaDetails(mediaType, id)
      .then((data) => {
        if (!cancelled) setDetails(data);
      })
      .catch(() => {
        if (!cancelled) setError('Unable to load details right now. Please try again later.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, mediaType]);

  // ESC to close, lock background scroll, and manage focus.
  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  const title = details?.title || details?.name;
  const originalTitle = details?.original_title || details?.original_name;
  const backdropUrl = getBackdropUrl(details?.backdrop_path, 'w1280');
  const posterUrl = getPosterUrl(details?.poster_path);
  const rating = details?.vote_average != null ? Math.round(details.vote_average * 10) / 10 : null;
  const releaseDate = details?.release_date || details?.first_air_date;
  const runtime = mediaType === 'movie' ? formatRuntime(details?.runtime) : null;
  const certification = details ? getCertification(details, mediaType) : null;
  const genres = details?.genres?.map((g) => g.name) || [];

  return (
    <div
      className="modal-backdrop"
      onMouseDown={handleBackdropClick}
      role="presentation"
    >
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Movie details'}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="modal-close"
        >
          &times;
        </button>

        {loading && (
          <div className="min-h-[300px] flex items-center justify-center text-white">
            Loading details...
          </div>
        )}

        {!loading && error && (
          <div className="min-h-[300px] flex items-center justify-center text-white text-center px-6">
            {error}
          </div>
        )}

        {!loading && !error && details && (
          <>
            <div
              className="modal-backdrop-image"
              style={backdropUrl ? { backgroundImage: `url(${backdropUrl})` } : undefined}
            >
              <div className="modal-backdrop-fade" />
            </div>

            <div className="modal-body">
              <img
                src={posterUrl || 'no-Poster.png'}
                alt={title}
                className="modal-poster"
              />

              <div className="modal-info">
                <h2 className="!text-2xl sm:!text-3xl text-left">{title}</h2>
                {originalTitle && originalTitle !== title && (
                  <p className="text-gray-100 text-sm mb-2">Original title: {originalTitle}</p>
                )}

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-100 text-sm my-3">
                  {rating != null && (
                    <span className="flex items-center gap-1 text-white font-bold">
                      <img src="star.svg" alt="rating" className="size-4" /> {rating}/10
                    </span>
                  )}
                  {releaseDate && <span>{releaseDate}</span>}
                  {runtime && <span>{runtime}</span>}
                  {mediaType === 'tv' && details.number_of_seasons != null && (
                    <span>
                      {details.number_of_seasons} season{details.number_of_seasons !== 1 ? 's' : ''}
                      {details.number_of_episodes != null && ` · ${details.number_of_episodes} episodes`}
                    </span>
                  )}
                  {certification && <span className="border border-gray-100/40 px-1.5 rounded">{certification}</span>}
                  {details.original_language && (
                    <span className="uppercase">{details.original_language}</span>
                  )}
                </div>

                {genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {genres.map((genre) => (
                      <span key={genre} className="text-xs bg-light-100/10 text-light-100 px-2 py-1 rounded-full">
                        {genre}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-gray-100 leading-relaxed">
                  {details.overview || 'No overview available.'}
                </p>

                {details.popularity != null && (
                  <p className="text-gray-100 text-xs mt-4">Popularity score: {Math.round(details.popularity)}</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsModal;
