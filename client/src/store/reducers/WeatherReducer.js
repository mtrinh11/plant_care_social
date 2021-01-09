import {GET_WEATHER, CLEAR_WEATHER} from '../types';

const initialState = {
    fetched: false,
    name: '',
    cloudPercentage: '',
    windSpeed: '',
    windDeg: '',
    temp: '',
    feelsLike: '',
    tempMin: '',
    tempMax: '',
    humidity: '',
    description: {},
    sys: {},
    timezone: ''
}

const WeatherReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_WEATHER:
            return {
                ...state,
                fetched: true,
                name: action.payload.name,
                cloudPercentage: action.payload.clouds.all,
                windSpeed: action.payload.wind.speed,
                windDeg: action.payload.wind.deg,
                temp: action.payload.main.temp,
                feelsLike: action.payload.main.feels_like,
                tempMin: action.payload.main.temp_min,
                tempMax: action.payload.main.temp_max,
                humidity: action.payload.main.humidity,
                description: action.payload.weather[0],
                sys: action.payload.sys,
                timezone: action.payload.timezone
            }
        case CLEAR_WEATHER:
            return {
                ...state,
                fetched: false,
                name: '',
                cloudPercentage: '',
                windSpeed: '',
                windDeg: '',
                temp: '',
                feelsLike: '',
                tempMin: '',
                tempMax: '',
                humidity: '',
                description: {},
                sys: {},
                timezone: ''
            }
        default: 
            return {...state}
    }
}

export default WeatherReducer;