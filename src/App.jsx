import { useEffect, useState } from 'react'
import './App.css'

function App() {
  
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen bg-gray-100">
      <h1 className='text-2xl font-bold'>React Router Dom </h1>
      
      <Card name="Avatar" />
      <Card name="Avenger" />
      <Card name="Iron Man" />
    </div>
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
    <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-md w-1/4">
      <div className='flex gap-2 justify-between'>
        <h2 className='font-medium text-lg items-center m-2'>{name} {hasLiked ? '❤️' : '👎'}</h2>
        <button className='border-1 border-black m-2 rounded-lg p-2 bg-gray-200 w-25 hover:bg-gray-300 cursor-pointer' onClick={handleLikeClick}>{hasLiked ? 'Liked' : 'Like'}</button>
      </div>
      <p className='text-sm'>Number of Likes: {clickNumber}</p>

    </div>
  )
}

export default App
