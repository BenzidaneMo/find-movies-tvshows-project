# Find Movies 🎥

[Find Movies](https://find-movies-tvshows-project.vercel.app/) is a React-based web application that allows users to discover trending movies, search for specific movies, and browse popular movies with pagination. The app fetches data from the TMDB (The Movie Database) API and provides an intuitive and responsive user interface.

---

## Features ✨

- **Trending Movies**: Displays the top 9 trending movies fetched from the Appwrite database.
- **Search Functionality**: Allows users to search for movies by title and view the results in a grid layout.
- **Search Tracking**: Tracks user searches and stores the first search result in the Appwrite database with a counter.
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
- **Appwrite**: Backend-as-a-service for managing search tracking and trending movies.

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
3. Create a .env file in the root directory and add your TMDB API key and Appwrite credentials:   
```
   VITE_TMDB_API_KEY=your_tmdb_api_key
   VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
   VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
   VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
```
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
- Displays the top 9 trending movies based on user searches.
- Fetches data from the Appwrite database and sorts movies by search count.
- Displays the trending movies in a responsive Swiper carousel.
4. **PopularMovies**
- Displays popular movies with pagination.
- Allows users to navigate between pages to view more movies.

---

## New Feature: Search Tracking and Trending Movies 📊

**How It Works:**

1. **Search Tracking:**

- When a user searches for a movie, the first result is stored in the Appwrite database along with a search count.
- If the movie already exists in the database, its search count is incremented.

2. **Trending Movies:**

- The app fetches data from the Appwrite database to retrieve the most searched movies.
- The top 9 movies with the highest search counts are displayed in the "Trending" section.

**Appwrite Integration:**

- **Database:** Stores search terms, movie details, and search counts.
- **API Functions:**
   - updateSearchCount: Updates the search count for a movie or creates a new entry if it doesn't exist.
   - getSearchCount: Fetches all movies and their search counts from the database.

---

## API Integration 🌐

The app uses the **TMDB API** and **Appwrite** for data fetching and storage. Below are the endpoints and functions used:

**TMDB API:**

1. **Discover Movies:**

- Endpoint: /discover/movie
- Parameters: sort_by=popularity.desc, include_adult=false, language=en-US, page

2. **Search Movies:**

- Endpoint: /search/movie
- Parameters: query, include_adult=false, language=en-US, page=1

**Appwrite Functions:**

1. **updateSearchCount:**

- Updates the search count for a movie in the Appwrite database.
- Creates a new entry if the movie doesn't exist.

2. **getSearchCount:**

- Fetches all movies and their search counts from the Appwrite database.
- Sorts movies by search count in descending order.

---

## How It Works ⚙️

1. **Trending Movies:**

- Fetched from the Appwrite database based on user searches.
- Displays the top 9 movies with the highest search counts.

2. **Search Functionality:**

- Fetches movies from the /search/movie endpoint based on the user's query.
- Tracks the first search result and updates the Appwrite database.

3. **Popular Movies with Pagination:**

- Fetches movies from the /discover/movie endpoint.
- Allows users to navigate between pages using "Next" and "Previous" buttons.

4. **Error Handling:**

- Displays toast notifications for errors like failed API requests or empty search results.

---

## Screenshot

![Screenshot](./public/localhost_ScreenShot.png)

---
## Folder Structure 📂
```
react-project/
├── public/                 # Public assets
├── src/
│   ├── components/         # React components
│   │   ├── Header.jsx
│   │   ├── SearchResults.jsx
│   │   ├── [TrendingMovies.jsx]
│   │   ├── PopularMovies.jsx
│   ├── [appwrite.js]                                    # Appwrite integration functions
│   ├── [App.jsx]                                        # Main app component
│   ├── index.css           # Global styles
│   └── main.jsx            # Entry point
├── .env                    # Environment variables
├── [package.json]                                       # Project dependencies
└── [README.md]                                          # Project documentation
```

---

## Acknowledgments 🙌

- TMDB API for providing movie data.
- Appwrite for backend services.
- React for the frontend framework.
- Tailwind CSS for styling.
- Swiper.js for the carousel functionality.
- React Toastify for toast notifications.
