
const PopularMovies = ({discoverMovies}) => {
    return (
        <section>
            <h2 className="text-white mb-8 mt-10">Popular</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 min-md:gap-4 xs:gap-3 min-lg:grid-cols-4 gap-2 w-full text-white">
                {discoverMovies && discoverMovies.length > 0 ? discoverMovies.slice(0,12).map((movie)=> (
                <div className="grid bg-[#0F0D23] rounded-md transition-transform duration-300 ease-in-out transform hover:scale-103 active:scale-95" key={movie.id}>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} className="p-4 rounded-[20px] cursor-pointer"/>
                    <div className="p-4 pt-0 cursor-pointer">
                        <h3 className="font-bold mb-2">{movie.title}</h3>
                        <div className="flex gap-1">
                            <img src="./star.svg" alt={`rating of ${movie.title}`} />
                            <p className="font-bold">{Math.round(movie.vote_average * 10) / 10}</p>
                            <p className="text-gray-100"><span className="text-xs"> ● </span>Action<span className="text-xs"> ● </span>Movie</p>
                        </div>
                    </div>
                </div>
                )): (<></>)}
            </div>
            <div className="flex justify-between text-white w-full">
                <p className="border-2 border-solid border-purple-800 p-2 cursor-pointer">return</p>
                <p>2 / 50</p>
                <p className="border-2 border-solid border-purple-800 p-2 cursor-pointer">next</p>
            </div>

        </section>
    )
}

export default PopularMovies;