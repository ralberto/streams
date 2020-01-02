import {LOGGED_IN, LOGGED_OUT} from '../constants/actionTypes'

const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOGGED_IN:
            return {...state, isSignedIn: true, userId: action.payload}
        case LOGGED_OUT:
            return {...state, isSignedIn: false, userId: null}
        default:
            return state
    }
}
