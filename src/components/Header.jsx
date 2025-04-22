import Search from './Search'

const Header = ({ handleSearching, searchTerm, handleSearchIconClick, searchRef }) => {
  
    return (
        <header className='mt-0'>
          <div className='w-full flex flex-col items-center'>
            {/* Logo acts as a link to the home page */}
            <a href="/" className='mb-10'>
              {/* Logo image */}
              <img src="logo.png" alt="logo" className='min-md:w-25 w-20 h-auto self-center cursor-pointer' />
            </a>
            {/* Hero image displayed below the logo */}
            <img src="hero.webp" alt="img displaying movies" />
          </div>
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