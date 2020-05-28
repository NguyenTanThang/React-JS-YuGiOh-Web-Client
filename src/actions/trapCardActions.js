import {
    GET_ALL_TRAP_CARDS,
    ADD_TRAP_CARD,
} from "./types";
import {
    MAIN_PROXY_URL
} from "../config/config";
import axios from "axios";

export const getAllTrapCards = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${MAIN_PROXY_URL}/trap-cards`);
    
            const cards = res.data.data;
    
            return dispatch({
                type: GET_ALL_TRAP_CARDS,
                payload: {
                    cards
                }
            })
        } catch (error) {
            
        }
    }
}

export const addTrapCard = (newCard) => {
    return async (dispatch) => {
        try {
            const {name, categoryID, description, imageURL} = newCard;
            const res = await axios.post(`${MAIN_PROXY_URL}/trap-cards/add`, {name, categoryID, description, imageURL});
    
            const card = res.data.data;
    
            return dispatch({
                type: ADD_TRAP_CARD,
                payload: {
                    card
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}