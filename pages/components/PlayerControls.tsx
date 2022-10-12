/* eslint-disable @next/next/no-img-element */
import { PlayCircleIcon, ForwardIcon, BackwardIcon, ArrowPathRoundedSquareIcon, ArrowsRightLeftIcon, SpeakerWaveIcon, SpeakerXMarkIcon, PauseIcon } from '@heroicons/react/24/solid'
import { useEffect, useRef, useState } from 'react';


const PlayerControls = (props) => {
  const [currentTime, setCurrentTime ] = useState(0)
  const [ duration, setDuration] = useState(0)
  const [nowPlaying, setNowPlaying] = useState('/images/albums/bandana.jpg');
  const [isPlaying , setIsPlaying] = useState(false);
  const [nowPlayingSong, setNowPlayingSong] = useState('/songs/bandana.mp3');

  const audioPlayer = useRef(null);
  const progressBar = useRef(null)


  useEffect(() => {
    
    setDuration(audioPlayer.current.duration);
    progressBar.current.max = duration;
  }, [audioPlayer?.current?.loadmetadata, audioPlayer?.current?.readyState])


  useEffect(() => {
    
    
  }, [audioPlayer?.current])

  



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
    progressBar.current.style.setProperty()
    setCurrentTime(progressBar.current.value);

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

  // Updates Song
  const updateSong = () => {
    
    audioPlayer.current.pause()
    audioPlayer.current.load()
    audioPlayer.current.play()
    setIsPlaying(true)
    

  }

  

    return (
      <div className='flex w-full'>
          <audio controls ref={audioPlayer} id='player' onEnded={() => setIsPlaying(false)} onChange={updateSong} >
            <source src={props.currentSong.src} type="audio/mpeg" />
          </audio>
        <div>
          <img src={props.currentSong.img} alt="" className={`h-20 rounded-3xl ${isPlaying ? 'animate-spin' : ''}`}/>
        </div>
        <div className='w-full'>
          <div className='flex w-full items-center justify-center'>

          

          <ArrowsRightLeftIcon className='h-10 w-6 mx-4 hidden md:block' />

          <BackwardIcon className='h-10 w-6 mx-4 hidden md:block' />

          {isPlaying ? <PauseIcon  className='h-10 w-10 mx-4'  onClick={handlePlayPause} /> :<PlayCircleIcon className='h-10 w-10 mx-4 animate-pulse' onClick={handlePlayPause} />}

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