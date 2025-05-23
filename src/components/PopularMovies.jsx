
const PopularMovies = ({discoverMovies, page, LimitPages, handleNextPage, handlePreviousPage }) => {
    return (
        <section>
            <h2 className="text-white mb-8 mt-10">Popular</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 min-md:gap-4 xs:gap-3 min-lg:grid-cols-4 gap-2 w-full text-white">
                {discoverMovies && discoverMovies.length > 0 ? discoverMovies.map((movie)=> (
                <div className="grid bg-[#0F0D23] rounded-md transition-transform duration-300 ease-in-out transform hover:scale-103 active:scale-95" key={movie.id}>
                    {movie.backdrop_path ? 
                    (<img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} className="p-4 rounded-[20px] cursor-pointer"/>)
                    : (<img src="no-Poster.png" alt={`no poster for ${movie.title}`} className="p-4 rounded-[20px] cursor-pointer" />)}
                    <div className="p-4 pt-0 cursor-pointer">
                        <h3 className="font-bold mb-2">{movie.title}</h3>
                        <div className="flex gap-1">
                            <img src="star.svg" alt={`rating of ${movie.title}`} />
                            <p className="font-bold">{Math.round(movie.vote_average * 10) / 10}</p>
                            <p className="text-gray-100"><span className="text-xs"> ● </span>Action<span className="text-xs"> ● </span>Movie</p>
                        </div>
                    </div>
                </div>
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