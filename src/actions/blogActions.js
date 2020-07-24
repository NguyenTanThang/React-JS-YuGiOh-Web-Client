import {
    GET_BLOGS_BY_USER_ID,
    GET_BLOG_BY_ID,
    GET_ALL_BLOGS,
    ADD_BLOG,
    EDIT_BLOG,
    DELETE_BLOG,
    SET_ERROR,
} from "./types";
import {
    MAIN_PROXY_URL
} from "../config/config";
import axios from "axios";

export const getAllBlogs = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${MAIN_PROXY_URL}/blogs`);
    
            const blogs = res.data.data;
    
            return dispatch({
                type: GET_ALL_BLOGS,
                payload: {
                    blogs
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

export const getBlogsByUserID = () => {
    return async (dispatch) => {
        try {
            const userID = localStorage.getItem("userID")
            const res = await axios.get(`${MAIN_PROXY_URL}/blogs/user/${userID}`);
    
            const blogs = res.data.data;
    
            return dispatch({
                type: GET_BLOGS_BY_USER_ID,
                payload: {
                    userBlogs: blogs
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

export const getBlogByID = (blogID) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${MAIN_PROXY_URL}/blogs/${blogID}`);
    
            const blog = res.data.data;

            return dispatch({
                type: GET_BLOG_BY_ID,
                payload: {
                    blog
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

export const addBlog = (title, thumbImageURL, content) => {
    return async (dispatch) => {
        try {
            const userID = localStorage.getItem("userID");
            const res = await axios.post(`${MAIN_PROXY_URL}/blogs/add`, {title, thumbImageURL, content, userID});
    
            const blog = res.data.data;

            const {success} = res.data;

            if (!success) {
                return dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Unable to update`,
                        success
                    }
                })
            } else {
                dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Successfully updated`,
                        success
                    }
                })
            }
    
            return dispatch({
                type: ADD_BLOG,
                payload: {
                    blog
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

export const editBlog = (blogID, {title, thumbImageURL, content}) => {
    return async (dispatch) => {
        try {
            const userID = localStorage.getItem("userID");
            const res = await axios.put(`${MAIN_PROXY_URL}/blogs/edit/${blogID}`, {title, thumbImageURL, content, userID});
    
            const {success} = res.data;

            if (!success) {
                return dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Unable to update the blog`,
                        success
                    }
                })
            } else {
                dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `The blog is successfully updated`,
                        success,
                        isReload: true
                    }
                })
            }

            const blog = res.data.data;
    
            return dispatch({
                type: EDIT_BLOG,
                payload: {
                    blog
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

export const deleteBlog = (blogID) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`${MAIN_PROXY_URL}/blogs/delete/${blogID}`);
    
            const blog = res.data.data;
    
            return dispatch({
                type: DELETE_BLOG,
                payload: {
                    blog
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

