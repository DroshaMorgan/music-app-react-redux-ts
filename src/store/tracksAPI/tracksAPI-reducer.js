import {SET_TRACKS} from "./tracksAPI-actions";

export const tracksAPIReducer = (state= {results:[{}]} , {type, payload}) => {
    switch (type) {
        case SET_TRACKS:
            return payload;
        default:
            return state;
    }
}