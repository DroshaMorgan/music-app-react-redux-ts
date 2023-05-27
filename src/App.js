import './App.scss';
import './normalize.css';
import {Route, Routes} from "react-router-dom";
import {privateRoutes} from "./router/Router";
import {useState} from "react";
import {AudioContext} from "./context/context";

function App() {
    const [audioPlay, setAudioPlay] = useState(new Audio());
    return (
        <div className="App">
            <AudioContext.Provider value={{
                audioPlay,
                setAudioPlay
            }}>
            <Routes>
                {privateRoutes.map(route =>
                    <Route key={route.element} exact={route.exact}
                           path={route.path}
                           element={route.element}/>
                )}
            </Routes>
            </AudioContext.Provider>
        </div>
    );
}

export default App;