import {
    GET_ALL_TRAP_CARDS,
    ADD_TRAP_CARD,
    EDIT_TRAP_CARD,
    DELETE_TRAP_CARD
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
        case EDIT_TRAP_CARD:
            return {
                ...state,
                cards: state.cards.map(cardItem => {
                    if (cardItem._id === action.payload.card._id) {
                        return action.payload.card;
                    }
                    return cardItem
                })
            }
            break;
        case DELETE_TRAP_CARD:
            return {
                ...state,
                cards: state.cards.filter(cardItem => {
                    return cardItem._id != action.payload.card._id
                })
            }
            break;
        default:
            return state;
            break;
    }
}

export default trapCardReducer;