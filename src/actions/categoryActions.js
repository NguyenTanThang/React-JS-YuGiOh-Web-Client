import {
    GET_ALL_CATEGORIES
} from "./types";
import {
    MAIN_PROXY_URL
} from "../config/config";
import axios from "axios";

export const getAllCategories = (dispatch) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${MAIN_PROXY_URL}/categories`);
    
            const categories = res.data.data;
    
            return dispatch({
                type: GET_ALL_CATEGORIES,
                payload: {
                    categories
                }
            })
        } catch (error) {
            
        }
    }
}