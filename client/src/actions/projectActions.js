import axios from 'axios';
import { GET_PROJECTS, GET_PROJECT, ADD_PROJECT, UPDATE_PROJECT, DELETE_PROJECT, PROJECTS_LOADING } from '../actions/types';

export const getProjects = () => dispatch => {
    // dispatch(setProjectsLoading());
    axios
        .get('/api/projects')
        .then(res =>
            dispatch({
                type: GET_PROJECTS,
                payload: res.data
            })
        )
}

export const getProject = (id) => dispatch => {
    axios
        .get(`/api/projects/${id}`)
        .then(res =>
            dispatch({
                type: GET_PROJECT,
                payload: res.data
            })
        )
}

export const addProject = (project) => dispatch => {
    axios
        .post('/api/projects', project)
        .then(res =>
            dispatch({
                type: ADD_PROJECT,
                payload: res.data
            })
        )
}

export const updateProject = (id, project) => dispatch => {
    axios
        .put(`/api/projects/${id}`, project)
        .then(res =>
            dispatch({
                type: UPDATE_PROJECT,
                payload: { id, project }
            })
        )
}

export const deleteProject = (id) => dispatch => {
    axios
        .delete(`/api/projects/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_PROJECT,
                payload: id
            })
        )
}

// export const setProjectsLoading = () => {
//     return {
//         type: PROJECTS_LOADING
//     }
// }