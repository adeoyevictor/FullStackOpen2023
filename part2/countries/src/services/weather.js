import axios from 'axios'
const baseUrl = `https://api.openweathermap.org/data/2.5`

const getData = (city, api_key) => {
  const request = axios.get(
    `${baseUrl}/weather?q=${city}&units=metric&appid=${api_key}`
  )
  return request.then((response) => response.data)
}

const weatherService = {
  getData,
}

export default weatherService
