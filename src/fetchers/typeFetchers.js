import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";

export const getAllTypes = async () => {
    try {
        const res = await axios.get(`${MAIN_PROXY_URL}/types`);
    
            const types = res.data.data;
    
            return types;
    } catch (error) {
        
    }
}

export const getTypeByID = async (typeID) => {
    try {
        const res = await axios.get(`${MAIN_PROXY_URL}/types/${typeID}`);
    
            const type = res.data.data;
    
            return type;
    } catch (error) {
        
    }
}