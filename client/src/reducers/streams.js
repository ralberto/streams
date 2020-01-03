import {CREATE_STREAM, EDIT_STREAM, DELETE_STREAM, FETCH_STREAMS, FETCH_STREAM} from '../constants/actionTypes'


export const streamsReducer = (streams = {}, action) => {
    switch(action.type) {
        case CREATE_STREAM || EDIT_STREAM:
            return {...streams, [action.payload.id]: action.payload}
        case DELETE_STREAM:
            //https://hashrocket.com/blog/posts/5-javascript-object-destructuring-tricks
            // note: key interpolation and usage of _ to say "I don't care"
            const { [action.payload]: _, ...rest } = streams
            return rest
        case FETCH_STREAM:
            return {...streams, [action.payload.id]: action.payload}
        case FETCH_STREAMS:
            return {
                ...streams,
                ...action.payload.reduce(
                  (obj, item) => ({
                    ...obj,
                    [item.id]: item
                  }),
                  {}
                )
              };
        default:
            return streams;
    }
}
