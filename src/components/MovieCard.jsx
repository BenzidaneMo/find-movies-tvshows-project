import { getBackdropUrl, getPosterUrl } from '../services/tmdb';
import { mapGenreIds, useGenreMap } from '../hooks/useGenreMap';

/**
 * Reusable movie/TV card shared by PopularMovies, SearchResults and
 * TrendingMovies. `variant` controls layout to preserve each section's
 * existing look while centralizing image fallback + click-to-open-modal
 * behavior.
 */
const MovieCard = ({ movie, mediaType, variant = 'overlay', rank, onSelect }) => {
  const genreMaps = useGenreMap();

  const id = movie.id ?? movie.movie_id;
  const resolvedMediaType = mediaType || movie.media_type || 'movie';
  const title = movie.title || movie.name || movie.movie_name || 'Untitled';
  const overview = movie.overview;
  const year = (movie.release_date || movie.first_air_date || '').slice(0, 4);

  const handleClick = () => {
    if (id != null) onSelect?.(id, resolvedMediaType);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  if (variant === 'trending') {
    const posterUrl = movie.poster_url || getPosterUrl(movie.poster_path) || 'no-movie.png';
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className="relative flex rounded-md cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
      >
        <img
          src={posterUrl}
          alt={title}
          className="w-[108.66px] h-[163px] z-10 rounded-md object-cover -ml-3.5"
        />
        {rank != null && (
          <p className="rank-movies relative right-11/12 z-0 hidden lg:block">{rank}</p>
        )}
        <div className="absolute z-20 overflow-hidden top-0 text-clip w-[108.66px] h-[163px] -ml-3.5 cursor-pointer bg-black opacity-0 rounded-md hover:opacity-70 active:opacity-70 transition-opacity duration-300 ease-in-out text-white">
          <h3 className="text-center my-12 text-sm">{title}</h3>
        </div>
      </div>
    );
  }

  if (variant === 'grid') {
    const backdropUrl = getBackdropUrl(movie.backdrop_path);
    const rating = movie.vote_average != null ? Math.round(movie.vote_average * 10) / 10 : null;
    const genreNames = mapGenreIds(genreMaps, resolvedMediaType, movie.genre_ids).slice(0, 2);

    return (
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className="grid bg-[#0F0D23] rounded-md transition-transform duration-300 ease-in-out transform hover:scale-103 active:scale-95 cursor-pointer"
      >
        <img
          src={backdropUrl || 'no-Poster.png'}
          alt={title}
          className="p-4 rounded-[20px]"
        />
        <div className="p-4 pt-0">
          <h3 className="font-bold mb-2">{title}</h3>
          <div className="flex gap-1">
            <img src="star.svg" alt="rating" />
            <p className="font-bold">{rating != null ? rating : 'N/A'}</p>
            <p className="text-gray-100">
              {genreNames.length > 0 ? (
                genreNames.map((genre, i) => (
                  <span key={genre}>
                    {i > 0 && <span className="text-xs"> ● </span>}
                    {genre}
                  </span>
                ))
              ) : (
                <span className="capitalize">{resolvedMediaType}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // "overlay" variant (default) — poster with a hover overlay revealing details.
  const posterUrl = getPosterUrl(movie.poster_path);
  const rating = movie.vote_average != null ? Math.floor(movie.vote_average * 10) : null;

  return (
    <li
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="relative shadow-md cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
    >
      <div className="rounded-md">
        <img
          className="rounded-md"
          src={posterUrl || 'no-movie.png'}
          alt={title}
        />
        <div className="absolute overflow-hidden text-clip top-0 w-full h-full bg-black opacity-0 rounded-md hover:opacity-70 active:opacity-70 transition-opacity duration-300 ease-in-out text-white p-3">
          <h3 className="text-center font-bold text-lg my-4 max-sm:text-sm">{title}</h3>
          <p className="text-sm overflow-hidden text-clip max-sm:hidden">
            Overview: {overview && overview.length > 100 ? `${overview.slice(0, 100)}...` : overview || 'No overview available.'}
          </p>
          <br />
          <p className="text-sm float-end max-sm:hidden">
            {rating != null ? `Rating: ${rating}%` : ''}
          </p>
          {year && <p className="text-xs uppercase">{resolvedMediaType} · {year}</p>}
        </div>
      </div>
    </li>
  );
};

export default MovieCard;
