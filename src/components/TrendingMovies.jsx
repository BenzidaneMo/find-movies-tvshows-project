import { useEffect, useRef, useState } from 'react';

const TrendingMovies = ({ discoverMovies }) => {
  // Ref to the list container for trending movies
  const trendingListRef = useRef(null);
  // State to track the current index of the movie being scrolled into view
  const [currentIndex, setCurrentIndex] = useState(0);

  /*
    useEffect to set up an interval for automatically updating the current index.
    This creates a carousel-like effect by cycling through the first 9 trending movies.
  */
  useEffect(() => {
    // Exit early if the list is not available or there are fewer than 9 movies
    if (!trendingListRef.current || discoverMovies.length < 9) {
      return;
    }

    // Set up an interval to update the current index every 3 seconds
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 9); // Loop back to the start after the 9th movie
    }, 3000); // Adjust the interval (in milliseconds) as needed

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [discoverMovies]);

  /*
    useEffect to scroll the currently active movie into view whenever the currentIndex changes.
    This ensures smooth scrolling behavior for the carousel effect.
  */
  useEffect(() => {
    // Ensure the list container and movies are available
    if (trendingListRef.current && discoverMovies.length >= 9) {
      const listItems = trendingListRef.current.children;

      // Scroll the current movie into view smoothly
      if (listItems && listItems.length > 0 && currentIndex < listItems.length) {
        listItems[currentIndex].scrollIntoView({
          behavior: 'smooth', // Smooth scrolling animation
          block: 'nearest',
          inline: 'start',
        });
      } else if (listItems && listItems.length > 0 && currentIndex === 0) {
        // If the currentIndex resets to 0, scroll back to the start instantly
        trendingListRef.current.scrollLeft = 0;
      }
    }
  }, [currentIndex, discoverMovies]);

  return (
    /* Section for displaying trending movies */
    <div className='trending'>
      {/* Trending section header */}
      <h2 className='mb-10'>Trending</h2>
      <ul
        ref={trendingListRef} // Attach the ref to the list container
        className='flex overflow-x-auto scroll-smooth list-none p-0 m-0'
      >
        {/* Loop through and render the first 9 trending movies */}
        {discoverMovies.slice(0, 9).map((movie, i) => (
          <li
            className='relative'
            key={movie.id} // Use movie ID as the unique key
          >
            {/* Display the movie's rank/index */}
            <p>{i + 1}</p>
            {/* Container for movie poster with hover effect */}
            <div className='relative rounded-md cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105'>
              {/* Movie poster image */}
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Fetch poster image from TMDB
                alt={movie.title} // Use movie title as alt text
                className='w-[108.66px] h-[163px]'
              />
              {/* Overlay div that appears on hover, showing the movie title */}
              <div
                className='absolute overflow-hidden top-0 text-clip w-[108.66px] h-[163px] -ml-3.5 cursor-pointer bg-black opacity-0 rounded-md hover:opacity-70 transition-opacity duration-300 ease-in-out text-white'
              >
                <h3 className='text-center my-12 text-sm'>{movie.title}</h3>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingMovies;