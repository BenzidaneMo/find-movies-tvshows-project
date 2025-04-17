# Find Movies 🎥

Find Movies is a React-based web application that allows users to discover trending movies, search for specific movies, and browse popular movies with pagination. The app fetches data from the TMDB (The Movie Database) API and provides an intuitive and responsive user interface.

---

## Features ✨

- **Trending Movies**: Displays the top 9 trending movies fetched from the TMDB API.
- **Search Functionality**: Allows users to search for movies by title and view the results in a grid layout.
- **Popular Movies with Pagination**: Browse through popular movies with the ability to navigate between pages.
- **Responsive Design**: Fully responsive layout optimized for all screen sizes.
- **Hover Effects**: Interactive hover effects to display additional movie details.
- **Error Handling**: Displays toast notifications for errors like failed API requests.

---

## Technologies Used 🛠️

- **React**: Frontend framework for building the user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Swiper.js**: For creating responsive carousels.
- **React Toastify**: For displaying toast notifications.
- **TMDB API**: For fetching movie data.

---

## Installation 🚀

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/find-movies.git
   cd find-movies
   ```
2. To install dependencies:
   ```bash
   npm install
    ```
3. Create a .env file in the root directory and add your TMDB API key:   
- TMDB_API_KEY=your-api-key
4. Start the development server:
    ```bash
    npm run dev
   ```
5. Open the app in your browser at http://localhost:5173.

---

## Components 🧩

1. **Header**
- Displays the app logo and a search bar for finding movies.
2. **SearchResults**
- Shows the search results in a grid layout.
- Displays up to 12 movies based on the search query.
3. **TrendingMovies**
- Displays the top 9 trending movies in a responsive Swiper carousel.
- Includes hover effects to show additional movie details.
4. **PopularMovies**
- Displays popular movies with pagination.
- Allows users to navigate between pages to view more movies.

---

## API Integration 🌐

The app uses the **TMDB API** to fetch movie data. Below are the endpoints used:

1. **Discover Movies:**

- Endpoint: /discover/movie
- Parameters: sort_by=popularity.desc, include_adult=false, language=en-US, page

2. **Search Movies:**

- Endpoint: /search/movie
- Parameters: query, include_adult=false, language=en-US, page=1

---

## How It Works ⚙️

1. **Trending Movies:**

- Fetched from the /discover/movie endpoint.
- Displays the first 9 movies from the first page.

2. **Search Functionality:**

- Fetches movies from the /search/movie endpoint based on the user's query.
- Results are displayed in a grid layout with hover effects.

3. **Popular Movies with Pagination:**

- Fetches movies from the /discover/movie endpoint.
- Allows users to navigate between pages using "Next" and "Previous" buttons.

4. **Error Handling:**

- Displays toast notifications for errors like failed API requests or empty search results.

---

## Screenshot

[Screenshot](./public/localhost_ScreenShot.png)

---
## Folder Structure 📂
```
react-project/
├── public/                 # Public assets
├── src/
│   ├── components/         # React components
│   │   ├── Header.jsx
│   │   ├── [SearchResults.jsx](http://_vscodecontentref_/0)
│   │   ├── [TrendingMovies.jsx](http://_vscodecontentref_/1)
│   │   ├── [PopularMovies.jsx](http://_vscodecontentref_/2)
│   ├── [App.jsx](http://_vscodecontentref_/3)             # Main app component
│   ├── index.css           # Global styles
│   └── main.jsx            # Entry point
├── .env                    # Environment variables
├── [package.json](http://_vscodecontentref_/4)            # Project dependencies
└── [README.md](http://_vscodecontentref_/5)               # Project documentation
```

---

## Acknowledgments 🙌

- TMDB API for providing movie data.
- React for the frontend framework.
- Tailwind CSS for styling.
- Swiper.js for the carousel functionality.
- React Toastify for toast notifications.