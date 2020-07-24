import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";

export const getBlogByID = async (blogID) => {
    try {
        const res = await axios.get(`${MAIN_PROXY_URL}/blogs/${blogID}`);
    
            const blog = res.data.data;
    
            return blog;
    } catch (error) {
        
    }
}