import { useEffect, useState } from 'react';
import { fetchGenreMaps } from '../services/tmdb';

/**
 * Resolves genre ids to genre names for movies/TV shows. Returns empty
 * maps until the (cached, fetched-once) genre lists have loaded.
 */
export const useGenreMap = () => {
  const [genreMaps, setGenreMaps] = useState({ movie: {}, tv: {} });

  useEffect(() => {
    let mounted = true;
    fetchGenreMaps().then((maps) => {
      if (mounted) setGenreMaps(maps);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return genreMaps;
};

export const mapGenreIds = (genreMaps, mediaType, genreIds = []) =>
  genreIds
    .map((id) => genreMaps[mediaType]?.[id])
    .filter(Boolean);
