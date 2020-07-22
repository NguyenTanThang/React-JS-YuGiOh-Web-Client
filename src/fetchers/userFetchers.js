import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";

export const getCurrentUser = async () => {
    try {
        const userID = localStorage.getItem("userID")
        const res = await axios.get(`${MAIN_PROXY_URL}/users/${userID}`);
    
        const user = res.data.data;
    
        return user;
    } catch (error) {
        
    }
}

export const getUserByID = async (userID) => {
    try {
        const res = await axios.get(`${MAIN_PROXY_URL}/users/${userID}`);
    
        const user = res.data.data;
    
        return user;
    } catch (error) {
        
    }
}