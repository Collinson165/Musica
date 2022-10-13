import { createContext, useContext, useState } from "react";
import { songs } from "./songs";


export const AppContext = createContext(null);

const AppContextProvider = (props) => {
    const [currentSong, setCurrentSong] = useState(songs[0]);

    const play = (song) => {
        setCurrentSong(song)
    }
    return (
        <AppContext.Provider value={{currentSong, play}}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
// export function AppWrapper({ children }){
//     const [currentSong, setCurrentSong] = useState(songs[0])


//     return (
//         <AppContext.Provider value={[currentSong, setCurrentSong]}>
//             {children}
//         </AppContext.Provider>
//     );
// }

// export function useAppContext(){
//     return useContext(AppContext);
// }