import {
    CLEAR_LOADING,
    SET_LOADING
} from "./types";

export const setLoading = () => {
    return (dispatch) => {
        return dispatch({
            type: SET_LOADING
        })
    }
}

export const clearLoading = () => {
    return (dispatch) => {
        return dispatch({
            type: CLEAR_LOADING
        })
    }
}