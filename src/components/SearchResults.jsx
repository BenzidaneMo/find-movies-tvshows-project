
const SearchResults = ({ searchedMovies, searchTerm, isSearchClicked, searchResultsRef }) => {
    if (!isSearchClicked) {
        // If isSearchClicked is false, do not render the component
        return null
    }
    
    return (
        /* Section for showing the search results */
        <div className='searched Movie' ref={searchResultsRef}>
        {/* Title showing the current search query if present */}
            <h2 className='mb-5'>
              {searchTerm ? 'Search for : ' : ''} {searchTerm}
            </h2>
            {/* Grid layout for search result movies */}
            <ul className='grid grid-cols-6 gap-4'>
                {/* Loop through and render up to the first 12 search result movies */}
                {searchedMovies.slice(0, 12).map((movie) => (
                <li className='relative shadow-md cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105' key={movie.id}>
                {searchTerm ? (
                    <div className='rounded-md'>
                    {/* Movie poster image with rounded corners */}
                        <img className='rounded-md' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                        {/* Overlay div that shows more details on hover */}
                        <div className='absolute overflow-hidden text-clip top-0 w-full h-full bg-black opacity-0 rounded-md hover:opacity-70 transition-opacity duration-300 ease-in-out text-white p-3'>
                            {/* Movie title displayed at the center */}
                            <h3 className='text-center font-bold text-lg my-4'>{movie.title}</h3>
                            {/* Movie overview text */}
                            <p className='text-sm overflow-hidden text-clip'>
                            Overview: {movie.overview.length > 100 ? movie.overview.slice(0, 100) + '...' : movie.overview}
                            </p>
                            <br />
                            {/* Movie rating */}
                            <p className='text-sm float-end'>Rating: {Math.floor(movie.vote_average*10)}%</p>
                        </div>
                    </div>
                ) : (null)}
                </li>
                ))}
            </ul>
        </div>
    )
}

export default SearchResults