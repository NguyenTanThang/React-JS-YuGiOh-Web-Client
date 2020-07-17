import {
    GET_ALL_SPELL_CARDS,
    ADD_SPELL_CARD,
    EDIT_SPELL_CARD,
    DELETE_SPELL_CARD,
    CLEAR_LOADING,
    SET_LOADING,
    SET_ERROR,
} from "./types";
import {
    MAIN_PROXY_URL
} from "../config/config";
import axios from "axios";

export const getAllSpellCards = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: SET_LOADING
            })

            const res = await axios.get(`${MAIN_PROXY_URL}/spell-cards`);
    
            const cards = res.data.data;
    
            dispatch({
                type: GET_ALL_SPELL_CARDS,
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

export const addSpellCard = (newCard) => {
    return async (dispatch) => {
        try {
            const {name, categoryID, description, imageURL} = newCard;
            const res = await axios.post(`${MAIN_PROXY_URL}/spell-cards/add`, {name, categoryID, description, imageURL});
    
            const {success} = res.data;

            if (!success) {
                return dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Unable to create spell card`,
                        success
                    }
                })
            } else {
                dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Successfully created a spell card`,
                        success
                    }
                })
            }

            const card = res.data.data;
    
            return dispatch({
                type: ADD_SPELL_CARD,
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

export const editSpellCard = (cardID, updatedCard) => {
    return async (dispatch) => {
        try {
            const {name, categoryID, description, imageURL} = updatedCard;
            const res = await axios.put(`${MAIN_PROXY_URL}/spell-cards/edit/${cardID}`, {name, categoryID, description, imageURL});
    
            const {success} = res.data;

            if (!success) {
                return dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Unable to update the spell card`,
                        success
                    }
                })
            } else {
                dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `The spell card is successfully updated`,
                        success
                    }
                })
            }

            const card = res.data.data;
    
            return dispatch({
                type: EDIT_SPELL_CARD,
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

export const deleteSpellCard = (cardID) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`${MAIN_PROXY_URL}/spell-cards/delete/${cardID}`);
    
            const card = res.data.data;
    
            return dispatch({
                type: DELETE_SPELL_CARD,
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