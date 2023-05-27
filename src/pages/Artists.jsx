import React, {useEffect} from 'react';
import noImgArtist from "../assets/imgs/no-img-artist.jpg";
import Navbar from "../components/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {loadArtists} from "../store/artistAPI/artistAPI-actions";
import {selectArtists} from "../store/artistAPI/artistAPI-selectors";
import {useNavigate} from "react-router-dom";

const Artists = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(loadArtists());
        }, []);

    const artists = useSelector(selectArtists);

    const transitToAlbums = (artistName) => {
        navigate(`/artists/albums/${artistName}`/*, { replace: true }*/)
    }

    return (
        <div>
            <Navbar/>
            <div className="content">
                <div className="artists-block-all">
                    {artists && artists.map((artist) =>
                        <div onClick={() => transitToAlbums(artist.name)} key={artist.name}
                             className={`artist-block-cart ${artist.name}`} id={artist.name}>
                            {artist.image
                                ? <img className="artist-block-cart__img" width="100" src={artist.image} alt=""/>
                                : <img className="artist-block-cart__img"
                                       width="100" src={noImgArtist} alt=""/>}
                            <div className="artist-block-cart__name">
                                {/*<Link artist={artist} className="artist-block-cart__link" to="/albums">*/}
                                Исполнитель: {artist.name}

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Artists;