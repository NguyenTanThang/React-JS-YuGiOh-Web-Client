import {
    GET_ALL_TYPES,
    SET_ERROR,
} from "./types";
import {
    MAIN_PROXY_URL
} from "../config/config";
import axios from "axios";

export const getAllTypes = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${MAIN_PROXY_URL}/types`);
    
            const types = res.data.data;
    
            return dispatch({
                type: GET_ALL_TYPES,
                payload: {
                    types
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