import { useEffect, useState } from 'react'
import './App.css'

function App() {
  
  return (
    <>
      <h1>React Router Dom </h1>
      
      <Card name="Avatar" />
      <Card name="Avenger" />
      <Card name="Iron Man" />
    </>
  )
}

// eslint-disable-next-line react/prop-types
const Card = ({name}) => {
  const [clickNumber, setClickNumber] = useState(0)
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(() => {
    console.log(`the number of the movie ${name} has been liked is ${clickNumber}`)
  }, [hasLiked])

  const handleLikeClick = () => {
    setHasLiked(prev => !prev)
    if (!hasLiked) {
      return setClickNumber((prev) => (prev + 1))
    }
  }
  
  console.log(hasLiked)

  return (
    <div className="card">
      <h2>{name} {hasLiked ? '❤️' : 'NO'}</h2>
      <button onClick={handleLikeClick}>{hasLiked ? 'Liked' : 'Like'}</button>
      <p>Number of Likes: {clickNumber}</p>

    </div>
  )
}

export default App
