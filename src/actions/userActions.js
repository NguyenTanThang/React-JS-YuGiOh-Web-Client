import {
    SIGNUP,
    LOGIN,
    LOGOUT,
    SET_ERROR,
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
    
            const {success} = res.data;

            if (!success) {
                return dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Unable to sign up`,
                        success
                    }
                })
            } else {
                dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Successfully signed up`,
                        success
                    }
                })
            }

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

export const login = (email, password) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${MAIN_PROXY_URL}/users/login`, {
                email, password
            });
    
            const {success} = res.data;

            if (!success) {
                return dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Unable to login`,
                        success
                    }
                })
            } else {
                dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Successfully logged in`,
                        success
                    }
                })
            }

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

export const logout = () => {
    return async (dispatch) => {
        try {
            localStorage.removeItem("userID");
    
            return await dispatch({
                type: LOGOUT
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