import {LOGIN_USER, CLEAR_USER} from '../types'

const initialState = {
    authenticated: false,
    userId: '',
    email: '',
    firstName: '',
    lastName: '',
    zip: 90067
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state, 
                authenticated: true, 
                userId: action.payload.id ,
                email: action.payload.email,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                zip: action.payload.zip
            }
        case CLEAR_USER:
            return {
                ...state,
                authenticate: false,
                userId: '' ,
                email: '',
                firstName: '',
                lastName: '',
                zip: 0
            }
        default:
            return {...state}
    }
}

export default userReducer