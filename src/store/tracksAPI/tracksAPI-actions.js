import axios from "axios";
export const SET_ALBUM = 'SET_ALBUM';
const API_URL_ALBUM = 'https://api.jamendo.com/v3.0/albums/?client_id=e1ba0143&format=jsonpretty&artist_name=';

export const setAlbum = (URL) => ({
    type: SET_ALBUM,
    payload: URL
})

export const loadAlbums = (artist, url = API_URL_ALBUM) => (dispatch) => {
    axios.get(url + artist)
        .then(({data}) => dispatch(setAlbum(data)))
}