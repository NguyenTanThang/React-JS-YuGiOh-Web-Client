import cardReducer from "./cardReducer";
import spellCardReducer from "./spellCardReducer";
import trapCardReducer from "./trapCardReducer";
import userReducer from "./userReducer";
import deckReducer from "./deckReducer";
import loadingReducer from "./loadingReducer";
import errorReducer from "./errorReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    cardReducer,
    spellCardReducer,
    trapCardReducer,
    userReducer,
    deckReducer,
    loadingReducer,
    errorReducer
})

export default rootReducer;