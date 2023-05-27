import {PLAY_TRACKS} from "./trackPlay-actions";

export const trackPlayReducer = (state= new Audio() , {type, payload}) => {
    switch (type) {
        case PLAY_TRACKS:
            return payload;
        default:
            return state;
    }
}