import axios from "axios";
export const SET_TRACKS = 'SET_TRACKS';
const API_URL_TRACKS = 'https://api.jamendo.com/v3.0/albums/tracks/?client_id=e1ba0143&format=jsonpretty&limit=1&name=';

export const setTracks = (URL) => ({
    type: SET_TRACKS,
    payload: URL
})

export const loadTracks = (album, url = API_URL_TRACKS) => (dispatch) => {
    axios.get(url + album)
        .then(({data}) => dispatch(setTracks(data)))
}