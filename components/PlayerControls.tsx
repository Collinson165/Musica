/* eslint-disable @next/next/no-img-element */
import { PlayCircleIcon, ForwardIcon, BackwardIcon, ArrowPathRoundedSquareIcon, ArrowsRightLeftIcon, SpeakerWaveIcon, SpeakerXMarkIcon, PauseIcon } from '@heroicons/react/24/solid';

import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from './context';


const PlayerControls = (props) => {
  const [currentTime, setCurrentTime ] = useState(0);
  const [duration, setDuration] = useState(1);
  const [isPlaying , setIsPlaying] = useState(false);
  const [skipRender, setSkipRender] = useState(true);
  const [isRepeat, setIsRepeat] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const audioPlayer = useRef(null);
  const progressBar = useRef(null);
  const volumeBar = useRef(null);
  const animationRef = useRef(null)

  const {currentSong,setCurrentSong, setCurrentSongIndex, play, playNext, playPrevious, playlist, isMute, setIsMute} = useContext(AppContext)


  // useEffect(() => {
  //   const seconds = Math.floor(audioPlayer.current.duration);
  //   if(!isNaN(seconds)){
  //     setDuration(seconds);
  //     const time = duration
  //     progressBar.current.max = seconds;
  //     console.log(calculateTime(time))
  //   }
    
  // }, [duration, audioPlayer?.current?.loadmetadata, audioPlayer?.current?.readyState])

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
    volumeBar.current.style.setProperty('--volumebar', `${volumeBar.current.value/volume * 100}%`)
    setVolume(volumeBar.current.value);

  }

   // Function for playing and pausing. Passed to Playercontrols component
   const handlePlayPause = () => {
    if (isPlaying){
      audioPlayer.current.pause()
      cancelAnimationFrame(animationRef.current)
      setIsPlaying(false)
    } else {
      songStart()
    }
  }

  const songEnd = () => {
    if(!isRepeat){
      audioPlayer.current.pause()
      setIsPlaying(false)
      playNext()
    }else {
      audioPlayer.current.play()
    }
    
  }

  const songStart = () => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
    audioPlayer.current.play().catch((e) => console.log(e))
    animationRef.current = requestAnimationFrame(whilePlaying)
    setIsPlaying(true);
  }

  const randomSong = () => {
    const randomIndex = Math.floor(Math.random() * playlist.length)
    setCurrentSongIndex(randomIndex)
    setCurrentSong(playlist[randomIndex])
    console.log(randomIndex)
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer?.current?.currentTime;
    progressBar.current.style.setProperty('--progressbar', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value);
    animationRef.current = requestAnimationFrame(whilePlaying)
    
  }




    return (
      <div className='flex w-full justify-between'>
          <audio ref={audioPlayer} id='player' onCanPlay={songStart} onEnded={songEnd} >
            <source src={currentSong.src} type="audio/mpeg" />
            Cannot play this audio
          </audio>
        <div className='flex'>
          <img src={currentSong.img} alt="" className={`h-14 md:h-20 rounded-3xl ${isPlaying ? 'animate-spin' : 'animate-pulse'}`}/>
          <div className='pl-2 md:hidden'>
            <p className='font-bold'>{currentSong.title}</p>
            <p className='text-sm'>{currentSong.artists}</p>
          </div>
          
        </div>

        <div className='md:w-full'>
          <div className='flex w-full items-center justify-center'>

          <ArrowsRightLeftIcon className='h-10 w-6 mx-4 hidden md:block' onClick={() => randomSong()}  />

          <BackwardIcon className='h-10 w-6 mx-4 hidden md:block' onClick={playPrevious} />

          {isPlaying ? <PauseIcon  className='h-10 w-10 mx-4'  onClick={handlePlayPause} /> :<PlayCircleIcon className='h-10 w-10 mx-4 text-yellow-500 animate-pulse' onClick={handlePlayPause} />}

          <ForwardIcon className='h-10 w-6 mx-4' onClick={playNext} />

          <ArrowPathRoundedSquareIcon className={`h-10 w-6 mx-4 hidden md:block ${isRepeat ? 'text-yellow-500' : 'text-white'}`} onClick={() => setIsRepeat(prev => !prev)} />

          
          </div>
          <div className='hidden md:flex justify-center items-center pt-2'>
            <span className='text-sm'>{calculateTime(currentTime)}</span><input ref={progressBar} defaultValue="0" onChange={changeRange} type="range" name="" id="" className='bg-yellow-500 appearance-none rounded-lg h-1 cursor-pointer progressbar' /><span className='text-sm'>{(duration && !isNaN(duration)) && calculateTime(duration)}</span>
          </div>
        </div>

        <div className='hidden lg:flex items-center'>
        {isMute ? <SpeakerXMarkIcon onClick={() => setIsMute(false)}  className='h-10 w-6 hidden md:block' /> : <SpeakerWaveIcon onClick={() => setIsMute(true)} className='h-10 w-6 hidden md:block'/>}
        <input ref={volumeBar} className="bg-yellow-500 appearance-none rounded-lg h-1 cursor-pointer voulumebar" type="range" name="volume" id="" onChange={changeVolume} />
        </div>
        
      </div> 
        
     );
}
 
export default PlayerControls;