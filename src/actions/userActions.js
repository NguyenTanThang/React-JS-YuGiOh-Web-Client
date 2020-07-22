import {
    SIGNUP,
    LOGIN,
    LOGOUT,
    SET_ERROR,
    CHANGE_PASSWORD,
    CHANGE_PROFILE
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

export const changePassword = (oldPassword, newPassword) => {
    return async (dispatch) => {
        try {
            const userID = localStorage.getItem("userID");
            const res = await axios.put(`${MAIN_PROXY_URL}/users/change-password/${userID}`, {
                newPassword, oldPassword
            });
    
            const {success} = res.data;

            if (!success) {
                return dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Unable to change password`,
                        success
                    }
                })
            } else {
                dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Successfully changed password`,
                        success
                    }
                })
            }

            const user = res.data.data;

            await dispatch({
                type: CHANGE_PASSWORD,
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

export const changeProfile = (username, avatarURL) => {
    return async (dispatch) => {
        try {
            const userID = localStorage.getItem("userID");
            const res = await axios.put(`${MAIN_PROXY_URL}/users/change-profile/${userID}`, {
                username, avatarURL
            });
    
            const {success} = res.data;

            if (!success) {
                return dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Unable to change profile`,
                        success
                    }
                })
            } else {
                dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Successfully changed profile`,
                        success
                    }
                })
            }

            const user = res.data.data;

            await dispatch({
                type: CHANGE_PROFILE,
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