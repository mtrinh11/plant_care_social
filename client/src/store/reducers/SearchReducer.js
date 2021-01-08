import {GET_SEARCH_RESULTS, CLEAR_SEARCH_RESULTS} from '../types.js'

const initialState = {
    query: '',
    data: null,
}

const SearchReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SEARCH_RESULTS:
            return {...state, data: action.payload}
        case CLEAR_SEARCH_RESULTS:
            return {... state, query: '', data: null}
        default:
            return {...state}
    }
}

export default SearchReducer;