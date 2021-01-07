import {GET_WEATHER} from '../types'
import {getWeatherByZipCode} from '../../services/WeatherServices'

export const getWeather = (zip) => async(dispatch) => {
    try {
        const res = await getWeatherByZipCode(zip)
        console.log(res)
        dispatch({
            type: GET_WEATHER,
            payload: res.data
        })
    } catch (error) {
        throw error;
    }
}