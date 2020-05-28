export const monsterCardSorter = (list, searchObject) => {
    const {searched_name, typeID, attributeID, min_atk, max_atk, min_def, max_def, min_levels, max_levels, description, categoryID} = searchObject;

    if (description) {
        list = list.filter(listItem => {
            return listItem.description.toLowerCase().includes(description.toLowerCase());
        })
    }

    if (min_levels){
        list = list.filter(listItem => {
            return listItem.levels >= parseInt(min_levels);
        })
    }

    if (max_levels){
        list = list.filter(listItem => {
            return listItem.levels <= parseInt(max_levels);
        })
    }

    if (min_atk){
        list = list.filter(listItem => {
            return listItem.atk >= parseInt(min_atk);
        })
    }

    if (max_atk){
        list = list.filter(listItem => {
            return listItem.atk <= parseInt(max_atk);
        })
    }

    if (min_def){
        list = list.filter(listItem => {
            return listItem.def >= parseInt(min_def);
        })
    }

    if (max_def){
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
    const {searched_name, description, categoryID} = searchObject;

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

    if (aphabeticalOrder === "A - Z"){
        list = list.sort((a, b) => a.name.localeCompare(b.name))
    } 

    if (aphabeticalOrder === "Z - A"){
        list = list.sort((a, b) => b.name.localeCompare(a.name))
    }

    return list;
}