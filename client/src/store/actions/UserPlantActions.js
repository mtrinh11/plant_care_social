import {GET_USER_PLANTS, CLEAR_USER_PLANTS, GET_USER_PLANTS_DETAILS, CLEAR_USER_PLANTS_DETAILS} from '../types'
import {GetPlantChildren} from '../../services/UserPlantServices'
import {GetSpecificSpeciesFromApi} from '../../services/TreffleServices'

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

export const ClearUserPlants = () => ({
    type: CLEAR_USER_PLANTS
})

export const GetUserPlantDetails = (userPlants) => async(dispatch) => {
    try {
        let data = []
        for (let plant of userPlants) {
            let res = await GetSpecificSpeciesFromApi(plant.TreffleId)
            data.push(res.data)
        }
        dispatch({
            type: GET_USER_PLANTS_DETAILS,
            payload: data
        })
    } catch (error) {
        throw error
    }
}

export const ClearUserPlantsDetails = () => ({
    type: CLEAR_USER_PLANTS_DETAILS
})