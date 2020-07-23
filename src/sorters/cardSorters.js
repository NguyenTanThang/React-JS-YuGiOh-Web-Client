import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";

export const monsterCardSorter = (list, searchObject) => {
    const {
        searched_name,
        typeID,
        attributeID,
        min_atk,
        max_atk,
        min_def,
        max_def,
        min_levels,
        max_levels,
        min_link,
        max_link,
        min_pendulum,
        max_pendulum,
        pendulumDescription,
        description,
        categoryID
    } = searchObject;

    if (pendulumDescription) {
        list = list.filter(listItem => {
            return listItem.categoryIDs.includes("5eccabefb428ef32144ccd54");
        })
        list = list.filter(listItem => {
            return listItem.pendulumDescription.toLowerCase().includes(pendulumDescription.toLowerCase());
        })
    }

    if (min_pendulum) {
        list = list.filter(listItem => {
            return listItem.categoryIDs.includes("5eccabefb428ef32144ccd54");
        })
        list = list.filter(listItem => {
            return listItem.pendulumScale >= parseInt(min_pendulum);
        })
    }

    if (max_pendulum) {
        list = list.filter(listItem => {
            return listItem.categoryIDs.includes("5eccabefb428ef32144ccd54");
        })
        list = list.filter(listItem => {
            return listItem.pendulumScale <= parseInt(max_pendulum);
        })
    }

    if (min_link) {
        list = list.filter(listItem => {
            return listItem.categoryIDs.includes("5eccabefb428ef32144ccd55");
        })
        list = list.filter(listItem => {
            return listItem.levels >= parseInt(min_link);
        })
    }

    if (max_link) {
        list = list.filter(listItem => {
            return listItem.categoryIDs.includes("5eccabefb428ef32144ccd55");
        })
        list = list.filter(listItem => {
            return listItem.levels <= parseInt(max_link);
        })
    }

    if (description) {
        list = list.filter(listItem => {
            return listItem.description.toLowerCase().includes(description.toLowerCase());
        })
    }

    if (min_levels) {
        list = list.filter(listItem => {
            return listItem.levels >= parseInt(min_levels);
        })
    }

    if (max_levels) {
        list = list.filter(listItem => {
            return listItem.levels <= parseInt(max_levels);
        })
    }

    if (min_atk) {
        list = list.filter(listItem => {
            return listItem.atk >= parseInt(min_atk);
        })
    }

    if (max_atk) {
        list = list.filter(listItem => {
            return listItem.atk <= parseInt(max_atk);
        })
    }

    if (min_def) {
        list = list.filter(listItem => {
            return listItem.def >= parseInt(min_def);
        })
    }

    if (max_def) {
        list = list.filter(listItem => {
            return listItem.def <= parseInt(max_def);
        })
    }

    if (searched_name) {
        list = list.filter(listItem => {
            return listItem.name.toLowerCase().includes(searched_name.toLowerCase());
        })
    }

    if (categoryID) {
        list = list.filter(listItem => {
            return listItem.categoryIDs.includes(categoryID);
        })
    }

    if (typeID) {
        list = list.filter(listItem => {
            return listItem.typeID === typeID;
        })
    }

    if (attributeID) {
        list = list.filter(listItem => {
            return listItem.attributeID === attributeID;
        })
    }

    return list;
}

export const spellCardSorter = (list, searchObject) => {
    const {
        searched_name,
        description,
        categoryID
    } = searchObject;

    if (description) {
        list = list.filter(listItem => {
            return listItem.description.toLowerCase().includes(description.toLowerCase());
        })
    }

    if (searched_name) {
        list = list.filter(listItem => {
            return listItem.name.toLowerCase().includes(searched_name.toLowerCase());
        })
    }

    if (categoryID) {
        list = list.filter(listItem => {
            return listItem.categoryID === categoryID;
        })
    }

    return list;
}

