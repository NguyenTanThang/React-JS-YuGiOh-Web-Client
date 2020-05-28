import {
    GET_ALL_CARDS,
    ADD_CARD,
    DELETE_CARD,
    EDIT_CARD,
    ASSIGN_MONSTER_TO_CATEGORY
} from "./types";
import {
    MAIN_PROXY_URL
} from "../config/config";
import axios from "axios";

export const getAllCards = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${MAIN_PROXY_URL}/cards`);
    
            const cards = res.data.data;
    
            return dispatch({
                type: GET_ALL_CARDS,
                payload: {
                    cards
                }
            })
        } catch (error) {
            
        }
    }
}

export const addCard = (newCard) => {
    return async (dispatch) => {
        try {
            const {name, type, attribute, description, levels, atk, def, imageURL} = newCard;
            const res = await axios.post(`${MAIN_PROXY_URL}/cards/add`, {name, typeID: type, attributeID: attribute, description, levels, atk, def, imageURL});
    
            const card = res.data.data;
    
            return dispatch({
                type: ADD_CARD,
                payload: {
                    card
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const assignMonsterToCategory = (cardID, categoryID) => {
    return async (dispatch) => {
        try {
            let res = await axios.put(`${MAIN_PROXY_URL}/cards/assign-monster-to-category/${cardID}`, {categoryID});
    
            const card = res.data.data;

            res = await axios.get(`${MAIN_PROXY_URL}/cards`);
    
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
            console.log(error)
        }
    }
}