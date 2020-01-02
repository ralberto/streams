import {
    LOGGED_IN, 
    LOGGED_OUT, 
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from '../constants/actionTypes'

import  streams from '../api/streams';
import {httpCreateSuccess} from '../utils'

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


export const createStream = (formValues) => {
    //Make use of redux thunk
    return async (dispatch, getSatate) => {
        const response = await streams.post('/streams', formValues)
        if(httpCreateSuccess(response.status)) {
            dispatch({type: CREATE_STREAM,  payload: response.data })
        } 
    }
}

export const fetchStreams = () => async dispatch => {
        const response = await streams.get('/streams')
        dispatch({type: FETCH_STREAMS,  payload: response.data })
}

export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`)
    dispatch({type: FETCH_STREAM,  payload: response.data })
}


export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.put(`/streams/${id}`, formValues)
    dispatch({type: EDIT_STREAM, payload: response.data })
}

export const deleteStream = (id) => async dispatch => {
    const response = await streams.delete(`/streams/${id}`)
    dispatch({type: DELETE_STREAM, payload: id })
}
