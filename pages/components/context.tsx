import { createContext, useContext, useState } from "react";
import { songs } from "./songs";


export const AppContext = createContext(null);

const AppContextProvider = (props) => {
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const [currentSong, setCurrentSong] = useState(songs[currentSongIndex]);
    const [isMute, setIsMute] = useState(false)

    const play = (song) => {
        setCurrentSong(song)
        setCurrentSongIndex(songs.indexOf(song) + 1)
    }

    const playNext =() => {
        if (songs.length - 1 >= currentSongIndex){
            setCurrentSongIndex(prev => prev + 1)
            setCurrentSong(songs[currentSongIndex])
        }else {
            setCurrentSongIndex(0)
        }
        
    }

    const playPrevious =() => {
        if (songs.length - 1 > currentSongIndex){
            setCurrentSongIndex(prev => prev - 1)
            setCurrentSong(songs[currentSongIndex])
        }else if (currentSongIndex === -1) {
            setCurrentSongIndex(0)
        }
        
    }
    return (
        <AppContext.Provider value={{currentSong, play, playNext, playPrevious, isMute, setIsMute}}>
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