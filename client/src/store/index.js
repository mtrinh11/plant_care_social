import {createStore, applyMiddleware, combineReducers} from 'redux';
import userReducer from './reducers/UserReducer';
import searchReducer from './reducers/SearchReducer';
import weatherReducer from './reducers/WeatherReducer'
import thunk from 'redux-thunk';

const store = createStore(
    combineReducers({
        userState: userReducer,
        searchState: searchReducer,
        weatherState: weatherReducer
    }),
    applyMiddleware(thunk)
)

export default store;