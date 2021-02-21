import { GET_USERS, GET_USER, ADD_USER, UPDATE_USER, DELETE_USER, USERS_LOADING } from '../actions/types';

const initialState = {
    users: [],
    user: {},
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        case GET_USER:
            return {
                user: action.payload
            };
        case ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload]
            };
        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map((user) => {
                    if (action.payload.id === user._id) {
                        user.name = action.payload.user.name;
                        user.lastName = action.payload.user.lastName;
                        user.email = action.payload.user.email;
                    }
                    return user;
                })
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload)
            };        
        // case USERS_LOADING:
        //     return {
        //         ...state,
        //         loading: true
        //     };

        default:
            return state;
    }
}