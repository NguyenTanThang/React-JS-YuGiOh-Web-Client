import {
    SIGNUP,
    LOGIN,
    LOGOUT
} from "./types";
import {
    MAIN_PROXY_URL
} from "../config/config";
import axios from "axios";

export const signup = (username, email, password) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${MAIN_PROXY_URL}/users/signup`, {
                username, email, password
            });
    
            const user = res.data.data;
            localStorage.setItem("userID", user._id)
    
            return dispatch({
                type: SIGNUP,
                payload: {
                    user
                }
            })
        } catch (error) {
            
        }
    }
}

export const login = (email, password) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${MAIN_PROXY_URL}/users/login`, {
                email, password
            });
    
            const user = res.data.data;
            localStorage.setItem("userID", user._id)
    
            return dispatch({
                type: LOGIN,
                payload: {
                    user
                }
            })
        } catch (error) {
            
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        try {
            localStorage.removeItem("userID");
    
            return dispatch({
                type: LOGOUT
            })
        } catch (error) {
            
        }
    }
}