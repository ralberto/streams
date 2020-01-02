import {combineReducers} from 'redux';
import {authReducer} from './auth';
import {reducer as formReducer} from 'redux-form';
import { streamsReducer } from './streams';

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    streams: streamsReducer
});
