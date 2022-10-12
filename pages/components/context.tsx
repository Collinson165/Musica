import { createContext, useContext, useState } from "react";
import { songs } from "./songs";


const AppContext = createContext(null);

export function AppWrapper({ children }){
    const [currentSong, setCurrentSong] = useState(songs[0])


    return (
        <AppContext.Provider value={{currentSong, setCurrentSong}}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext(){
    return useContext(AppContext);
}