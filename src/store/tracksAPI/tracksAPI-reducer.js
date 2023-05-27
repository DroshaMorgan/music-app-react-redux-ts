import {SET_ALBUM} from "./albumsAPI-actions";

// const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=";
//
// const initialState = {
//     apiSearch: API_URL_POPULAR,
//     apiAll: API_URL_POPULAR,
// }

export const albumsAPIReducer = (state=[] , {type, payload}) => {
    switch (type) {
        case SET_ALBUM:
            return payload;
        default:
            return state;
    }
}