import {GET_SEARCH_RESULTS} from '../types.js'

const initialState = {
    query: '',
    data: null,
}

const SearchReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SEARCH_RESULTS:
            return {...state, data: action.payload}
        default:
            return {...state}
    }
}

export default SearchReducer;