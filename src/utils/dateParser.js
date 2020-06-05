var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

export const dateParser = (dateItem) => {
    const parsedDate = parseInt(dateItem);

    const dateObject = new Date(parsedDate);

    let y = "" + dateObject.getFullYear();
    let m = "" + dateObject.getMonth();
    let d = "" + dateObject.getDate();

    if (m.length === 1){
        m = "0" + m;
    }

    if (d.length === 1){
        d = "0" + d;
    }

    return `${y}-${m}-${d}`;
}

export const dateParserWithMonth = (dateItem) => {
    const parsedDate = parseInt(dateItem);

    const dateObject = new Date(parsedDate);

    let y = "" + dateObject.getFullYear();
    let m = mS[dateObject.getMonth()];
    let d = "" + dateObject.getDate();

    if (d.length === 1){
        d = "0" + d;
    }

    return `${d}-${m}-${y}`;
}

export const dateParserWithMonth_ISODate = (dateItem) => {
    const parsedDate = Date.parse(dateItem);

    const dateObject = new Date(parsedDate);

    let y = "" + dateObject.getFullYear();
    let m = mS[dateObject.getMonth()];
    let d = "" + dateObject.getDate();

    if (d.length === 1){
        d = "0" + d;
    }

    return `${d}-${m}-${y}`;
}
