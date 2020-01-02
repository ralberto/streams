import {LOGGED_IN, LOGGED_OUT} from '../constants/actionTypes'

export const signIn = (userId) => {
    return {    
        type: LOGGED_IN,
        payload: userId
    }
}

export const signOut = () => {  
    return {
        type: LOGGED_OUT
    }
}