
const Search = ({handlesearchMovie,searchMovie}) => {
  
    return (
        <div className='search'>
            <div>
                <img src="search.svg" alt="search icon" className='relative cursor-pointer'/>
                <input type="text" onChange={handlesearchMovie} value={searchMovie} placeholder='Search through 300+ movies online' />
            </div>
        </div>
    );
}

export default Search;