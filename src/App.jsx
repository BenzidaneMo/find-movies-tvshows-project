import { useEffect, useRef, useState } from 'react'
import './App.css'
import Header from './components/Header'
import SearchResults from './components/SearchResults'
import TrendingMovies from './components/TrendingMovies'

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
  // State to trigger the search when the icon is clicked or Enter is pressed
  const [isSearchClicked, setIsSearchClicked] = useState(false)
  // Ref to the Search component's main div
  const searchRef = useRef(null)
  // Ref to the search results container
  const searchResultsRef = useRef(null)

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
    It calls the search endpoint whenever the `isSearchClicked` state changes to true.
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

    // Only fetch movies if the search query is not empty and the search icon is clicked
    if (searching && isSearchClicked) {
      fetchSearchedMovies()
    }
  }, [searching, isSearchClicked])

  // Event handler for search input changes, updates the `searching` state
  const handleSearching = (e) => {
    setSearching(e.target.value)
    // trigger search on every input change
    setIsSearchClicked(true)
  }

  const handleSearchIconClick = () => {
    setIsSearchClicked(true)
  }

  /*
    useEffect hook to handle clicks outside the search bar or search results.
    If a click occurs outside these elements, it resets the search state.
  */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
  // Reset search state when clicking outside
        setIsSearchClicked(false)
        setSearching('')
      }
    }

    // Add event listeners for mouse and touch events
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    // Cleanup event listeners when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isSearchClicked]) // Re-run effect if `isSearchClicked` changes

  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <Header
          handleSearching={handleSearching}
          searching={searching}
          handleSearchIconClick={handleSearchIconClick}
          searchRef={searchRef}
        />
        <body>
          <SearchResults
            searchedMovies={searchedMovies}
            searching={searching}
            isSearchClicked={isSearchClicked}
            searchResultsRef={searchResultsRef}
          />
          <TrendingMovies discoverMovies={discoverMovies} />
        </body>
      </div>
    </main>
  )
}

export default App