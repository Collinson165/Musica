/* eslint-disable @next/next/no-img-element */
import { useContext } from 'react';
import { AppContext } from './context'

const Card = (props) => {
    const {currentSong, play} = useContext(AppContext)
    return ( 
            <div className="mx-2 md:mx-4 inline-block translate transform ease-in-out hover:scale-110 overflow-hidden" onClick={() => play(props.song)}>
                <img src={props.image} alt="" className="h-20 md:h-28 rounded-3xl"/>
                <p className="text-sm w-20 md:w-auto truncate">{props.title}</p>
            </div>
     );
}
 
export default Card; 