import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";

export const getCardByID = async (cardID) => {
    try {
        const res = await axios.get(`${MAIN_PROXY_URL}/cards/${cardID}`);
    
            const card = res.data.data;
    
            return card;
    } catch (error) {
        
    }
}