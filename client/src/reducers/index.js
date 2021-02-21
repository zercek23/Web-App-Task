import { combineReducers } from 'redux';
import projectReducer from './projectReducer';
import userReducer from './userReducer';

export default combineReducers({
    user: userReducer,
    project: projectReducer
})