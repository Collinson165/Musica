import Header from "./Header";
import Navigations from "./Navigations";
import PlayerControls from './PlayerControls';
import { AppContext } from './context';
import { useContext } from "react";
import Head from "next/head";


const Layout = ({children}) => {
    const {currentSong, play} = useContext(AppContext)
    return ( 
        <div className="font-quicksand">
            <Head>
                <title>Musica</title>
                <meta name="description" content="Simple Music App by Collinson Oga -codeBro" />
                <link rel="icon" href="/logo.svg" />
            </Head>
            <Header />
            <div className='hidden md:block fixed px-4'>
                <Navigations />
            </div>
            {children}
            <div className='h-28'>

            </div>
            <div className='flex items-center h-24 md:h-32 px-5 lg:px-16 py-4 w-full fixed bottom-0 backdrop-blur-sm bg-gray-600/10 z-[499]'>
            <PlayerControls currentSong={currentSong} />
            </div>
        </div>
    );
}
 
export default Layout;