export const alphabeticalOrderSorter = (list, aphabeticalOrder) => {
    if (!aphabeticalOrder) {
        return list;
    }

    if (aphabeticalOrder === "A - Z") {
        list = list.sort((a, b) => a.name.localeCompare(b.name))
    }

    if (aphabeticalOrder === "Z - A") {
        list = list.sort((a, b) => b.name.localeCompare(a.name))
    }

    if (aphabeticalOrder === "Level - (High to Low)") {
        list = list.sort((a, b) => b.levels - a.levels)
    }

    if (aphabeticalOrder === "Level - (Low to High)") {
        list = list.sort((a, b) => a.levels - b.levels)
    }

    if (aphabeticalOrder === "Link - (High to Low)") {
        list = list.filter(listItem => {
            return listItem.categoryIDs.includes("5eccabefb428ef32144ccd55");
        })
        list = list.sort((a, b) => b.levels - a.levels)
    }

    if (aphabeticalOrder === "Link - (Low to High)") {
        list = list.filter(listItem => {
            return listItem.categoryIDs.includes("5eccabefb428ef32144ccd55");
        })
        list = list.sort((a, b) => a.levels - b.levels)
    }

    if (aphabeticalOrder === "Pendulum Scale - (High to Low)") {
        list = list.filter(listItem => {
            return listItem.categoryIDs.includes("5eccabefb428ef32144ccd54");
        })
        list = list.sort((a, b) => b.pendulumScale - a.pendulumScale)
    }

    if (aphabeticalOrder === "Pendulum Scale - (Low to High)") {
        list = list.filter(listItem => {
            return listItem.categoryIDs.includes("5eccabefb428ef32144ccd54");
        })
        list = list.sort((a, b) => a.pendulumScale - b.pendulumScale)
    }

    if (aphabeticalOrder === "ATK - (High to Low)") {
        list = list.sort((a, b) => {
            if (a.atk === b.atk){
                return b.def - a.def
            }
            return b.atk - a.atk
        })
    }

    if (aphabeticalOrder === "ATK - (Low to High)") {
        list = list.sort((a, b) => {
            if (a.atk === b.atk){
                return a.def - b.def
            }
            return a.atk - b.atk
        })
    }

    if (aphabeticalOrder === "DEF - (High to Low)") {
        list = list.sort((a, b) => {
            if (a.def === b.def){
                return b.atk - a.atk
            }
            return b.def - a.def
        })
    }

    if (aphabeticalOrder === "DEF - (Low to High)") {
        list = list.sort((a, b) => {
            if (a.def === b.def){
                return a.atk - b.atk
            }
            return a.def - b.def
        })
    }

    if (aphabeticalOrder === "By Attribute") {
        list = list.sort((a, b) => a.name.localeCompare(b.name))
        list = sortByAttribute(list)
    }

    if (aphabeticalOrder === "By Type") {
        list = list.sort((a, b) => a.name.localeCompare(b.name))
        list = sortByType(list)
    }

    if (aphabeticalOrder === "By Category"){ 
        list = list.sort((a, b) => a.name.localeCompare(b.name))
        list = sortByCategory(list)
    }

    if (aphabeticalOrder === "By Category (Trap)"){
        list = list.sort((a, b) => a.name.localeCompare(b.name))
        list = sortByTrapCategory(list)
    }

    if (aphabeticalOrder === "By Category (Spell)"){
        list = list.sort((a, b) => a.name.localeCompare(b.name))
        list = sortBySpellCategory(list)
    }

    return list;
}

const sortByAttribute = (list) => {
    let returnedList = [];

    var attributes = JSON.parse(localStorage.getItem("attributeList"));

    for (let index = 0; index < attributes.length; index++) {
        const attribute = attributes[index];
        for (let j = 0; j < list.length; j++) {
            const card = list[j];
            if (card.attributeID === attribute._id) {
                returnedList.push(card)
            }
        }
    }

    return returnedList;
}

const sortByType = (list) => {
    let returnedList = [];

    var types = JSON.parse(localStorage.getItem("typeList"));

    for (let index = 0; index < types.length; index++) {
        const type = types[index];
        for (let j = 0; j < list.length; j++) {
            const card = list[j];
            if (card.typeID === type._id) {
                returnedList.push(card)
            }
        }
    }

    return returnedList;
}

const sortByCategory = (list) => {
    let returnedList = [];

    var categories = JSON.parse(localStorage.getItem("categoryList"));

    for (let index = 0; index < categories.length; index++) {
        const category = categories[index];
        for (let j = 0; j < list.length; j++) {
            const card = list[j];
            if (card.categoryIDs.includes(category._id)) {
                if (!returnedList.includes(card)) {
                    returnedList.push(card)
                }
            }
        }
    }

    return returnedList;
}

const sortByTrapCategory = (list) => {
    let returnedList = [];

    var categories = JSON.parse(localStorage.getItem("trapCategories"));

    for (let index = 0; index < categories.length; index++) {
        const category = categories[index];
        for (let j = 0; j < list.length; j++) {
            const card = list[j];
            if (card.categoryID === category._id) {
                if (!returnedList.includes(card)) {
                    returnedList.push(card)
                }
            }
        }
    }

    return returnedList;
}

const sortBySpellCategory = (list) => {
    let returnedList = [];

    var categories = JSON.parse(localStorage.getItem("spellCategories"));

    for (let index = 0; index < categories.length; index++) {
        const category = categories[index];
        for (let j = 0; j < list.length; j++) {
            const card = list[j];
            if (card.categoryID === category._id) {
                if (!returnedList.includes(card)) {
                    returnedList.push(card)
                }
            }
        }
    }

    return returnedList;
}