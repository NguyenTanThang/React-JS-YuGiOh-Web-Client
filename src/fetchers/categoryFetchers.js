import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";

export const getAllCategories = async () => {
    try {
        const res = await axios.get(`${MAIN_PROXY_URL}/categories`);

        const categories = res.data.data;

        return categories;
    } catch (error) {

    }
}

export const getSpellCategories = async () => {
    try {
        const res = await axios.get(`${MAIN_PROXY_URL}/spell-categories`);

        const categories = res.data.data;

        return categories;
    } catch (error) {

    }
}

export const getTrapCategories = async () => {
    try {
        const res = await axios.get(`${MAIN_PROXY_URL}/trap-categories`);

        const categories = res.data.data;

        return categories;
    } catch (error) {

    }
}

export const getCategoryByID = async (categoryID) => {
    try {
        const res = await axios.get(`${MAIN_PROXY_URL}/categories/${categoryID}`);

        const category = res.data.data;

        return category;
    } catch (error) {

    }
}

export const getSpellCategoryByID = async (categoryID) => {
    try {
        const res = await axios.get(`${MAIN_PROXY_URL}/spell-categories/${categoryID}`);

        const category = res.data.data;

        return category;
    } catch (error) {

    }
}

export const getTrapCategoryByID = async (categoryID) => {
    try {
        const res = await axios.get(`${MAIN_PROXY_URL}/trap-categories/${categoryID}`);

        const category = res.data.data;

        return category;
    } catch (error) {

    }
}