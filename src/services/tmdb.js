// Centralized TMDB API access: base config, fetch helpers, and small
// presentation helpers (image URLs, certification lookup) shared by
// components that need movie/TV data.

export const API_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const getPosterUrl = (path, size = 'w500') =>
  path ? `${IMAGE_BASE_URL}/${size}${path}` : null;

export const getBackdropUrl = (path, size = 'w500') =>
  path ? `${IMAGE_BASE_URL}/${size}${path}` : null;

/**
 * Fetches a page of popular movies from the /discover/movie endpoint.
 */
export const fetchDiscoverMovies = async (page = 1) => {
  const response = await fetch(
    `${API_URL}/discover/movie?sort_by=popularity.desc&include_adult=false&language=en-US&page=${page}`,
    API_OPTIONS
  );
  if (!response.ok) throw new Error('Failed to fetch discover movies');
  return response.json();
};

/**
 * Searches movies and TV shows via /search/multi.
 * Filters out non movie/tv results (e.g. "person") since the UI only
 * knows how to render movies and TV shows.
 */
export const searchMulti = async (query) => {
  const response = await fetch(
    `${API_URL}/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,
    API_OPTIONS
  );
  if (!response.ok) throw new Error('Failed to fetch searched movies');
  const data = await response.json();
  return {
    ...data,
    results: (data.results || []).filter(
      (item) => item.media_type === 'movie' || item.media_type === 'tv'
    ),
  };
};

/**
 * Fetches full details for a single movie or TV show, including
 * certification/rating info via append_to_response.
 */
export const fetchMediaDetails = async (mediaType, id) => {
  const appendToResponse =
    mediaType === 'tv' ? 'content_ratings,credits' : 'release_dates,credits';
  const response = await fetch(
    `${API_URL}/${mediaType}/${id}?language=en-US&append_to_response=${appendToResponse}`,
    API_OPTIONS
  );
  if (!response.ok) throw new Error('Failed to fetch media details');
  return response.json();
};

/**
 * Extracts a US content certification (e.g. "PG-13", "TV-MA") from a
 * details response fetched via fetchMediaDetails. Returns null when
 * unavailable rather than guessing.
 */
export const getCertification = (details, mediaType) => {
  try {
    if (mediaType === 'tv') {
      const us = details.content_ratings?.results?.find((r) => r.iso_3166_1 === 'US');
      return us?.rating || null;
    }
    const us = details.release_dates?.results?.find((r) => r.iso_3166_1 === 'US');
    const withCert = us?.release_dates?.find((rd) => rd.certification);
    return withCert?.certification || null;
  } catch {
    return null;
  }
};

let genreCachePromise = null;

/**
 * Fetches and caches the movie + TV genre id -> name maps (fetched once
 * per page load). Used to show real genre names instead of guessing.
 */
export const fetchGenreMaps = () => {
  if (genreCachePromise) return genreCachePromise;

  genreCachePromise = Promise.all([
    fetch(`${API_URL}/genre/movie/list?language=en-US`, API_OPTIONS).then((r) => r.json()),
    fetch(`${API_URL}/genre/tv/list?language=en-US`, API_OPTIONS).then((r) => r.json()),
  ])
    .then(([movieGenres, tvGenres]) => ({
      movie: Object.fromEntries((movieGenres.genres || []).map((g) => [g.id, g.name])),
      tv: Object.fromEntries((tvGenres.genres || []).map((g) => [g.id, g.name])),
    }))
    .catch(() => ({ movie: {}, tv: {} }));

  return genreCachePromise;
};
