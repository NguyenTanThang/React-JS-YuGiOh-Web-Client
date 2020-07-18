import {
    GET_ALL_CARDS,
    ADD_CARD,
    DELETE_CARD,
    EDIT_CARD,
    ASSIGN_MONSTER_TO_CATEGORY,
    CLEAR_LOADING,
    SET_LOADING,
    SET_ERROR,
} from "./types";
import {
    MAIN_PROXY_URL
} from "../config/config";
import axios from "axios";

export const getAllCards = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: SET_LOADING
            })
            const res = await axios.get(`${MAIN_PROXY_URL}/cards`);

            const cards = res.data.data;

            dispatch({
                type: GET_ALL_CARDS,
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

export const addCard = (newCard) => {
    return async (dispatch) => {
        try {
            const {
                name,
                type,
                attribute,
                description,
                levels,
                atk,
                def,
                imageURL,
                categoryID
            } = newCard;
            const res = await axios.post(`${MAIN_PROXY_URL}/cards/add`, {
                name,
                typeID: type,
                attributeID: attribute,
                description,
                levels,
                atk,
                def,
                imageURL,
                categoryID
            });

            const {success} = res.data;

            if (!success) {
                return dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Unable to create new card`,
                        success
                    }
                })
            } else {
                dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Successfully created a new card`,
                        success
                    }
                })
            }

            const card = res.data.data;
            
            return dispatch({
                type: ADD_CARD,
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

export const deleteCard = (cardID) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`${MAIN_PROXY_URL}/cards/delete/${cardID}`);

            const card = res.data.data;

            return dispatch({
                type: DELETE_CARD,
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

export const editCard = (cardID, updatedCard) => {
    return async (dispatch) => {
        try {
            const {
                name,
                type,
                attribute,
                description,
                levels,
                atk,
                def,
                imageURL
            } = updatedCard;
            const res = await axios.put(`${MAIN_PROXY_URL}/cards/edit/${cardID}`, {
                name,
                typeID: type,
                attributeID: attribute,
                description,
                levels,
                atk,
                def,
                imageURL
            });

            const {success} = res.data;

            if (!success) {
                return dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Unable to update the card`,
                        success
                    }
                })
            } else {
                dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `The card is successfully updated. Reload to take effect`,
                        success
                    }
                })
            }

            const card = res.data.data;

            return dispatch({
                type: EDIT_CARD,
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

export const assignMonsterToCategory = (cardID, categoryID) => {
    return async (dispatch) => {
        try {
            let res = await axios.put(`${MAIN_PROXY_URL}/cards/assign-monster-to-category/${cardID}`, {
                categoryID
            });

            const card = res.data.data;

            res = await axios.get(`${MAIN_PROXY_URL}/cards`);

            const {success} = res.data;

            if (!success) {
                return dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Unable to assign monster card to category`,
                        success
                    }
                })
            } else {
                dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Successfully assigned monster card to category`,
                        success
                    }
                })
            }

            const cards = res.data.data;

            dispatch({
                type: GET_ALL_CARDS,
                payload: {
                    cards
                }
            })

            return dispatch({
                type: ASSIGN_MONSTER_TO_CATEGORY,
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