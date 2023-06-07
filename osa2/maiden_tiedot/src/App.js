import { useState, useEffect } from "react";
import countryService from './components/countries'

const Display = ({country}) => {
  return(
    <div>{country.name.common}</div>
  )
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  useEffect(()=> {
    countryService
      .getAll()
      .then(response=>{
        setCountries(response.data)
      })
  }, [])

  const countriesToMap = () => {

  }

  return (
    <div>
      find countries <input value={search} onChange={handleChange}/>
      {countries.map(country=> 
        <Display key={country.name.common} country={country} />
      )}
    </div>
  )
}

export default App;
