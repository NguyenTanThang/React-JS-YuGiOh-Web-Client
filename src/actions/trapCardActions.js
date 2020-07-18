import {
    GET_ALL_TRAP_CARDS,
    ADD_TRAP_CARD,
    DELETE_TRAP_CARD,
    EDIT_TRAP_CARD,
    CLEAR_LOADING,
    SET_LOADING,
    SET_ERROR,
} from "./types";
import {
    MAIN_PROXY_URL
} from "../config/config";
import axios from "axios";

export const getAllTrapCards = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: SET_LOADING
            })

            const res = await axios.get(`${MAIN_PROXY_URL}/trap-cards`);
    
            const cards = res.data.data;
    
            dispatch({
                type: GET_ALL_TRAP_CARDS,
                payload: {
                    cards
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

export const addTrapCard = (newCard) => {
    return async (dispatch) => {
        try {
            const {name, categoryID, description, imageURL} = newCard;
            const res = await axios.post(`${MAIN_PROXY_URL}/trap-cards/add`, {name, categoryID, description, imageURL});
    
            const {success} = res.data;

            if (!success) {
                return dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Unable to create a trap card`,
                        success
                    }
                })
            } else {
                dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Successfully created a trap card`,
                        success
                    }
                })
            }

            const card = res.data.data;
    
            return dispatch({
                type: ADD_TRAP_CARD,
                payload: {
                    card
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

export const editTrapCard = (cardID, updatedCard) => {
    return async (dispatch) => {
        try {
            const {name, categoryID, description, imageURL} = updatedCard;
            const res = await axios.put(`${MAIN_PROXY_URL}/trap-cards/edit/${cardID}`, {name, categoryID, description, imageURL});
    
            const {success} = res.data;

            if (!success) {
                return dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Unable to update the trap card`,
                        success
                    }
                })
            } else {
                dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Successfully updated the trap card. Reload to take effect`,
                        success,
                        isReload: true
                    }
                })
            }

            const card = res.data.data;
    
            return dispatch({
                type: EDIT_TRAP_CARD,
                payload: {
                    card
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

export const deleteTrapCard = (cardID) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`${MAIN_PROXY_URL}/trap-cards/delete/${cardID}`);
    
            const card = res.data.data;
    
            return dispatch({
                type: DELETE_TRAP_CARD,
                payload: {
                    card
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