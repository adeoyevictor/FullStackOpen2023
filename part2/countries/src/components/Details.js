import React, { useEffect, useState } from 'react'
import weatherService from '../services/weather'

const Details = ({ name, capital, area, languages, flags }) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    weatherService
      .getData(capital, process.env.REACT_APP_API_KEY)
      .then((data) => setData(data))
  }, [])
  console.log(data)
  return (
    <>
      <h2>{name}</h2>
      <div>capital: {capital}</div>
      <div>area: {area}</div>
      <h4>languages</h4>
      <ul>
        {Object.keys(languages).map((lang, idx) => {
          return <li key={idx}>{languages[lang]}</li>
        })}
      </ul>
      <img src={flags.png} alt={flags.alt} />

      {data === null ? null : (
        <>
          <h4>Weather in {capital}</h4>
          <p>temperature {data?.main?.temp} Celcius</p>
          <img
            alt='weather icon'
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          />
          <p>wind {data?.wind?.speed} m/s</p>
        </>
      )}
    </>
  )
}

export default Details
