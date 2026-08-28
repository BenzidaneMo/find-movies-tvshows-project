const API_BASE_URL = 'http://localhost:5000/api/movies';

/**
 * Updates search count in local PostgreSQL.
 */
export const updateSearchCount = async (searchTerm, movie) => {
  if (!movie || !movie.id) {
    console.error("Error: 'movie' object or 'movie.id' is missing.");
    return;
  }

  try {
    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

    const response = await fetch(`${API_BASE_URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movie_id: movie.id,
        movie_name: movie.title || movie.name,
        search_term: searchTerm,
        poster_url: posterUrl,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Updated search count in local SQL:', data);
  } catch (error) {
    console.error('Error updating search count in local SQL:', error);
  }
};

/**
 * Fetches top 9 trending movies ordered by search count from local PostgreSQL.
 */
export const getTrendingMoviesBySearchCount = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/trending`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching trending movies from local SQL:', error);
    return [];
  }
};