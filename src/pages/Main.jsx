import React from 'react';
import {Link} from "react-router-dom";

const Main = () => {
    return (
        <div className="content contentMain">
            <div className="main-bcg">
                <div className="main-bcg__blackout">
                    <div className="main-bcg__info-block">
                        <div className="main-bcg__info-block-top">Откройте для себя новых
                            независимых исполнителей
                        </div>
                        <Link to="/artists" className="main-bcg__info-block-middle">Начать</Link>
                        <div className="main-bcg__info-block-bottom">Используется Jamendo music API</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;