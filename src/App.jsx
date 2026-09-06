import { useEffect, useRef, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useDebounce } from 'react-use'
import Header from './components/Header'
import Footer from './components/Footer'
import SearchResults from './components/SearchResults'
import TrendingMovies from './components/TrendingMovies'
import PopularMovies from './components/PopularMovies'
import MovieDetailsModal from './components/MovieDetailsModal'
// *** SWAPPED APPWRITE FOR LOCAL POSTGRES DB SERVICE ***
import { updateSearchCount, getTrendingMoviesBySearchCount } from './db';
import { fetchDiscoverMovies, searchMulti } from './services/tmdb';

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
    const loadDiscoverMovies = async () => {
      try {
        const data = await fetchDiscoverMovies(page)
        // Update state with the fetched trending movies
        setDiscoverMovies(data.results)
        setTotalPages(data.total_pages) // Update total pages state
      } catch (error) {
        console.error('Error fetching discover movies:', error)
        // Display an error toast if fetching fails
        toast.error('Error fetching discover movies. Please try again later.')
      }
    }
    loadDiscoverMovies()
  }, [page])

/*
    useEffect hook to fetch trending movies when the component mounts.
    It calls the getSearchCount function to fetch the search count data from the backend.
*/
  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const searchCount = await getTrendingMoviesBySearchCount()

        setTrendingMovies(searchCount); // Store the first 9 trending movies and Tv Shows for TrendingMovies
      }
      catch (error) {
        console.error("Error getting trending movies:", error)
      }
    }
    getTrendingMovies()
  }, [])

  /*
    useEffect hook to fetch movies based on the user's search query.
    It calls the search endpoint whenever the `isSearchClicked` state changes to true.
  */
  useEffect(() => {
    const fetchSearchedMovies = async () => {
      try {
        // Fetch movies/TV shows matching the search query
        const searchData = await searchMulti(debouncedSearchTerm)

        // Update state with the fetched search results
        setSearchedMovies(searchData.results)

        if (searchData.results.length > 0) {
          // Update the search count for the searched movie in the database
          await updateSearchCount(debouncedSearchTerm.trim(), searchData.results[0])

          // Automatically refresh trending carousel with updated counts
          const updatedTrending = await getTrendingMoviesBySearchCount();
          setTrendingMovies(updatedTrending);
        }
      } catch (error) {
        console.error('Error fetching searched movies:', error)
        // Display an error toast if fetching fails
        toast.error('Error fetching searched movies. Please check your internet connection.')
      }
    }

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

  // State for the movie/TV show currently open in the details modal.
  // { id, mediaType } | null
  const [selectedMedia, setSelectedMedia] = useState(null)

  // Opens the details modal for a movie or TV show, regardless of which
  // section (Popular, Search Results, Trending) it was selected from.
  const handleSelectMovie = (id, mediaType) => {
    setSelectedMedia({ id, mediaType: mediaType || 'movie' })
  }

  const handleCloseMovieDetails = () => setSelectedMedia(null)

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
            onSelectMovie={handleSelectMovie}
          />
          <TrendingMovies trendingMovies={trendingMovies} onSelectMovie={handleSelectMovie} />
          <PopularMovies
          discoverMovies={discoverMovies}
          page={page}
          LimitPages={LimitPages}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          onSelectMovie={handleSelectMovie}
          />
        </div>
      </div>
      <Footer />
      {selectedMedia && (
        <MovieDetailsModal
          id={selectedMedia.id}
          mediaType={selectedMedia.mediaType}
          onClose={handleCloseMovieDetails}
        />
      )}
    </main>
  )
}

export default App