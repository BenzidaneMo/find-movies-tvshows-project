import MovieCard from './MovieCard'

const PopularMovies = ({discoverMovies, page, LimitPages, handleNextPage, handlePreviousPage, onSelectMovie }) => {
    return (
        <section>
            <h2 className="text-white mb-8 mt-10">Popular</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 min-md:gap-4 xs:gap-3 min-lg:grid-cols-4 gap-2 w-full text-white">
                {discoverMovies && discoverMovies.length > 0 ? discoverMovies.map((movie)=> (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        mediaType="movie"
                        variant="grid"
                        onSelect={onSelectMovie}
                    />
                )): (<div className="min-h-[500px]">Loading...</div>)}
            </div>
            <div className="flex justify-between items-center text-white w-full mt-4">
                {/* Previous Button */}
                <button
                  className={`bg-[#0F0D23] border-2 border-solid border-purple-800 p-3 rounded-md ${
                    page === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95 active:-translate-x-1'
                  }`}
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                  name="previous-button"
                >
                  <img src="arrow-icon.svg" className="rotate-180" alt="previous button" />
                </button>

                {/* Page Indicator */}
                <p>
                  {page} / <span className="opacity-60">{LimitPages}</span>
                </p>

                {/* Next Button */}
                <button
                  className={`bg-[#0F0D23] border-2 border-solid border-purple-800 p-3 rounded-md ${
                    page === LimitPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95 active:translate-x-1'
                  }`}
                  onClick={handleNextPage}
                  disabled={page === LimitPages}
                  name="next-button"
                >
                  <img src="arrow-icon.svg" alt="next button" />
                </button>
        </div>

        </section>
    )
}

export default PopularMovies;
