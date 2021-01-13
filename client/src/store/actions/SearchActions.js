import {GET_SEARCH_RESULTS, CLEAR_SEARCH_RESULTS} from '../types.js'
import {GetSearchResultsFromApi} from '../../services/TreffleServices.js'


export const getSearchResults = (query) => async(dispatch) => {
    try {
        let res = await GetSearchResultsFromApi(query)
        dispatch({
            type: GET_SEARCH_RESULTS,
            payload: res.data
        })
    } catch (error) {
        throw error
    }
}

export const getNextPageSearchResults = (url) => async(dispatch) => {
    try {
    } catch (error) {
        throw error
    }
}

export const clearSearchResults = () => ({
    type: CLEAR_SEARCH_RESULTS
})

