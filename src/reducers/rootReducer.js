import cardReducer from "./cardReducer";
import spellCardReducer from "./spellCardReducer";
import trapCardReducer from "./trapCardReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    cardReducer,
    spellCardReducer,
    trapCardReducer
})

export default rootReducer;