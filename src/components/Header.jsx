import Search from './Search'

const Header = ({ handleSearching, searchTerm, handleSearchIconClick, searchRef }) => {
  
    return (
        <header className='mb-30'>
          {/* Logo acts as a link to the home page */}
          <a href="/">
            <img src="logo.png" alt="logo" className='w-25 mb-10 cursor-pointer' />
          </a>
          {/* Hero image displayed below the logo */}
          <img src="hero.png" alt="img displaying movies" />
          {/* Main title with highlighted text */}
          <h1>
            Find <span className='text-gradient'>Movies</span> You&apos;ll Enjoy Without the Hassle
          </h1>
          {/* Search component */}
          <Search
            handleSearching={handleSearching}
            searchTerm={searchTerm}
            handleSearchIconClick={handleSearchIconClick}
            searchRef={searchRef}
          />
        </header>
  )
}

export default Header