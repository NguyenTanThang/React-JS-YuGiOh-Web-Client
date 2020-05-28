import {
    GET_ALL_TRAP_CARDS,
    ADD_TRAP_CARD
} from "../actions/types";

const initialState = {
    cards: [],
    card: {}
}

const trapCardReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_TRAP_CARDS:
            return {
                ...state,
                cards: action.payload.cards
            }
            break;
        case ADD_TRAP_CARD:
            return {
                ...state,
                cards: [...state.cards, action.payload.card]
            }
            break;
        default:
            return state;
            break;
    }
}

export default trapCardReducer;