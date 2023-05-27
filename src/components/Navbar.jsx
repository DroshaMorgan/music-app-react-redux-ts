import React from 'react';
import {Link} from "react-router-dom";
import artistSvg from "../assets/imgs/artists.svg";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar__container">
                <div /*className={classes.navbar__top-link}*/>
                    <div className="navbar__title">
                        Music-App
                    </div>
                    <div /*className={classes.navbar__top-link-home-page}*/>
                        <Link className='navbar__links' to="/#">Главная</Link>
                    </div>

                </div>
                <div className='navbar__middle-link'>
                    <div className='navbar__middle-link-title'>
                        Моя коллекция
                    </div>
                    <div className='navbar__link-block'>
                        <img src={artistSvg} alt="" className='cl.navbar_link-img'/>
                        <Link to="/artists" className='navbar__links'>Исполнители</Link>
                    </div>

                </div>

                {/*<div className={cl.navbar__bottom-link}>*/}
                {/*    <div className={cl.navbar__linkBlock}>*/}
                {/*        <img src={settingsSvg} alt="" className={cl.navbar_linkImg}/>*/}
                {/*            <Link to="/#" className={cl.navbar__links}>Настройки</Link>*/}
                {/*    </div>*/}
                {/*</div>*/}

            </div>
        </div>
    );
};

export default Navbar;