const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// GET: Fetch top 9 trending movies
app.get('/api/movies/trending', async (req, res) => {
  try {
    const query = `
      SELECT movie_id, movie_name, search_term, count, poster_url, COALESCE(media_type, 'movie') AS media_type
      FROM metrics
      ORDER BY count DESC
      LIMIT 9;
    `;
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (err) {
    console.error('SQL Error:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// POST: Upsert search term and increment count
app.post('/api/movies/search', async (req, res) => {
  const { movie_id, movie_name, search_term, poster_url, media_type } = req.body;

  try {
    const upsertQuery = `
      INSERT INTO metrics (movie_id, movie_name, search_term, poster_url, media_type, count)
      VALUES ($1, $2, $3, $4, COALESCE($5, 'movie'), 1)
      ON CONFLICT (movie_id, media_type)
      DO UPDATE SET
        count = metrics.count + 1,
        search_term = EXCLUDED.search_term,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *;
    `;

    const values = [movie_id, movie_name, search_term, poster_url, media_type];
    const { rows } = await pool.query(upsertQuery, values);
    res.json(rows[0]);
  } catch (err) {
    console.error('SQL Error:', err.message);
    res.status(500).json({ error: 'Failed to update search count' });
  }
});

app.listen(5000, () => console.log('Local SQL server running on http://localhost:5000'));