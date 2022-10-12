/* eslint-disable @next/next/no-img-element */
import { PlayCircleIcon, ForwardIcon, BackwardIcon, ArrowPathRoundedSquareIcon, ArrowsRightLeftIcon, SpeakerWaveIcon, SpeakerXMarkIcon, PauseIcon } from '@heroicons/react/24/solid'
import { useEffect, useRef, useState } from 'react';


const PlayerControls = (props) => {
  const [currentTime, setCurrentTime ] = useState(0)
  const [ duration, setDuration] = useState(0)

  const progressBar = useRef(null)


  useEffect(() => {
    setDuration(props.audioPlayer.current.duration);
    progressBar.current.max = duration;
  }, [props.audioPlayer?.current?.loadmetadata, props.audioPlayer?.current?.readyState])

  



  // Calculate the duration to timestamp
  const calculateTime = (secs) => {
    const minutes = Math.floor(secs/60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const seconds = Math.floor(secs% 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${returnedMinutes} : ${returnedSeconds}`;
  }

  const changeRange = () => {
    props.audioPlayer.current.currentTime = progressBar.current.value;
    progressBar.current.style.setProperty()
    setCurrentTime(progressBar.current.value);

  }

  

    return (
      <div className='flex w-full'>
        <div>
          <img src={props.nowPlaying} alt="" className={`h-20 rounded-3xl ${props.isPlaying ? 'animate-spin' : ''}`}/>
        </div>
        <div className='w-full'>
          <div className='flex w-full items-center justify-center'>

          

          <ArrowsRightLeftIcon className='h-10 w-6 mx-4 hidden md:block' />

          <BackwardIcon className='h-10 w-6 mx-4 hidden md:block' />

          {props.isPlaying ? <PauseIcon  className='h-10 w-10 mx-4'  onClick={props.handlePlayPause} /> :<PlayCircleIcon className='h-10 w-10 mx-4 animate-pulse' onClick={props.handlePlayPause} />}

          <ForwardIcon className='h-10 w-6 mx-4' />

          <ArrowPathRoundedSquareIcon className='h-10 w-6 mx-4 hidden md:block' />
          </div>
          <div className='flex justify-center pt-2'>
            <span className='text-sm'>{calculateTime(currentTime)}</span><input ref={progressBar} defaultValue="0" onChange={changeRange} type="range" name="" id="" className='w-2/3' /><span className='text-sm'>{(duration && !isNaN(duration)) && calculateTime(duration)}</span>
          </div>
        </div>
        
      </div> 
        
     );
}
 
export default PlayerControls;