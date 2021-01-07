import axios from 'axios';
require('dotenv').config()
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
const BASE_URL = 'http://api.openweathermap.org/'

export const getWeatherByZipCode = async(zip=90067, country='us') => {
    try {
        let res = await axios.get(`${BASE_URL}/data/2.5/weather?zip=${zip},${country}&units=${'imperial'}&appid=${API_KEY}`)
        return res
    } catch (error) {
        throw error
    }
}