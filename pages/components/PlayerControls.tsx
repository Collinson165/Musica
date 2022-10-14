/* eslint-disable @next/next/no-img-element */
import { PlayCircleIcon, ForwardIcon, BackwardIcon, ArrowPathRoundedSquareIcon, ArrowsRightLeftIcon, SpeakerWaveIcon, SpeakerXMarkIcon, PauseIcon } from '@heroicons/react/24/solid';

import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from './context';


const PlayerControls = (props) => {
  const [currentTime, setCurrentTime ] = useState(0);
  const [duration, setDuration] = useState(1);
  const [isPlaying , setIsPlaying] = useState(false);
  const [skipRender, setSkipRender] = useState(true);
  const [volume, setVolume] = useState(0.5)
  const audioPlayer = useRef(null);
  const progressBar = useRef(null);
  const volumeBar = useRef(null);

  const {currentSong, play, playNext, playPrevious, isMute, setIsMute} = useContext(AppContext)


  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    if(!isNaN(seconds)){
      setDuration(seconds);
      const time = duration
      progressBar.current.max = seconds;
      console.log(calculateTime(time))
    }
    
  }, [duration, audioPlayer?.current?.loadmetadata, audioPlayer?.current?.readyState])

  useEffect(() => {
    if(isMute){
      audioPlayer.current.muted = true
    } else {
      audioPlayer.current.muted = false
    }
  }, [isMute])



  // useEffect(() => {
  //   const seconds = Math.floor(audioPlayer.current.duration);
  //   if(seconds){
  //     setDuration(seconds);
  //     progressBar.current.max = seconds;
  //     console.log(audioPlayer.current.duration)
  //   } 
  // }, [props.currentSong])


  useEffect(() => {
    let controller = new AbortController();
    if(skipRender){
      setSkipRender(false);
    }

    if(!skipRender){
      audioPlayer.current.pause()
      audioPlayer.current.load()
      audioPlayer.current.play().catch((e) => console.log(e))
      setIsPlaying(true);
    }
    return () => {
      controller?.abort()
    }
    


  }, [currentSong])

  // Calculate the duration to timestamp
  const calculateTime = (secs) => {
    const minutes = Math.floor(secs/60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const seconds = Math.floor(secs% 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${returnedMinutes} : ${returnedSeconds}`;
  }

  
  // changes range of progress bar
  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    progressBar.current.style.setProperty('--progressbar', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value);

  }

  // changes volume
  const changeVolume = () => {
    audioPlayer.current.volume = volumeBar.current.value;
    volumeBar.current.style.setProperty('--volumeBar', `${volumeBar.current.value/volume * 100}%`)
    setVolume(volumeBar.current.value);

  }

   // Function for playing and pausing. Passed to Playercontrols component
   const handlePlayPause = () => {
    if (isPlaying){
      audioPlayer.current.pause()
      setIsPlaying(false)
    } else {
      setIsPlaying(true)
      audioPlayer.current.play()
    }
  }

  const songEnd = () => {
    setIsPlaying(false)
    playNext()
  }




    return (
      <div className='flex w-full'>
          <audio ref={audioPlayer} id='player' onEnded={songEnd} >
            <source src={currentSong.src} type="audio/mpeg" />
            Cannot play this audio
          </audio>
        <div>
          <img src={currentSong.img} alt="" className={`h-20 rounded-3xl ${isPlaying ? 'animate-spin' : ''}`}/>
        </div>

        <div className='w-full'>
          <div className='flex w-full items-center justify-center'>

          <ArrowsRightLeftIcon className='h-10 w-6 mx-4 hidden md:block'  />

          <BackwardIcon className='h-10 w-6 mx-4 hidden md:block' onClick={playPrevious} />

          {isPlaying ? <PauseIcon  className='h-10 w-10 mx-4'  onClick={handlePlayPause} /> :<PlayCircleIcon className='h-10 w-10 mx-4 animate-pulse' onClick={handlePlayPause} />}

          <ForwardIcon className='h-10 w-6 mx-4' onClick={playNext} />

          <ArrowPathRoundedSquareIcon className='h-10 w-6 mx-4 hidden md:block' />

          
          </div>
          <div className='flex justify-center pt-2'>
            <span className='text-sm'>{calculateTime(currentTime)}</span><input ref={progressBar} defaultValue="0" onChange={changeRange} type="range" name="" id="" className=' progressbar' /><span className='text-sm'>{(duration && !isNaN(duration)) && calculateTime(duration)}</span>
          </div>
        </div>

        <div className='hidden md:flex items-center'>
        {isMute ? <SpeakerXMarkIcon onClick={() => setIsMute(false)}  className='h-10 w-6 mx-4 hidden md:block' /> : <SpeakerWaveIcon onClick={() => setIsMute(true)} className='h-10 w-6 mx-4 hidden md:block'/>}
        <input ref={volumeBar} className="voulumebar" type="range" name="volume" id="" onChange={changeVolume} />
        </div>
        
      </div> 
        
     );
}
 
export default PlayerControls;