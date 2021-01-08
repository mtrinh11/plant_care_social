import {GET_SEARCH_RESULTS, CLEAR_SEARCH_RESULTS} from '../types.js'
import {GetSearchResultsFromApi} from '../../services/TreffleServices.js'


export const getSearchResults = (query) => async(dispatch) => {
    try {
        let res = await GetSearchResultsFromApi(query)
        console.log(res)
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
        //shoot it to services, services shoots it to the backend and just use that slug
        //and get data and send it back
    } catch (error) {
        throw error
    }
}

export const clearSearchResults = () => ({
    type: CLEAR_SEARCH_RESULTS
})

