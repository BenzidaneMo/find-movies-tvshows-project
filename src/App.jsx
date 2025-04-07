import { useEffect, useState } from 'react'
import './App.css'
import Search  from './component/Search'


function App() {
  const [searchMovie, setSearchMovie] = useState('')

  const handlesearchMovie = (e) => {
    setSearchMovie(e.target.value)
  }
  
  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header className='mb-30'>
          <a href="/"><img src="logo.png" alt="logo" className='w-25 mb-10 cursor-pointer' /></a>
          <img src="hero.png" alt="img displaying movies" />
          <h1>Find <span className='text-gradient'>Movies</span> You&apos;ll Enjoy Without the Hassle</h1>
          <Search handlesearchMovie={handlesearchMovie} searchMovie={searchMovie}/>
        </header>
        <body>
          <div className='trending'>
            <h2 className='mb-10'>Trending</h2>
            <ul>
              <li><p>1</p><img src="no-movie.png" alt="title" /></li>
              <li><p>2</p><img src="no-movie.png" alt="title" /></li>
              <li><p>3</p><img src="no-movie.png" alt="title" /></li>
              <li><p>4</p><img src="no-movie.png" alt="title" /></li>
              <li><p>5</p><img src="no-movie.png" alt="title" /></li>
              <li><p>6</p><img src="no-movie.png" alt="title" /></li>
            </ul>
            
          </div>
          <h2>Popular</h2>
        </body>
      </div>
    </main>
  )
}



export default App
