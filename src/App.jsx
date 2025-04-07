import { useState } from 'react'
import './App.css'

function App() {
  const [hasLiked, setHasLiked] = useState(false)

  const handleLikeClick = () => {
    setHasLiked(!hasLiked)
    console.log(hasLiked)
  }
  

  return (
    <>
      <h1>React Router Dom {hasLiked ? '❤️' : 'NO'}</h1>
      
      <Card name="Avatar" handleLikeClick={handleLikeClick}/>
      <Card name="Avenger" handleLikeClick={handleLikeClick}/>
      <Card name="Iron Man" handleLikeClick={handleLikeClick}/>
    </>
  )
}

// eslint-disable-next-line react/prop-types
const Card = ({name, handleLikeClick}) => {
  
  return (
    <div className="card">
      <h2>{name}</h2>
      <button onClick={handleLikeClick}>Like</button>

    </div>
  )
}

export default App
