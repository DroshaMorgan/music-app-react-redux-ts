import axios from "axios";
export const SET_ARTISTS = 'SET_ARTISTS';
const API_URL_ARTISTS =
    'https://api.jamendo.com/v3.0/artists/?client_id=e1ba0143&format=jsonpretty&fullcount=true&limit=100&name=&offset=38000';

export const setArtists = (URL) => ({
    type: SET_ARTISTS,
    payload: URL
})

export const loadArtists = (url = API_URL_ARTISTS) => (dispatch) => {
    axios.get(url)
        .then(({data}) => dispatch(setArtists(data)))
}