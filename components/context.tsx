import { createContext, useContext, useState } from "react";
import { songs } from "./data/songs";


export const AppContext = createContext(null);

const AppContextProvider = (props) => {
    const [playlist, setPlaylist] = useState(songs)
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const [currentSong, setCurrentSong] = useState(playlist[currentSongIndex]);
    const [isMute, setIsMute] = useState(false)
    

    const play = (song) => {
        setCurrentSong(song)
        setCurrentSongIndex(playlist.indexOf(song) + 1)
    }

    const playNext =() => {
        let temp = currentSongIndex;
        if (playlist.length - 1 > currentSongIndex){ 
            temp++
            setCurrentSongIndex(prev => prev + 1)
            setCurrentSong(playlist[temp])
        }else {
            temp = 0
            setCurrentSongIndex(0)
            setCurrentSong(playlist[temp])
        }
        
    }

    const playPrevious =() => {
        let temp = currentSongIndex;
        if (1 <= currentSongIndex){
            temp--
            setCurrentSongIndex(prev => prev - 1)
            setCurrentSong(playlist[temp])
        }else{
            temp = 0
            setCurrentSongIndex(0)
            setCurrentSong(playlist[temp])
        }
        
    }
    return (
        <AppContext.Provider value={{currentSong, setCurrentSong, playlist, setPlaylist, setCurrentSongIndex, play, playNext, playPrevious, isMute, setIsMute}}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
