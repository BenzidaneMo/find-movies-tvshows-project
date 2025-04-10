
const Search = ({ handleSearching, searchTerm, handleSearchIconClick, searchRef }) => {

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchIconClick();
    }
  };

  return (
    <div className='search' ref={searchRef}> {/* Attach the ref to the main div */}
      <div>
        <img
          src="search.svg"
          alt="search icon"
          className='relative cursor-pointer'
          onClick={handleSearchIconClick} // Call the function when the image is clicked
        />
        <input
          type="text"
          onChange={handleSearching}
          value={searchTerm}
          placeholder='Search through 300+ movies online'
          onKeyDown={handleKeyDown} // Call handleKeyDown on key press
        />
      </div>
    </div>
  );
}
export default Search;