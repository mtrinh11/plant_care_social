import {GET_WEATHER, CLEAR_WEATHER} from '../types'
import {getWeatherByZipCode} from '../../services/WeatherServices'

export const getWeather = (zip) => async(dispatch) => {
    try {
        const res = await getWeatherByZipCode(zip)
        dispatch({
            type: GET_WEATHER,
            payload: res.data
        })
    } catch (error) {
        throw error;
    }
}

export const clearWeather = () => ({
    type: CLEAR_WEATHER
})