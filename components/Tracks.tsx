/* eslint-disable @next/next/no-img-element */
import { useContext } from 'react';
import { AppContext } from './context'

const Tracks = (props) => {
    const {currentSong, play} = useContext(AppContext)
    return ( 
            <div className="mx-2 md:mx-4 inline-block translate transform ease-in-out hover:scale-110 overflow-hidden" onClick={() => window.open(`${props.song.share.href}`, '_blank')}>
                <img src={props.image} alt="" className="h-20 md:h-28 rounded-3xl"/>
                <p className="text-sm w-20 truncate">{props.title}</p>
            </div>
     );
}
 
export default Tracks; 