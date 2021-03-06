import {
    GET_ALL_ATTRIBUTES,
    SET_ERROR,
} from "./types";
import {
    MAIN_PROXY_URL
} from "../config/config";
import axios from "axios";

export const getAllAttributes = (dispatch) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${MAIN_PROXY_URL}/attributes`);
    
            const attributes = res.data.data;
    
            return dispatch({
                type: GET_ALL_ATTRIBUTES,
                payload: {
                    attributes
                }
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