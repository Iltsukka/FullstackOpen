import { useState, useEffect } from "react";
import countryService from './components/countries'

const Display = ({country}) => {
  return(
    <div>{country.name.common}</div>
  )
}

const Map = ({list, search}) => {
  const length = list.length
  if (length > 10 && search) {
    return(
    <div>Too many matches, specify another filter</div>
    )    
  }

  if (length === 1) {
    const oneCountry = list[0]
    return(
    <div>
      <h1>{oneCountry.name.common}</h1>
      <div>capital {oneCountry.capital}</div>
      <div>area {oneCountry.area}</div>
      <h4>languages</h4>
      <ul>
        {Object.keys(oneCountry.languages).map((keyName, i) => 
        <li key={i}>
          <span>{oneCountry.languages[keyName]}</span>
        </li>
        )}
      </ul>
      <img style={{border: '1px solid'}} src={list[0].flags.png} height={150} alt='Flag'/>
    </div> 
    )
  }
    
  
  return(
    <>
    {list.map(country => 
      <Display key={country.name.common} country={country}/>)}
    </>
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

  const countriesToMap = search
    ? countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    : countries
  

  return (
    <div>
      find countries <input value={search} onChange={handleChange}/>
      <Map list={countriesToMap} search={search}/>
    </div>
  )
}

export default App;
