import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'


function App() {
  const [flavors, setFlavors] = useState([])

  useEffect(() => {
    const fetchFlavors = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/icecream')
        setFlavors(data)
      } catch (error) {
        console.error('Error fetching flavors:', error)
      }
    }
  
    fetchFlavors()
  }, [])

  const handleDelete = async (flavorId) => {
    try {
      await axios.delete(`http://localhost:3000/api/icecream/${flavorId}`)
      setFlavors((prevFlavors) => prevFlavors.filter((flavor) => flavor.id !== flavorId))
    } catch (error) {
      console.error('Error deleting flavor:', error)
    }
  }

  return (
    <>
    {console.log(flavors)}
    {flavors.map((flavor) => {
      return (
        <span>
          <h1 key={flavor.id}>{flavor.name}</h1>
          <button onClick={() => handleDelete(flavor.id)}>Delete</button>
        </span>
      )
    })}
    </>
  )
}

export default App
