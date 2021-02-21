import { GET_PROJECTS, GET_PROJECT, ADD_PROJECT, UPDATE_PROJECT, DELETE_PROJECT, PROJECTS_LOADING } from '../actions/types';

const initialState = {
    projects: [],
    project: {},
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload,
                loading: false
            };
        case GET_PROJECT:
            return {
                project: action.payload
            };
        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload]
            };
        case UPDATE_PROJECT:
            return {
                ...state,
                projects: state.projects.map((project) => {
                    if (action.payload.id === project._id) {
                        project.title = action.payload.project.title;
                        project.content = action.payload.project.content;
                        project.user = action.payload.project.user;
                    }
                    return project;
                })
            };
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload)
            };        
        // case PROJECTS_LOADING:
        //     return {
        //         ...state,
        //         loading: true
        //     };

        default:
            return state;
    }
}