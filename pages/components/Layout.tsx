import Header from "./Header";
import Navigations from "./Navigations";
import PlayerControls from './PlayerControls';
import { AppContext } from './context';
import { useContext } from "react";


const Layout = ({children}) => {
    const {currentSong, play} = useContext(AppContext)
    return ( 
        <div>
            <Header />
            <div className='hidden md:block fixed px-4'>
                <Navigations />
            </div>
            {children}
            <div className='flex items-center h-32 px-5 md:px-16 py-4 w-full fixed bottom-0 backdrop-blur-sm bg-gray-600/10 z-[499]'>
            <PlayerControls currentSong={currentSong} />
            </div>
        </div>
    );
}
 
export default Layout;