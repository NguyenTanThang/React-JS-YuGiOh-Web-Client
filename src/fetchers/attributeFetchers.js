import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";

export const getAllAttributes = async () => {
    try {
        const res = await axios.get(`${MAIN_PROXY_URL}/attributes`);
    
            const attributes = res.data.data;
    
            return attributes;
    } catch (error) {
        
    }
}

export const getAttributeByID = async (attributeID) => {
    try {
        const res = await axios.get(`${MAIN_PROXY_URL}/attributes/${attributeID}`);
    
            const attribute = res.data.data;
    
            return attribute;
    } catch (error) {
        
    }
}