import { useEffect, useRef, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useDebounce } from 'react-use'
import Header from './components/Header'
import SearchResults from './components/SearchResults'
import TrendingMovies from './components/TrendingMovies'
import PopularMovies from './components/PopularMovies'
import { updateSearchCount, getTrendingMoviesBySearchCount } from './appwrite';

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
  const [searchTerm, setSearchTerm] = useState('')
  // State to store movies fetched from the discovery endpoint
  const [discoverMovies, setDiscoverMovies] = useState([])
  // State to store trending movies fetched from the discovery endpoint
  const [trendingMovies, setTrendingMovies] = useState([]); // Separate state for TrendingMovies
  // State to store movies fetched from the search endpoint based on the search query
  const [searchedMovies, setSearchedMovies] = useState([])
  // State to trigger the search when the icon is clicked or Enter is pressed
  const [isSearchClicked, setIsSearchClicked] = useState(false)
  // Ref to the Search component's main div
  const searchRef = useRef(null)
  // Ref to the search results container
  const searchResultsRef = useRef(null)
  // State to manage the current page of movies
  const [page, setPage] = useState(1); // Current page
  // State to store the total number of pages available
  const [totalPages, setTotalPages] = useState(1); // Total pages available
  // Limit to 30 pages or less for the UI
  const LimitPages = Math.min(30, totalPages);
  // State to store the search term after debouncing
  const [debouncedSearchTerm , setDebouncedSearchTerm] = useState('');
  // Debounce the search term to avoid excessive API calls
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])


  /*
    useEffect hook to fetch movies when the component mounts.
    It calls the discover endpoint to fetch a list of trending movies.
  */
  useEffect(() => {
    const fetchDiscoverMovies = async (page = 1) => {
      try {
        // Fetch trending movies using the discover endpoint
        const response = await fetch(`${API_URL}/discover/movie?sort_by=popularity.desc&include_adult=false&language=en-US&page=${page}}`, APi_OPTIONS)
        const data = await response.json()

        //console.log("the data : ",data)
        // Update state with the fetched trending movies
        setDiscoverMovies(data.results)
        setTotalPages(data.total_pages) // Update total pages state
        // Log the fetched movies for debugging purposes
        //console.log(discoverMovies)
        /*if (page === 1) {
          const trendingResponse = await fetch(`${API_URL}/trending/all/week?language=en-US`, APi_OPTIONS)
          const trendingData = await trendingResponse.json()
          console.log('Trending Movies:', trendingData.results)
          setTrendingMovies(trendingData.results.slice(0, 9)); // Store the first 9 trending movies and Tv Shows for TrendingMovies
        }*/
      } catch (error) {
        console.error('Error fetching discover movies:', error)
        // Display an error toast if fetching fails
        toast.error('Error fetching discover movies. Please try again later.')
      }
    }
    fetchDiscoverMovies(page)
  }, [page])

/*
    useEffect hook to fetch trending movies when the component mounts.
    It calls the getSearchCount function to fetch the search count data from the appwrite database.
*/
  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const searchCount = await getTrendingMoviesBySearchCount()

        setTrendingMovies(searchCount); // Store the first 9 trending movies and Tv Shows for TrendingMovies
      }
      catch (error) {
        console.error("Error getting trending movies from appwrite :", error)
      }
    }
    getTrendingMovies()
  }, [])
  console.log('Trending Movies:', trendingMovies)

  /*
    useEffect hook to fetch movies based on the user's search query.
    It calls the search endpoint whenever the `isSearchClicked` state changes to true.
  */
  useEffect(() => {
    const fetchSearchedMovies = async () => {
      try {
        // Fetch movies matching the search query using the search endpoint
        const search = await fetch(`${API_URL}/search/multi?query=${encodeURIComponent(debouncedSearchTerm)}&include_adult=false&language=en-US&page=1`, APi_OPTIONS)
        const searchData = await search.json()

        // Update state with the fetched search results
        setSearchedMovies(searchData.results)

        if (searchData.results.length > 0) {
          // Update the search count for the searched movie in the database
          await updateSearchCount(debouncedSearchTerm.trim(), searchData.results[0])
        }
      } catch (error) {
        console.error('Error fetching searched movies:', error)
        // Display an error toast if fetching fails
        toast.error('Error fetching searched movies. Please check your internet connection.')
      }
    }
    console.log('Searched Movies:', searchedMovies)

    // Only fetch movies if the search query is not empty and the search icon is clicked
    if (debouncedSearchTerm && debouncedSearchTerm.trim() !== '' && isSearchClicked) {
      fetchSearchedMovies()
    }
  }, [debouncedSearchTerm, isSearchClicked])

  
  // Event handler for search input changes, updates the `searching` state
  const handleSearching = (e) => {
    // trigger search on every input change
    setSearchTerm(e.target.value)
    if (e.target.value === '') {
      setIsSearchClicked(false)
    }
  }

  // Event handler for search icon click, sets the `isSearchClicked` state to true
  // This triggers the search effect to fetch movies based on the search query
  const handleSearchIconClick = () => {
    if(!searchTerm) {
      return
    }
    setIsSearchClicked(true)
  }

  /*
    useEffect hook to handle clicks outside the search bar or search results.
    If a click occurs outside these elements, it resets the search state.
  */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        // Check if the click is outside the search bar and search results
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        // Reset searched result state when clicking outside
        setIsSearchClicked(false)
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

  // Trigger a toast notification if discoverMovies is empty or undefined
  useEffect(() => {
    // Delay the toast for 1 seconds
    const timeout = setTimeout(() => {
      if (!discoverMovies || discoverMovies.length === 0) {
        toast.error('Error fetching trending movies. Please check your internet connection.');
      }
    }, 2000); // 2 seconds

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, [discoverMovies]);

  // Handle next page
  const handleNextPage = () => {
    if (page < LimitPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Handle previous page
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <main>
      <title>Find Movies{searchTerm && isSearchClicked ? ` | Searching For : ${searchTerm}`: ''}</title>
      <div className='pattern' />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="transparent" />
      <div className='wrapper'>
        <Header
          handleSearching={handleSearching}
          searchTerm={searchTerm}
          handleSearchIconClick={handleSearchIconClick}
          searchRef={searchRef}
        />
        <div>
          <SearchResults
            searchedMovies={searchedMovies}
            searchTerm={searchTerm}
            isSearchClicked={isSearchClicked}
            searchResultsRef={searchResultsRef}
          />
          <TrendingMovies trendingMovies={trendingMovies} />
          <PopularMovies 
          discoverMovies={discoverMovies} 
          page={page} 
          LimitPages={LimitPages} 
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          />
        </div>
      </div>
    </main>
  )
}

export default App