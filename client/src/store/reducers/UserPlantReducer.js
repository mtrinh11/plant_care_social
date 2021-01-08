import {GET_USER_PLANTS} from '../types'

const initialState = {
    babies: false
}

const UserPlantReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case GET_USER_PLANTS:
            return {...state, babies: action.payload}
        default:
            return {...state}
    }
}

export default UserPlantReducer;