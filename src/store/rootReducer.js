import {combineReducers} from "redux";
import {artistAPIReducer} from "./artistAPI/artistAPI-reducer";
import {albumsAPIReducer} from "./albumsAPI/albumsAPI-reducer";
import {tracksAPIReducer} from "./tracksAPI/tracksAPI-reducer";
import {trackPlayReducer} from "./trackPlay/trackPlay-reducer";

export const rootReducer = combineReducers({
    artistAPIReducer,
    albumsAPIReducer,
    tracksAPIReducer,
    trackPlayReducer
})