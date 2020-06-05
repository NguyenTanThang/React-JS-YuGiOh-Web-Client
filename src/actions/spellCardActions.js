import {
    GET_ALL_SPELL_CARDS,
    ADD_SPELL_CARD,
    EDIT_SPELL_CARD,
    DELETE_SPELL_CARD,
} from "./types";
import {
    MAIN_PROXY_URL
} from "../config/config";
import axios from "axios";

export const getAllSpellCards = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${MAIN_PROXY_URL}/spell-cards`);
    
            const cards = res.data.data;
    
            return dispatch({
                type: GET_ALL_SPELL_CARDS,
                payload: {
                    cards
                }
            })
        } catch (error) {
            
        }
    }
}

export const addSpellCard = (newCard) => {
    return async (dispatch) => {
        try {
            const {name, categoryID, description, imageURL} = newCard;
            const res = await axios.post(`${MAIN_PROXY_URL}/spell-cards/add`, {name, categoryID, description, imageURL});
    
            const card = res.data.data;
    
            return dispatch({
                type: ADD_SPELL_CARD,
                payload: {
                    card
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const editSpellCard = (cardID, updatedCard) => {
    return async (dispatch) => {
        try {
            const {name, categoryID, description, imageURL} = updatedCard;
            const res = await axios.put(`${MAIN_PROXY_URL}/spell-cards/edit/${cardID}`, {name, categoryID, description, imageURL});
    
            const card = res.data.data;
    
            return dispatch({
                type: EDIT_SPELL_CARD,
                payload: {
                    card
                }
            })
        } catch (error) {
            console.log(error)
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
            console.log(error)
        }
    }
}