import MovieCard from './MovieCard'

const SearchResults = ({ searchedMovies, searchTerm, isSearchClicked, searchResultsRef, onSelectMovie }) => {
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
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        mediaType={movie.media_type}
                        variant="overlay"
                        onSelect={onSelectMovie}
                    />
                ))}
            </ul>
        </section>
    )
}

export default SearchResults
