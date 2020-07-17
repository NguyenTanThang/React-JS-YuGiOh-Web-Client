import {
    GET_ALL_DECKS,
    GET_DECK_BY_ID,
    ADD_DECK,
    EDIT_DECK,
    DELETE_DECK,
    GET_DECKS_BY_USER_ID,
    ASSIGN_MONSTER_CARD_TO_DECK,
    ASSIGN_SPELL_CARD_TO_DECK,
    ASSIGN_TRAP_CARD_TO_DECK,
    REMOVE_MONSTER_CARD_OF_DECK,
    REMOVE_SPELL_CARD_OF_DECK,
    REMOVE_TRAP_CARD_OF_DECK,
    CLEAR_LOADING,
    SET_LOADING,
    SET_ERROR,
} from "./types";
import {
    MAIN_PROXY_URL
} from "../config/config";
import axios from "axios";

export const getAllDecks = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: SET_LOADING
            })

            const res = await axios.get(`${MAIN_PROXY_URL}/decks`);
    
            const decks = res.data.data;
    
            dispatch({
                type: GET_ALL_DECKS,
                payload: {
                    decks
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

export const getDecksByUserID = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: SET_LOADING
            })

            const userID = localStorage.getItem("userID")
            const res = await axios.get(`${MAIN_PROXY_URL}/decks/user/${userID}`);
    
            const decks = res.data.data;
    
            dispatch({
                type: GET_DECKS_BY_USER_ID,
                payload: {
                    userDecks: decks
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

export const getDeckByID = (deckID) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${MAIN_PROXY_URL}/decks/${deckID}`);
    
            const deck = res.data.data;

            return dispatch({
                type: GET_DECK_BY_ID,
                payload: {
                    deck
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

export const addDeck = (name) => {
    return async (dispatch) => {
        try {
            const userID = localStorage.getItem("userID");
            const res = await axios.post(`${MAIN_PROXY_URL}/decks/add`, {name, userID});
    
            const deck = res.data.data;

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
                type: ADD_DECK,
                payload: {
                    deck
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

export const editDeck = (deckID, name) => {
    return async (dispatch) => {
        try {
            const userID = localStorage.getItem("userID");
            const res = await axios.put(`${MAIN_PROXY_URL}/decks/edit/${deckID}`, {name, userID});
    
            const {success} = res.data;

            if (!success) {
                return dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Unable to update the deck`,
                        success
                    }
                })
            } else {
                dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `The deck is successfully updated`,
                        success
                    }
                })
            }

            const deck = res.data.data;
    
            return dispatch({
                type: EDIT_DECK,
                payload: {
                    deck
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

export const deleteDeck = (deckID) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`${MAIN_PROXY_URL}/decks/delete/${deckID}`);
    
            const deck = res.data.data;
    
            return dispatch({
                type: DELETE_DECK,
                payload: {
                    deck
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

export const assignMonsterCardToDeck = (cardID, deckID) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(`${MAIN_PROXY_URL}/decks/monster-card/${cardID}/deck/${deckID}`);
    
            const {success} = res.data;

            if (!success) {
                return dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Unable to assign monster card to deck`,
                        success
                    }
                })
            } else {
                dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Successfully assigned monster card to deck`,
                        success
                    }
                })
            }

            const deck = res.data.data;
    
            return dispatch({
                type: ASSIGN_MONSTER_CARD_TO_DECK,
                payload: {
                    deck
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

export const removeMonsterCardToDeck = (cardID, deckID) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`${MAIN_PROXY_URL}/decks/monster-card/${cardID}/deck/${deckID}`);
    
            const deck = res.data.data;

            return dispatch({
                type: REMOVE_MONSTER_CARD_OF_DECK,
                payload: {
                    deck
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

export const removeSpellCardToDeck = (cardID, deckID) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`${MAIN_PROXY_URL}/decks/spell-card/${cardID}/deck/${deckID}`);
    
            const deck = res.data.data;

            return dispatch({
                type: REMOVE_SPELL_CARD_OF_DECK,
                payload: {
                    deck
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

export const removeTrapCardToDeck = (cardID, deckID) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`${MAIN_PROXY_URL}/decks/trap-card/${cardID}/deck/${deckID}`);
    
            const deck = res.data.data;

            return dispatch({
                type: REMOVE_TRAP_CARD_OF_DECK,
                payload: {
                    deck
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

export const assignSpellCardToDeck = (cardID, deckID) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(`${MAIN_PROXY_URL}/decks/spell-card/${cardID}/deck/${deckID}`);
    
            const {success} = res.data;

            if (!success) {
                return dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Unable to assign spell card to deck`,
                        success
                    }
                })
            } else {
                dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Successfully assigned spell card to deck`,
                        success
                    }
                })
            }

            const deck = res.data.data;
    
            return dispatch({
                type: ASSIGN_SPELL_CARD_TO_DECK,
                payload: {
                    deck
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

export const assignTrapCardToDeck = (cardID, deckID) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(`${MAIN_PROXY_URL}/decks/trap-card/${cardID}/deck/${deckID}`);
    
            const {success} = res.data;

            if (!success) {
                return dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Unable to assign trap card to deck`,
                        success
                    }
                })
            } else {
                dispatch({
                    type: SET_ERROR,
                    payload: {
                        isVisible: true,
                        message: `Successfully assigned trap card to deck`,
                        success
                    }
                })
            }

            const deck = res.data.data;
    
            return dispatch({
                type: ASSIGN_TRAP_CARD_TO_DECK,
                payload: {
                    deck
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