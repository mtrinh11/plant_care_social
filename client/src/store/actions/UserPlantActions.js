import {GET_USER_PLANTS} from '../types'
import {GetPlantChildren} from '../../services/UserPlantServices'

export const GetUserPlants = (userId) => async(dispatch) => {
    try {
        let res = await GetPlantChildren(userId)
        dispatch({
            type: GET_USER_PLANTS,
            payload: res.data
        })
    } catch (error) {
        throw error
    }
}