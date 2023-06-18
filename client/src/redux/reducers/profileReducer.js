import { PROFILE_TYPES } from '../actions/profileAction'
import { EditData } from '../actions/globalTypes';

const initialState = {
    loading: false,
    users: [],
    ids: [],
    userPosts: []
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_TYPES.LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case PROFILE_TYPES.GET_USER:
            return {
                ...state,
                users: [...state.users, action.payload.user]
            };
        case PROFILE_TYPES.FOLLOW:
            return {
                ...state,
                users: EditData(state.users, action.payload._id, action.payload)
            };
        case PROFILE_TYPES.UNFOLLOW:
            return {
                ...state,
                users: EditData(state.users, action.payload._id, action.payload)
                // users: state.users.map(user =>
                //     user._id === action.payload._id ? action.payload : user
                // )
            };
        case PROFILE_TYPES.GET_ID:
            return {
                ...state,
                ids: [...state.ids, action.payload]
            }
        case PROFILE_TYPES.GET_POSTS:
            return {
                ...state,
                userPosts: [...state.userPosts, action.payload]
            }
        case PROFILE_TYPES.UPDATE_POSTS:
            return {
                ...state,
                userPosts: EditData(state.userPosts, action.payload._id, action.payload)
            }
        default:
            return state
    }
}

export default profileReducer