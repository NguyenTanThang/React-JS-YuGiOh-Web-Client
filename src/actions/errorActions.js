import {
    CLEAR_ERROR,
    SET_ERROR
} from "./types";

export const setError = (isVisible, message, success) => {
    return (dispatch) => {
        return dispatch({
            type: SET_ERROR,
            payload: {
                isVisible,
                message,
                success
            }
        })
    }
}

export const clearError = () => {
    return (dispatch) => {
        return dispatch({
            type: CLEAR_ERROR,
        })
    }
}