import {
    GET_ALL_CARDS,
    ADD_CARD,
    ASSIGN_MONSTER_TO_CATEGORY
} from "../actions/types";

const initialState = {
    cards: [],
    card: {}
}

const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CARDS:
            return {
                ...state,
                cards: action.payload.cards
            }
            break;
        case ADD_CARD:
            return {
                ...state,
                cards: [...state.cards, action.payload.card]
            }
            break;
        case ASSIGN_MONSTER_TO_CATEGORY:
            return {
                ...state,
                cards: state.cards.map(cardItem => {
                    if (cardItem._id == action.payload.card._id) {
                        return action.payload.card;
                    }
                    return cardItem;
                })
            }
            break;
        default:
            return state;
            break;
    }
}

export default cardReducer;