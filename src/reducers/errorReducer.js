import {
    SET_ERROR,
    CLEAR_ERROR
} from "../actions/types";

const initialState = {
    isVisible: false,
    message: "",
    success: false,
    isReload: false
}

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                isVisible: action.payload.isVisible,
                message: action.payload.message,
                success: action.payload.success,
                isReload: action.payload.isReload
            }
            break;
        case CLEAR_ERROR:
            return {
                ...state,
                isVisible: false,
                message: "",
                success: false,
                isReload: false
            }
            break;
        default:
            return state;
            break;
    }
}

export default errorReducer;