import {SET_ARTISTS} from "./artistAPI-actions";

// const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=";
//
// const initialState = {
//     apiSearch: API_URL_POPULAR,
//     apiAll: API_URL_POPULAR,
// }

export const artistAPIReducer = (state=[] , {type, payload}) => {
    switch (type) {
        case SET_ARTISTS:
            return payload;
        default:
            return state;
    }
}