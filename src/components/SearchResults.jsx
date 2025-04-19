
const SearchResults = ({ searchedMovies, searchTerm, isSearchClicked, searchResultsRef }) => {
    if (!isSearchClicked) {
        // If isSearchClicked is false, do not render the component
        return null
    }
    
    return (
        /* Section for showing the search results */
        <section ref={searchResultsRef}>
        {/* Title showing the current search query if present */}
            <h2 className='mb-5'>
              {searchTerm ? 'Search for : ' : ''} {searchTerm}
            </h2>
            {/* Grid layout for search result movies */}
            <ul className='grid min-lg:grid-cols-6 min-md:grid-cols-4 grid-cols-3 min-lg:gap-4 min-md:gap-3 gap-2'>
                {/* Loop through and render up to the first 12 search result movies */}
                {searchedMovies.slice(0, 12).map((movie) => (
                <li className='relative shadow-md cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105' key={movie.id}>
                {searchTerm ? (
                    <div className='rounded-md'>
                    {/* Movie poster image with rounded corners */}
                        {movie.poster_path ? (
                        <img className='rounded-md' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title ? movie.title : movie.name}/>) 
                        : <img className="rounded-md" src="no-movie.png" alt={movie.title ? movie.title : movie.name} /> }

                        {/* Overlay div that shows more details on hover */}
                        <div className='absolute overflow-hidden text-clip top-0 w-full h-full bg-black opacity-0 rounded-md hover:opacity-70 active:opacity-70 transition-opacity duration-300 ease-in-out text-white p-3'>
                            {/* Movie title displayed at the center */}
                            <h3 className='text-center font-bold text-lg my-4 max-sm:text-sm'>{movie.title ? movie.title : movie.name}</h3>
                            {/* Movie overview text */}
                            <p className='text-sm overflow-hidden text-clip max-sm:hidden'>
                            Overview: {movie.overview && movie.overview.length > 100 ? movie.overview.slice(0, 100) + '...' : movie.overview}
                            </p>
                            <br />
                            {/* Movie rating */}
                            <p className='text-sm float-end max-sm:hidden'>Rating: {Math.floor(movie.vote_average*10)}%</p>
                        </div>
                    </div>
                ) : (null)}
                </li>
                ))}
            </ul>
        </section>
    )
}

export default SearchResults