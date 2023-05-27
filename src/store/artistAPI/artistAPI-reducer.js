import {CHANGE_API, CHANGE_SEARCH_API} from "./changeAPI-actions";

const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=";

const initialState = {
    apiSearch: API_URL_POPULAR,
    apiAll: API_URL_POPULAR,
}

export const changeAPIReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case CHANGE_API:
            return {
                ...state,
                apiAll: payload,
            };
        case CHANGE_SEARCH_API:
            return {
                ...state,
                apiSearch: payload,
            };
        default:
            return state;
    }
}