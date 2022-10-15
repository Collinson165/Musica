/* eslint-disable @next/next/no-img-element */
import { useContext } from 'react';
import { AppContext } from './context'

const Card = (props) => {
    const {currentSong, play} = useContext(AppContext)
    return ( 
            <div className="mx-4 w-fit inline-block translate transform ease-in-out hover:scale-110" onClick={e => props.Playing(props.song)}>
                <img src={props.image} alt="" className="h-28 rounded-3xl"/>
                <p className="text-sm">{props.title}</p>
            </div>
     );
}
 
export default Card; 