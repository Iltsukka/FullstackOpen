import { useState, useEffect } from "react";
import countryService from './components/countries'

const Display = ({country, length,action}) => {

  if (length <= 10) {
    return(
      <div>{country.name.common} <button onClick={()=>action(country)}>show</button></div>
    )
  }
  return(
    <div>{country.name.common}</div>
  )
}

const CountryInfo = ({country}) => {
  if (!country) return
  return(
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h4>languages</h4>
      <ul>
        {Object.keys(country.languages).map((keyName, i) => 
        <li key={i}>
          <span>{country.languages[keyName]}</span>
        </li>
        )}
      </ul>
      <img style={{border: '1px solid'}} src={country.flags.png} height={150} alt='Flag'/>
    </div> 
    )
  
}

const Map = ({list, search, action}) => {
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
      <Display key={country.name.common} country={country} length={length} action={action}/>)}
    </>
    )
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [countryToShow, setCountryToShow] = useState(null)

  const handleChange = (event) => {
    setSearch(event.target.value)
    if (countryToShow) {
      setCountryToShow(null)
    }
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
  
  const handleButtonAction = (country) => {
    setCountryToShow(country)
  } 

  return (
    <div>
      find countries <input value={search} onChange={handleChange}/>
      <Map list={countriesToMap} search={search} action={handleButtonAction}/>
      <CountryInfo country={countryToShow}  />
    </div>
  )
}

export default App;
