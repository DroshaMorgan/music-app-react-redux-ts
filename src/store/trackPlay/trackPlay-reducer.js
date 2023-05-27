import {SET_TRACKS} from "./tracksAPI-actions";

export const tracksAPIReducer = (state=[] , {type, payload}) => {
    switch (type) {
        case SET_TRACKS:
            return payload;
        default:
            return state;
    }
}