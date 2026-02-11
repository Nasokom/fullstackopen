import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
const api_key = import.meta.env.VITE_WEATHER_KEY
// variable api_key now has the value set in startup

const Weather = ({selectedCountry}) =>{
  const [datas,setDatas] = useState(null)
  const weather_url = ''
  const {latlng,name} = selectedCountry

  useEffect(()=>{
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}`)
    .then(response =>{
      setDatas(response.data.list[0])
      console.log(response.data)
    })
  },[selectedCountry])


  return(
    <div>
      <h2>Weather in {name.common}</h2>

    { datas && <>
      

      <p>Temperature {(datas.main.temp - 32) / 1.8 } celcius</p>
        <img src={`https://openweathermap.org/payload/api/media/file/${datas.weather[0].icon}.png`}width={'auto'} height={100}/>

        <p>wind {datas.wind.speed}m/s</p>
      </> 
      }
    </div>
  )
}

const CountriesList = ({filteredCountries,handleShow})=>{

if(filteredCountries.length > 10){
  return(
    <div>
         <p>Too many matches, specify another filter</p>
    </div>
  )}

  if(filteredCountries.length === 0){
  return(
    <div>
         <p>No countries match</p>
    </div>
  )}

return(
    <table> 
      <tbody>
        {filteredCountries.map(country=>{
          return(
            <tr key={country.capital}>  
              <td><p>{country.name.common}</p></td>    
              <td><button onClick={handleShow(country)}>Show</button></td>
            </tr>
          )
        })}
        </tbody>
    </table>
)}


const Display =({selectedCountry})=>{
  const languages = selectedCountry.languages
return(
  <div>
    <h1>{selectedCountry.name.common || selectedCountry.name.official}</h1>

      <table>
        <tbody>

        <tr>
          <td>Capital</td>
          {selectedCountry.capital.map(city => <td key={city+'city'}>{city}</td>)}
        </tr>
        <tr>
          <td>Area</td>
          <td>{selectedCountry.area}</td>
        </tr>
        </tbody>
      </table>

    <h2>Languages</h2>

    <ul>
      { Object.entries(languages).map(langue => <li key={langue[0]}>{langue[1]}</li>)}
    </ul>


    <img src={selectedCountry.flags.svg}  width={'auto'} height={200}/>

    <Weather selectedCountry={selectedCountry}/>
  </div>
)

}


function App() {

  const base_URL = "https://studies.cs.helsinki.fi/restcountries/api/all"

  const [search,setSearch] = useState('')
  const [countries,setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)


  console.log(api_key)

  useEffect(()=>{

      axios.get(base_URL)
      .then(response => {
        setCountries([...response.data])
      })
  },[])

const filteredCountries = countries.filter(a => a.name.official.toLowerCase().includes(search.toLowerCase()) || a.name.common.toLowerCase().includes(search.toLowerCase()) )

const handleChange = (event)=>{
  const value = event.target.value
  setSearch(value)
  setSelectedCountry(null)
}

const handleShow = (country)=>{
  return () => setSelectedCountry(country)  
}

  return (
    <>

    <div>
        <p>find countries <input value={search} onChange={handleChange}/></p>
    </div>


    { !search ?
        <p>enter something</p>
      :filteredCountries.length === 1 || selectedCountry ?
      <Display selectedCountry={selectedCountry || filteredCountries[0]}/> 
      :
      <CountriesList filteredCountries={filteredCountries} handleShow={handleShow}/>
    } 

    </>
  )
}

export default App
