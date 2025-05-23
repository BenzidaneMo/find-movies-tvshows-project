
const Search = ({ handleSearching, searchTerm, handleSearchIconClick, searchRef }) => {

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchIconClick();
    }
  };

  return (
    <div className="w-full bg-transparent h-40" ref={searchRef}> {/* Attach the ref to the main div */}
      <div className='search'>
        <div>
          <img
            src="search.svg"
            alt="search icon"
            className='cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-110 active:scale-90'
            onClick={handleSearchIconClick} // Call the function when the image is clicked
          />
          <input
            type="text"
            name="search-for-movie"
            onChange={handleSearching}
            value={searchTerm}
            placeholder='Search through 300+ movies online'
            onKeyDown={handleKeyDown} // Call handleKeyDown on key press
          />
        </div>
      </div>
    </div>
  );
}
export default Search;