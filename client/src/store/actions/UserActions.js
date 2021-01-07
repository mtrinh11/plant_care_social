import {LOGIN_USER, CLEAR_USER} from '../types'

export const loginUser = (data) => ({
    type: LOGIN_USER,
    payload: data
})

export const clearUser = () => ({
    type: CLEAR_USER
})