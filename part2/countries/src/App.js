import { useEffect } from 'react'
import countriesService from './services/countries'
import { useState } from 'react'
import Details from './components/Details'

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [idx, setIdx] = useState(null)

  const handleChange = (event) => {
    setQuery(event.target.value)
    setIdx(null)
  }

  useEffect(() => {
    countriesService.getAll().then((countries) => setCountries(countries))
  }, [])

  const countriesToShow =
    query === ''
      ? []
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(query.toLowerCase())
        )

  console.log(countriesToShow)
  return (
    <div>
      find countries
      <input type='search' value={query} onChange={handleChange} />
      {countriesToShow.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : countriesToShow.length > 1 ? (
        <>
          {countriesToShow.map((country, idx) => {
            return (
              <div key={country.name.common}>
                {country.name.common}{' '}
                <button onClick={() => setIdx(idx)}>show</button>
              </div>
            )
          })}
          {idx === null ? null : (
            <Details
              name={countriesToShow[idx].name.common}
              capital={countriesToShow[idx].capital.join(', ')}
              area={countriesToShow[idx].area}
              languages={countriesToShow[idx].languages}
              flags={countriesToShow[idx].flags}
            />
          )}
        </>
      ) : countriesToShow.length === 1 ? (
        <Details
          name={countriesToShow[0].name.common}
          capital={countriesToShow[0].capital.join(', ')}
          area={countriesToShow[0].area}
          languages={countriesToShow[0].languages}
          flags={countriesToShow[0].flags}
        />
      ) : null}
    </div>
  )
}

export default App
