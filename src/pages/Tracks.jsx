import React, {useContext, useEffect, useState} from 'react';
import Navbar from "../components/Navbar";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loadTracks} from "../store/tracksAPI/tracksAPI-actions";
import {selectTracks, selectTracksBcgTitle} from "../store/tracksAPI/tracksAPI-selectors";
import playerRewind from "../assets/imgs/player-rewind.svg";
import playerPlay from "../assets/imgs/player-play.svg";
import playerForward from "../assets/imgs/player-forward.svg";
import {AudioContext} from "../context/context";

const Tracks = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const albumNamePar = useParams();

    function transitToAlbums(artistName) {
        navigate(`/artists/albums/${artistName}`/*, { replace: true }*/)
    }

    // загружает список треков на страницу
    useEffect(
        () => {
            dispatch(loadTracks(albumNamePar.id));
        }, []);

    // const bcgTitleSelect = useSelector(selectTracksBcgTitle);
    // const tracksSelect = useSelector(selectTracks);
    // const [tracks, setTracks] = useState(tracksSelect);
    // const [bcgTitle, setBcgTitle] = useState(bcgTitleSelect);

    const API_URL_TRACKS = 'https://api.jamendo.com/v3.0/albums/tracks/?client_id=e1ba0143&format=jsonpretty&limit=1&name=';

    const [tracks, setTracks] = useState([]);
    const [bcgTitle, setBcgTitle] = useState([]);
    // const [audioPlay, setAudioPlay] = useState(new Audio());
    const {audioPlay, setAudioPlay} = useContext(AudioContext); // альтернатива
    const [currentAudioPlay, setCurrentAudioPlay] = useState({});
    const [currentTimeAudioPlay, setCurrentTimeAudioPlay] = useState('');
    const [currentVolume, setCurrentVolume] = useState(0.2);
    const [isBottom, setIsBottom] = useState(false);

    const album_name = useParams();
    useEffect(() => {
        getMusics(album_name.id, API_URL_TRACKS);
    }, [])

    async function getMusics(album_name, url) {
        const resp = await fetch(url + album_name);
        const respData = await resp.json();

        respData.results[0].tracks.sort((x, y) => x.position - y.position);
        setTracks(respData.results[0].tracks);
        setBcgTitle(respData.results[0]);
    }

    // function transitToArtists() {
    //     navigate(`/artists`, {replace: true});
    //     pauseMusic();
    //
    //     setIsBottom(false);
    //     setAudioPlay(new Audio())
    // }
    //
    // function transitToAlbums(album_name) {
    //     navigate(`/artists/albums/${album_name}`, {replace: true})
    //     pauseMusic();
    //
    //     setIsBottom(false);
    //     setAudioPlay(new Audio())
    // }

    function pauseMusic() {
        audioPlay.pause();
    }

    function playMusic() {
        audioPlay.play();
    }

    useEffect(() => {
        playMusic();
        audioPlay.volume = (currentVolume);
        audioPlay.ontimeupdate = () => {
            setCurrentTimeAudioPlay(Math.trunc(audioPlay.currentTime))
        };
    }, [audioPlay])

    useEffect(() => {
        if (Math.trunc(audioPlay.currentTime) === Math
            .trunc(audioPlay.duration)) {
            nextSong();
        }
    }, [currentTimeAudioPlay])

    function changeCurrentTime(e) {
        audioPlay.currentTime = Math.trunc(e.target.value);
        setCurrentTimeAudioPlay(Math.trunc(e.target.value));
    }

    function changeVolume(e) {
        audioPlay.volume = (e.target.value);
        setCurrentVolume((e.target.value));
    }

    function onSongClick(position) {
        setIsBottom(true);
        pauseMusic();
        const currentSong = tracks.find((el) => el.position === position);
        setCurrentAudioPlay(currentSong)

        const audioList = document.querySelector('.play-list');
        const audioListElements = audioList.querySelectorAll('.play-list__el');
        audioListElements.forEach(el => el.classList.remove('active-song'));

        audioList.children[position - 1].classList.add('active-song');
        setAudioPlay(new Audio(currentSong.audio));
    }

    function nextSong() {
        pauseMusic();
        const audioList = document.querySelector('.play-list');
        const childrenArray = Array.from(audioList.children);
        const currentSongElement = childrenArray.find(el => el.classList.contains('active-song'));
        let positionNumber = currentSongElement.getAttribute('position');
        const audioListElements = audioList.querySelectorAll('.play-list__el');
        audioListElements.forEach(el => el.classList.remove('active-song'));

        if (positionNumber > tracks.length - 1) {
            positionNumber = 1;
        } else {
            positionNumber++;
        }

        const currentSong = tracks
            .find((el) => +el.position === +positionNumber);

        audioList.children[positionNumber - 1].classList.add('active-song');

        setCurrentAudioPlay(currentSong)
        setAudioPlay(new Audio(currentSong.audio));
    }

    function prevSong() {
        pauseMusic();
        const audioList = document.querySelector('.play-list');
        const childrenArray = Array.from(audioList.children);
        const currentSongElement = childrenArray.find(el => el.classList.contains('active-song'));
        let positionNumber = currentSongElement.getAttribute('position');
        const audioListElements = audioList.querySelectorAll('.play-list__el');
        audioListElements.forEach(el => el.classList.remove('active-song'));

        if (+positionNumber === 1) {
            positionNumber = tracks.length;
        } else {
            positionNumber--;
        }

        const currentSong = tracks
            .find((el) => +el.position === +positionNumber);

        audioList.children[positionNumber - 1].classList.add('active-song');

        setCurrentAudioPlay(currentSong);
        setAudioPlay(new Audio(currentSong.audio));
    }

    return (
        <div>
            <Navbar/>
            <div className="content">
                <div
                    className="backButton"
                    style={{zIndex: 10}}
                    onClick={() => {
                        transitToAlbums(albumNamePar.artist);
                    }}
                >
                    <span>Назад</span>
                </div>
                {bcgTitle && <div className="band-title-block">
                    <div style={{
                        backgroundImage: `url(${bcgTitle.image})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        filter: "blur(150px)",
                        height: "100%"
                    }}
                         className="band-title-block__bcg">
                    </div>
                    <div className="band-title-block__el">
                        <div className="band-title-block__el__img">
                            <img className="band-title-block__el__img-el" src={bcgTitle.image} alt=""/>
                        </div>
                        <div className="band-title-block__el__album-title">{bcgTitle.name}</div>
                        <div
                            className="band-title-block__el__album-artist-name">Исполнитель: {bcgTitle.artist_name}</div>
                        <div className="band-title-block__el__album-relise-date">{bcgTitle.releasedate}</div>
                    </div>
                </div>}

                <div className="play-list">
                    {tracks && tracks.map((track) =>
                        <div key={track.name}
                             className="play-list__el"
                             position={track.position}
                             onClick={() => onSongClick(
                                 track.position
                                 // track
                             )}
                        >
                            <div className="play-list__title">
                                {track.position}. {track.name}
                            </div>
                            <div className="play-list__duration">
                                {Math.trunc(track.duration / 60)}:{track.duration % 60}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <footer className="bottom-player">
                <div className="bottom-player__img-title">
                    <div className="play-list__img">
                        <img className="play-list__img-el" src={bcgTitle.image} alt=""/>
                    </div>
                    <div className="play-list__title">{currentAudioPlay.name}</div>
                </div>
                <div className="player">
                    <div className="player__all-controls">
                        <div className="player-controls">
                            <div className="play__range">
                                <input onChange={changeCurrentTime}
                                       className="play__range-el"
                                       type="range"
                                       value={currentTimeAudioPlay}
                                       step="any"
                                       min="0" max={currentAudioPlay.duration}/>
                            </div>
                            <div className="all-button">
                                <div className="play__range-timing">
                                <span className="currentTime">
                                            {Math.trunc(currentTimeAudioPlay / 60)}:{currentTimeAudioPlay % 60}
                                </span>
                                </div>
                                <div className="all-button__elements">
                                    <button onClick={prevSong} className="play-prev player-icon">
                                        <img src={playerRewind} className="player-icon-el" alt="prev"/>
                                    </button>
                                    <button onClick={playMusic} className="play player-icon">
                                        <img src={playerPlay} className="player-icon-el" alt="play"/>
                                    </button>
                                    <button onClick={pauseMusic} className="pause player-icon">
                                        <img src="https://img.icons8.com/ios-glyphs/35/FFFFFF/pause--v1.png"
                                             className="player-icon-el" alt="pause"/>
                                    </button>
                                    <button onClick={nextSong} className="play-next player-icon">
                                        <img src={playerForward} className="player-icon-el" alt="next"/>
                                    </button>
                                </div>
                                <div className="play-list__duration">
                                    <div
                                        className="play-list__duration">
                                        {Math.trunc(currentAudioPlay.duration / 60)}:{currentAudioPlay.duration % 60}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="volume-controls">
                            <input className="volume-controls__range"
                                   type="range" min={0} max={1} step="any"
                                   onChange={changeVolume} value={currentVolume}/>
                            {/*<button className="mute player-icon"></button>*/}
                        </div>
                    </div>
                </div>
            </footer>

            {/*<BottomPlayer bcgTitle={bcgTitle}*/}
            {/*              currentAudioPlay={currentAudioPlay}*/}
            {/*              currentTimeAudioPlay={currentTimeAudioPlay}*/}
            {/*              changeCurrentTime={changeCurrentTime}*/}
            {/*              nextSong={nextSong}*/}
            {/*              prevSong={prevSong}*/}
            {/*              pauseMusic={pauseMusic}*/}
            {/*              playMusic={playMusic}*/}
            {/*              changeVolume={changeVolume}*/}
            {/*              currentVolume={currentVolume}*/}
            {/*/>*/}
        </div>
    );
};

export default Tracks;