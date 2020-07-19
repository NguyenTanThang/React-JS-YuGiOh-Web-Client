import {
    CLEAR_LOADING,
    SET_LOADING
} from "../actions/types";

const initialState = {
    loading: false
}

const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            }
            break;
        case CLEAR_LOADING:
            return {
                ...state,
                loading: false,
            }
            break;
        default:
            return state;
            break;
    }
}

export default loadingReducer;