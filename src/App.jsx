import { useEffect, useState } from 'react'
import './App.css'
import Search from './component/Search'

// Base URL for TMDB API
const API_URL = 'https://api.themoviedb.org/3'
// API key loaded from environment variable
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

// Options used for all fetch requests, including headers for authorization
const APi_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    // Bearer token authorization using API key
    Authorization: `Bearer ${API_KEY}`
  }
}

function App() {
  // State to store the search query entered by the user
  const [searching, setSearching] = useState('')
  // State to store movies fetched from the discovery endpoint
  const [discoverMovies, setDiscoverMovies] = useState([])
  // State to store movies fetched from the search endpoint based on the search query
  const [searchedMovies, setSearchedMovies] = useState([])

  /*
    useEffect hook to fetch trending movies when the component mounts.
    It calls the discover endpoint to fetch a list of trending movies.
  */
  useEffect(() => {
    const fetchDiscoverMovies = async () => {
      try {
        // Fetch trending movies using the discover endpoint
        const response = await fetch(`${API_URL}/discover/movie?&include_adult=false&language=en-US&page=1`, APi_OPTIONS)
        const data = await response.json()

        // Update state with the fetched trending movies
        setDiscoverMovies(data.results)

        // Log the fetched movies for debugging purposes
        console.log(discoverMovies)
      } catch (error) {
        console.error('Error fetching discover movies:', error)
      }
    }
    fetchDiscoverMovies()
  }, [])

  /*
    useEffect hook to fetch movies based on the user's search query.
    It calls the search endpoint whenever the `searching` state changes.
  */
  useEffect(() => {
    const fetchSearchedMovies = async () => {
      try {
        // Fetch movies matching the search query using the search endpoint
        const search = await fetch(`${API_URL}/search/movie?query=${searching}&include_adult=false&language=ar-US&page=1`, APi_OPTIONS)
        const searchData = await search.json()

        // Update state with the fetched search results
        setSearchedMovies(searchData.results)
      } catch (error) {
        console.error('Error fetching searched movies:', error)
      }
    }

    // Only fetch movies if the search query is not empty
    if (searching) {
      fetchSearchedMovies()
    }
  }, [searching])

  // Event handler for search input changes, updates the `searching` state
  const handleSearching = (e) => {
    setSearching(e.target.value)
  }

  return (
    <main>
      {/* Background pattern element for styling */}
      <div className='pattern' />
      {/* Main wrapper for all content */}
      <div className='wrapper'>
        {/* Header section containing the logo, hero image, title, and search bar */}
        <header className='mb-30'>
          {/* Logo acts as a link to the home page */}
          <a href="/">
            <img src="logo.png" alt="logo" className='w-25 mb-10 cursor-pointer' />
          </a>
          {/* Hero image displayed below the logo */}
          <img src="hero.png" alt="img displaying movies" />
          {/* Main title with highlighted text */}
          <h1>
            Find <span className='text-gradient'>Movies</span> You&apos;ll Enjoy Without the Hassle
          </h1>
          {/* Search component that passes down the event handler and current search query */}
          <Search handleSearching={handleSearching} searching={searching} />
        </header>
        {/* Body section containing search results and trending movies */}
        <body>
          {/* Section for showing the search results */}
          <div className='searched Movie'>
            {/* Title showing the current search query if present */}
            <h2 className='mb-5'>
              {searching ? 'Search for : ' : ''} {searching}
            </h2>
            {/* Grid layout for search result movies */}
            <ul className='grid grid-cols-6 gap-4'>
              {/* Loop through and render up to the first 12 search result movies */}
              {searchedMovies.slice(0, 12).map((movie) => (
                <li
                  className='relative shadow-md cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105'
                  key={movie.id}
                >
                  {/* Render the movie poster only if a search query exists */}
                  {searching ? (
                    <div className='rounded-md'>
                      {/* Movie poster image with rounded corners */}
                      <img
                        className='rounded-md'
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                      />
                      {/* Overlay div that shows more details on hover */}
                      <div
                        className='absolute overflow-hidden text-clip top-0 w-full h-full bg-black opacity-0 rounded-md hover:opacity-70 transition-opacity duration-300 ease-in-out text-white p-3'
                      >
                        {/* Movie title displayed at the center */}
                        <h3 className='text-center font-bold text-lg my-4'>{movie.title}</h3>
                        {/* Movie overview text */}
                        <p className='text-sm overflow-hidden text-clip rtl:text-start' dir="rtl">
                          Overview: {movie.overview.length > 130 ? movie.overview.slice(0, 130) + '...' : movie.overview}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {/* Section for displaying trending movies */}
          <div className='trending'>
            {/* Trending section header */}
            <h2 className='mb-10'>Trending</h2>
            <ul>
              {/* Loop through and render up to the first 6 trending movies */}
              {discoverMovies.slice(0, 6).map((movie, i) => (
                <li className='relative' key={movie.id}>
                  {/* Display the movie's rank/index */}
                  <p>{i + 1}</p>
                  {/* Container for movie poster with hover effect */}
                  <div className='relative rounded-md cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105'>
                    {/* Movie poster image */}
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    {/* Overlay div that appears on hover, showing the movie title */}
                    <div
                      className='absolute overflow-hidden top-0 text-clip w-[108.66px] h-[163px] -ml-3.5 cursor-pointer bg-black opacity-0 rounded-md hover:opacity-60 transition-opacity duration-300 ease-in-out text-white'
                    >
                      <h3 className='text-center my-12'>{movie.title}</h3>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </body>
      </div>
    </main>
  )
}

export default App