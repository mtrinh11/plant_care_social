import {GET_USER_PLANTS, CLEAR_USER_PLANTS, GET_USER_PLANTS_DETAILS, CLEAR_USER_PLANTS_DETAILS} from '../types'

const initialState = {
    babies: false,
    details: false
}

const UserPlantReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case GET_USER_PLANTS:
            return {...state, babies: action.payload}
        case CLEAR_USER_PLANTS:
            return {...state, babies: false}
        case GET_USER_PLANTS_DETAILS:
            return {...state, details: action.payload}
        case CLEAR_USER_PLANTS_DETAILS:
            return {...state, details: false}
        default:
            return {...state}
    }
}

export default UserPlantReducer;