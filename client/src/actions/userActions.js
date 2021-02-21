import axios from 'axios';
import { GET_USERS, GET_USER, ADD_USER, UPDATE_USER, DELETE_USER, USERS_LOADING } from './types';

export const getUsers = () => dispatch => {
    // dispatch(setUsersLoading());
    axios
        .get('/api/users')
        .then(res =>
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        )
}

export const getUser = (id) => dispatch => {
    axios
        .get(`/api/users/${id}`)
        .then(res =>
            dispatch({
                type: GET_USER,
                payload: res.data
            })
        )
}

export const addUser = (user) => dispatch => {
    axios
        .post('/api/users', user)
        .then(res =>
            dispatch({
                type: ADD_USER,
                payload: res.data
            })
        )
}

export const updateUser = (id, user) => dispatch => {
    axios
        .put(`/api/users/${id}`, user)
        .then(res =>
            dispatch({
                type: UPDATE_USER,
                payload: { id, user }
            })
        )
}

export const deleteUser = (id) => dispatch => {
    axios
        .delete(`/api/users/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_USER,
                payload: id
            })
        )
}

// export const setUsersLoading = () => {
//     return {
//         type: USERS_LOADING
//     }
// }