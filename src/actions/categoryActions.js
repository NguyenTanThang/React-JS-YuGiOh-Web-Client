import {
    GET_ALL_CATEGORIES,
    CLEAR_LOADING,
    SET_LOADING,
    SET_ERROR,
} from "./types";
import {
    MAIN_PROXY_URL
} from "../config/config";
import axios from "axios";

export const getAllCategories = (dispatch) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: SET_LOADING
            })

            const res = await axios.get(`${MAIN_PROXY_URL}/categories`);
    
            const categories = res.data.data;
    
            dispatch({
                type: GET_ALL_CATEGORIES,
                payload: {
                    categories
                }
            })

            return dispatch({
                type: CLEAR_LOADING
            })
        } catch (error) {
            const message = error.response.data.message;
            return dispatch({
                type: SET_ERROR,
                payload: {
                    isVisible: true,
                    message,
                    success: false
                }
            })
        }
    }
}