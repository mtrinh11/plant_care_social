import {GET_SEARCH_RESULTS} from '../types.js'
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


