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
    REMOVE_TRAP_CARD_OF_DECK
} from "./types";
import {
    MAIN_PROXY_URL
} from "../config/config";
import axios from "axios";

export const getAllDecks = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${MAIN_PROXY_URL}/decks`);
    
            const decks = res.data.data;
    
            return dispatch({
                type: GET_ALL_DECKS,
                payload: {
                    decks
                }
            })
        } catch (error) {

        }
    }
}

export const getDecksByUserID = () => {
    return async (dispatch) => {
        try {
            const userID = localStorage.getItem("userID")
            const res = await axios.get(`${MAIN_PROXY_URL}/decks/user/${userID}`);
    
            const decks = res.data.data;
    
            return dispatch({
                type: GET_DECKS_BY_USER_ID,
                payload: {
                    userDecks: decks
                }
            })
        } catch (error) {

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

        }
    }
}

export const addDeck = (name) => {
    return async (dispatch) => {
        try {
            const userID = localStorage.getItem("userID");
            const res = await axios.post(`${MAIN_PROXY_URL}/decks/add`, {name, userID});
    
            const deck = res.data.data;
    
            return dispatch({
                type: ADD_DECK,
                payload: {
                    deck
                }
            })
        } catch (error) {

        }
    }
}

export const editDeck = (deckID, name) => {
    return async (dispatch) => {
        try {
            const userID = localStorage.getItem("userID");
            const res = await axios.put(`${MAIN_PROXY_URL}/decks/edit/${deckID}`, {name, userID});
    
            const deck = res.data.data;
    
            return dispatch({
                type: EDIT_DECK,
                payload: {
                    deck
                }
            })
        } catch (error) {

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

        }
    }
}

export const assignMonsterCardToDeck = (cardID, deckID) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(`${MAIN_PROXY_URL}/decks/monster-card/${cardID}/deck/${deckID}`);
    
            const deck = res.data.data;
    
            return dispatch({
                type: ASSIGN_MONSTER_CARD_TO_DECK,
                payload: {
                    deck
                }
            })
        } catch (error) {

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

        }
    }
}

export const assignSpellCardToDeck = (cardID, deckID) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(`${MAIN_PROXY_URL}/decks/spell-card/${cardID}/deck/${deckID}`);
    
            const deck = res.data.data;
    
            return dispatch({
                type: ASSIGN_SPELL_CARD_TO_DECK,
                payload: {
                    deck
                }
            })
        } catch (error) {

        }
    }
}

export const assignTrapCardToDeck = (cardID, deckID) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(`${MAIN_PROXY_URL}/decks/trap-card/${cardID}/deck/${deckID}`);
    
            const deck = res.data.data;
    
            return dispatch({
                type: ASSIGN_TRAP_CARD_TO_DECK,
                payload: {
                    deck
                }
            })
        } catch (error) {

        }
    }
}