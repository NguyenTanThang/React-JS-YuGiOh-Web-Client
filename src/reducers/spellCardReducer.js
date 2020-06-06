import {
    GET_ALL_SPELL_CARDS,
    ADD_SPELL_CARD,
    EDIT_SPELL_CARD,
    DELETE_SPELL_CARD
} from "../actions/types";

const initialState = {
    cards: [],
    card: {}
}

const spellCardReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPELL_CARDS:
            return {
                ...state,
                cards: action.payload.cards
            }
            break;
        case ADD_SPELL_CARD:
            return {
                ...state,
                cards: [...state.cards, action.payload.card]
            }
            break;
        case EDIT_SPELL_CARD:
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
        case DELETE_SPELL_CARD:
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

export default spellCardReducer;