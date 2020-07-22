import {
    CHANGE_PASSWORD,
    CHANGE_PROFILE,
    LOGIN,
    LOGOUT,
    SIGNUP
} from "../actions/types";

const initialState = {
    userID: ""
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
        case CHANGE_PASSWORD:
        case CHANGE_PROFILE:
            return {
                ...state,
                userID: action.payload.user._id
            }
            break;
        case LOGOUT:
            return {
                ...state,
                userID: ""
            }
            break;
        case SIGNUP:
            return {
                ...state,
                userID: action.payload.user._id
            }
            break;
        default:
            return state;
            break;
    }
}

export default userReducer;