import {
    ADD_DECK,
    DELETE_DECK,
    EDIT_DECK,
    GET_ALL_DECKS,
    GET_DECKS_BY_USER_ID,
    GET_DECK_BY_ID,
    ASSIGN_MONSTER_CARD_TO_DECK,
    ASSIGN_SPELL_CARD_TO_DECK,
    ASSIGN_TRAP_CARD_TO_DECK,
    REMOVE_MONSTER_CARD_OF_DECK
} from "../actions/types";

const initialState = {
    decks: [],
    userDecks: [],
    deck: {}
}

const deckReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DECKS:
            return {
                ...state,
                decks: action.payload.decks
            }
            break;
        case GET_DECKS_BY_USER_ID:
            return {
                ...state,
                userDecks: action.payload.userDecks
            }
            break;
        case GET_DECK_BY_ID:
            return {
                ...state,
                deck: action.payload.deck
            }
            break;
        case ADD_DECK:
            return {
                ...state,
                userDecks: [...state.userDecks, action.payload.deck]
            }
            break;
        case EDIT_DECK:
        case ASSIGN_MONSTER_CARD_TO_DECK:
        case ASSIGN_SPELL_CARD_TO_DECK:
        case ASSIGN_TRAP_CARD_TO_DECK:
        case REMOVE_MONSTER_CARD_OF_DECK:
            return {
                ...state,
                usersDecks: state.userDecks.map(deckItem => {
                    if (deckItem._id == action.payload.deck._id) {
                        return action.payload.deck;
                    }
                    return deckItem;
                }),
                deck: action.payload.deck,
            }
            break;
        case DELETE_DECK:
            return {
                ...state,
                usersDecks: state.usersDecks.filter(deckItem => {
                    return action.payload.deck._id != deckItem._id;
                })
            }
            break;
        default:
            return state;
            break;
    }
}

export default deckReducer;