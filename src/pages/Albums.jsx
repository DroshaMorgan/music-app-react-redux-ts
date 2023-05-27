import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loadAlbums} from "../store/albumsAPI/albumsAPI-actions";
import Navbar from "../components/Navbar";
import {selectAlbums} from "../store/albumsAPI/albumsAPI-selectors";

const Albums = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const artistNamePar = useParams();
    console.log(artistNamePar)

    useEffect(
        () => {
            dispatch(loadAlbums(artistNamePar.id));
        }, [artistNamePar.id]);

    const albums = useSelector(selectAlbums);

    const transitToArtists = ()=>{
        navigate(`/artists`/*, {replace: true}*/)
    }
    const transitToTracks = (artistName, albumName)=>{
        navigate(`/artists/albums/${artistName}/${albumName}`/*, {replace: true}*/)
    }
    return (
        <div>
            <Navbar/>
            <div className="content">
                <div className="backButton" onClick={() => transitToArtists()}>
                    {/*<img src={artistSvg} alt=""/>*/}
                    <span>Назад</span>
                </div>
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

export default Albums;