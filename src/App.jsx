import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import CardResident from './components/CardResident'
import LocationInf from './components/Location'
import getRandomNumber from './utils/getRandomNumber'
import FilterList from './components/FilterList'
import Error from './components/Error'

function App() {

  const [location, setLocation] = useState()
  const [searchInput, setSearchInput] = useState('')
  const [suggestedList, setSuggestedList] = useState()
  const [hasError, setHasError] = useState()

  useEffect(() => {
    let id = getRandomNumber()
    if (searchInput) {
      id = searchInput
    }

    const URL = `https://rickandmortyapi.com/api/location/${id}`

    axios.get(URL)
      .then(res => {
        setHasError(false)
        setLocation(res.data)
      })
      .catch(err => setHasError(true))
  }, [searchInput])
 
  const handleSubmit = event => {
    event.preventDefault()
    setSearchInput(event.target.idLocation.value)
  }

  const handleChange = event => {
    if (event.target.value === '') {
      setSuggestedList()
    } else {
      const URL = `https://rickandmortyapi.com/api/location?name=${event.target.value}`
      axios.get(URL)
        .then(res => setSuggestedList(res.data.results))
        .catch(err => console.log(err))
    }
  }
  console.log(suggestedList)

  return (
    <div className="App">
      <h1 className="title">Rick And Morty</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input className='input'
          id='idLocation'
          placeholder='Enter number from 1 to 126'
          type="text"
          onChange={handleChange}
        />
        <button>Search</button>
        <FilterList
          suggestedList={suggestedList}
          setSearchInput={setSearchInput}
        />
      </form>

      {
        hasError ?
          <Error />
          :
          <>
            <LocationInf location={location} />
            <div>
              {
                location?.residents.map(url => (
                  <CardResident
                    key={url}
                    url={url}
                  />
                ))
              }
            </div>
          </>

      }
    </div>



  )
}
export default App
