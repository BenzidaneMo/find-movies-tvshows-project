
const TrendingMovies = ({ discoverMovies }) => {
  return (
    /* Section for displaying trending movies */
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
  )
}

export default TrendingMovies