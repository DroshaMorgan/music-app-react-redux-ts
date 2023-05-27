import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loadArtists} from "../store/artistAPI/artistAPI-actions";
import {loadAlbums} from "../store/albumsAPI/albumsAPI-actions";
import Navbar from "../components/Navbar";
import {selectArtists} from "../store/artistAPI/artistAPI-selectors";
import {selectAlbums} from "../store/albumsAPI/albumsAPI-selectors";

const Album = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const artistNamePar = useParams();
    // console.log(artistName)

    useEffect(
        () => {
            dispatch(loadAlbums(artistNamePar.id));
        }, []);

    const albums = useSelector(selectAlbums);

    const transitToArtists = ()=>{
        // console.log(1)
    }
    const transitToTracks = (artistName, albumName)=>{
        console.log(artistName, albumName)
    }
    return (
        <div>
            <Navbar/>
            <div className="content">
                <div onClick={() => transitToArtists()}>Исполнители</div>
                <div className="albums-block-all">
                    {albums && albums.map((album) =>
                        <div onClick={() => transitToTracks(album.artist_name, album.name)} key={album.name}
                             className={`album-block-cart ${album.artist_name}`}
                             id={album.name}>
                            <img className="album-block-cart__img" width="100" src={album.image} alt=""/>
                            <div className="play-list__title album-block-cart__name">Альбом: {album.name}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Album;