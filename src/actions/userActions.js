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

            await dispatch({
                type: SIGNUP,
                payload: {
                    user
                }
            })
    
            return user;
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

            await dispatch({
                type: LOGIN,
                payload: {
                    user
                }
            })
    
            return user
        } catch (error) {
            
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        try {
            localStorage.removeItem("userID");
    
            return await dispatch({
                type: LOGOUT
            })
        } catch (error) {
            
        }
    }
}