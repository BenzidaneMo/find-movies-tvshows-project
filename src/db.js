import { createClient } from '@supabase/supabase-js';

const DB_MODE = import.meta.env.VITE_DB_MODE || 'local';
const LOCAL_API_URL = 'http://localhost:5000/api/movies';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

/**
 * Updates search count (Local Express PostgreSQL vs. Supabase)
 */
export const updateSearchCount = async (searchTerm, movie) => {
  if (!movie || !movie.id) return;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
  // TMDB /search/multi results always carry a reliable media_type ('movie' or 'tv').
  const mediaType = movie.media_type === 'tv' ? 'tv' : 'movie';

  // 1. PRODUCTION MODE: Supabase
  if (DB_MODE === 'supabase' && supabase) {
    try {
      const { data: existing } = await supabase
        .from('metrics')
        .select('count')
        .eq('movie_id', movie.id)
        .maybeSingle();

      const newCount = existing ? existing.count + 1 : 1;

      await supabase
        .from('metrics')
        .upsert(
          {
            movie_id: movie.id,
            movie_name: movie.title || movie.name,
            search_term: searchTerm,
            poster_url: posterUrl,
            media_type: mediaType,
            count: newCount,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'movie_id' }
        );
    } catch (error) {
      console.error('Supabase Error (Search):', error.message);
    }
    return;
  }

  // 2. LOCAL MODE: Local Express + PostgreSQL API Server
  try {
    await fetch(`${LOCAL_API_URL}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        movie_id: movie.id,
        movie_name: movie.title || movie.name,
        search_term: searchTerm,
        poster_url: posterUrl,
        media_type: mediaType,
      }),
    });
  } catch (error) {
    console.error('Local Express Error (Search):', error.message);
  }
};

/**
 * Fetches top 9 trending movies (Local Express PostgreSQL vs. Supabase)
 */
export const getTrendingMoviesBySearchCount = async () => {
  // 1. PRODUCTION MODE: Supabase
  if (DB_MODE === 'supabase' && supabase) {
    try {
      // media_type may not exist yet on tables created before it was added;
      // fall back to selecting without it rather than breaking trending.
      let { data, error } = await supabase
        .from('metrics')
        .select('movie_id, movie_name, search_term, count, poster_url, media_type')
        .order('count', { ascending: false })
        .limit(9);

      if (error) {
        ({ data, error } = await supabase
          .from('metrics')
          .select('movie_id, movie_name, search_term, count, poster_url')
          .order('count', { ascending: false })
          .limit(9));
      }

      if (error) throw error;
      return (data || []).map((row) => ({ media_type: 'movie', ...row }));
    } catch (error) {
      console.error('Supabase Error (Trending):', error.message);
      return [];
    }
  }

  // 2. LOCAL MODE: Local Express + PostgreSQL API Server
  try {
    const response = await fetch(`${LOCAL_API_URL}/trending`);
    if (!response.ok) throw new Error('Failed to fetch from local server');
    return await response.json();
  } catch (error) {
    console.error('Local Express Error (Trending):', error.message);
    return [];
  }
};