import { useEffect, useRef } from 'react';

const TrendingMovies = ({ discoverMovies }) => {
  const trendingListRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const scrollSpeed = 1; // Adjust for faster/slower scrolling
  const visibleCount = 6;
  const totalMovies = Math.min(discoverMovies.length, 9);

  
  // Effect to handle the scrolling of the trending movies list
  useEffect(() => {
    if (!trendingListRef.current || totalMovies <= visibleCount) {
      return;
    }

    const scrollContainer = trendingListRef.current;
    //console.log('the first value of Scroll Container: ', scrollContainer);
    // Get the width of one movie item with its right margin
    //const firstMovie = scrollContainer.children[0];
    //const movieWidth = firstMovie ? firstMovie.offsetWidth + parseFloat(getComputedStyle(firstMovie).marginRight || '0') : 0;
    const movieWidth = 175; // Assuming a fixed width for the movie item
    //console.log('Movie Width:', movieWidth);
    const scrollToFullWidth = (totalMovies - visibleCount) * movieWidth; // Scroll to the point where the 7th movie starts going out of view

    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;

        // Calculate the scroll position to trigger the return

        //console.log('Scroll to Full Width:', scrollToFullWidth);
        //console.log('Scroll Position:', scrollContainer.scrollLeft);

        if (scrollContainer.scrollLeft > scrollToFullWidth + 10) {
          //console.log('Before Reset:', scrollContainer.scrollLeft);
          scrollContainer.classList.remove('scroll-smooth'); // Remove the scroll-smooth class
          scrollContainer.scrollLeft = 0; // Reset scroll position to the beginning
          //console.log('After Reset:', scrollContainer.scrollLeft);
          setTimeout(() => {
            scrollContainer.classList.add('scroll-smooth');
          }, 50); // Small delay to avoid immediate re-trigger
          //console.log('Scrolling back to the beginning');
        }
      }
    };

    scrollIntervalRef.current = setInterval(scroll, 50);

    return () => clearInterval(scrollIntervalRef.current);
  }, [discoverMovies, totalMovies, visibleCount, scrollSpeed]);


  return (
    /* Section for displaying trending movies */
    <div className='trending'>
      {/* Trending section header */}
      <h2 className='mb-10'>Trending</h2>
      <ul
        ref={trendingListRef} // Attach the ref to the list container
        className='flex overflow-x-auto scroll-smooth list-none p-0 m-0 transform duration-300 ease-in-out'
      >
        {/* Loop through and render the first 9 trending movies */}
        {discoverMovies && discoverMovies.slice(0, 9).map((movie, i) => (
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