/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'
import { HeartIcon} from '@heroicons/react/24/outline'
import PlayerControls from './components/PlayerControls'
import Card from './components/Card'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { songs } from './components/songs'
import { topCharts } from './components/top'
import { useAppContext } from './components/context'

export default function Home() {
  
  
  const [data, setData] = useState([]);
  const [newSong, setNew] = useState([]);
  const [song, setSong] = useState(songs);
  const [currentSong, setCurrentSong] = useAppContext();
  
  
  
  
  

  




  // sets the nowPlaying Album art into the Audio Player section
  const Playing = (song) => {
    setCurrentSong(song)
  }


 

  


  

  // API call for Top Charts
  // useEffect(() => {
  //   const options = {
  //     method: 'GET',
  //     url: 'https://spotify23.p.rapidapi.com/playlist_tracks/',
  //     params: {id: '37i9dQZEVXbMDoHDwVN2tF', offset: '0', limit: '3'},
  //     headers: {
  //       'X-RapidAPI-Key': 'ce2d22d55emsh44258fe5c59c9f7p175afajsn645a4e24eb59',
  //       'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
  //     }
  //   };
    
  //   axios.request(options).then(function (response) {
  //     console.log(response.data);
  //     setData(response.data.items)
  //   }).catch(function (error) {
  //     console.error(error);
  //   });
  // }, [])


  // API call for new RELEASE
  // useEffect(() => {
  //   const options = {
  //     method: 'GET',
  //     url: 'https://spotify23.p.rapidapi.com/playlist_tracks/',
  //     params: {id: '593HKP3qHQXS0RLZmeeHly', offset: '0', limit: '20'},
  //     headers: {
  //       'X-RapidAPI-Key': 'ce2d22d55emsh44258fe5c59c9f7p175afajsn645a4e24eb59',
  //       'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
  //     }
  //   };
    
  //   axios.request(options).then(function (response) {
  //     console.log(response.data);
  //     setNew(response.data.items)
  //   }).catch(function (error) {
  //     console.error(error);
  //   });
  // })

  return (
    <div className="bg-[#1d2124]">
      <Head>
        <title>Musica</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.svg" />
      </Head>

      <main className="px-5 md:pl-20 py-5 font-[roboto]">
        <div className='md:flex'>
          <div className='bg-[#609daf] rounded-[38px] h-[500px] md:w-fit md:h-fit'>
            <div className="lg:absolute p-10 md:w-2/3 lg:w-1/3 overflow-hidden">
              <h2>Currated playlist</h2>
              <div className='py-16 py-'>
                <p className='text-5xl'>R & B Hits</p>
                <p>All mine, Lie again, Petty call me everyday, Out of time, No Love, Bad habit and so much more</p>
              </div>
            </div>
            <img src="/images/Hero.png" alt="" className='hidden md:block' />
          </div>
          <div className='p-5 lg:pl-10'>
            <h2 className='text-xl'>Top Charts</h2>

            <div>
              {/* Consume API data here */}
              {data && data.map(song => {
                return (
                  <div key={song.track.id}>
                    <div className='flex w-auto p-2 my-4 rounded-lg bg-[#1a1e1f]'>
                    <img src={song.track.album.images[0].url} alt="" className='h-16 rounded-lg' />
                    <div className='px-5'>
                      <h2 className=''>{song.track.album.name}</h2>
                      <p className='text-sm'>{song.track.album.artists[0].name}</p>
                      <p>{new Date(song.track.duration_ms).toISOString().slice(14, 19)}</p>
                    </div>
                    <div className='flex items-center justify-end pr-5'>
                      <HeartIcon className='h-5 w-5 text-[#facd66] cursor-pointer' />
                    </div>
                  </div>
                  </div>
                )
              })}
              {/* END consume API DATA for Top Charts */}

              {topCharts && topCharts.map(song => {
                return (
                  <div key={song.id}>
                    <div className='flex justify-between w-72 items-center p-2 my-4 rounded-lg bg-[#1a1e1f] '>
                      <div className='flex overflow-hidden'>
                        <img src={song.img} alt="" className='max-h-16 z-50' />
                        <div className='pl-2'>
                          <h2 className='truncate'>{song.title}</h2>
                          <p className='text-sm'>{song.artist}</p>
                          <p>{song.duration}</p>
                        </div>
                      </div>
                      
                      <div className='flex items-center pr-2'>
                        <HeartIcon className='h-5 w-5 text-[#facd66] cursor-pointer' />
                      </div>
                    </div>

                  </div>
                )
              })}

              {/* <div className='flex justify-between w-72 items-center p-2 my-4 rounded-lg bg-[#1a1e1f] '>
                <div className='flex overflow-hidden'>
                  <img src="/images/lead-image.png" alt="" className='max-h-16 z-50' />
                  <div className='pl-2'>
                    <h2 className='truncate'>Golden age of 80s</h2>
                    <p className='text-sm'>Sean Webster</p>
                    <p>2:13:45</p>
                  </div>
                </div>
                
                <div className='flex items-center pr-2'>
                  <HeartIcon className='h-5 w-5 text-[#facd66] cursor-pointer' />
                </div>
              </div>

              <div className='flex justify-between w-72 items-center p-2 my-4 rounded-lg bg-[#1a1e1f] '>
                <div className='flex overflow-hidden'>
                  <img src="/images/lead-image.png" alt="" className='max-h-16 z-50' />
                  <div className='pl-2'>
                    <h2 className='truncate'>Golden age of 80s</h2>
                    <p className='text-sm'>Sean Webster</p>
                    <p>2:13:45</p>
                  </div>
                </div>
                
                <div className='flex items-center pr-2'>
                  <HeartIcon className='h-5 w-5 text-[#facd66] cursor-pointer' />
                </div>
              </div>

              <div className='flex justify-between w-72 items-center p-2 my-4 rounded-lg bg-[#1a1e1f] '>
                <div className='flex overflow-hidden'>
                  <img src="/images/lead-image.png" alt="" className='max-h-16 z-50' />
                  <div className='pl-2'>
                    <h2 className='truncate'>Golden age of 80s</h2>
                    <p className='text-sm'>Sean Webster</p>
                    <p>2:13:45</p>
                  </div>
                </div>
                
                <div className='flex items-center pr-2'>
                  <HeartIcon className='h-5 w-5 text-[#facd66] cursor-pointer' />
                </div>
              </div> */}

              {/* <div className='flex justify-between w-auto p-2 my-4 rounded-lg bg-[#1a1e1f]'>
                <img src="/images/lead-image.png" alt="" className='h-16' />
                <div className='px-5'>
                  <h2 className=''>Golden age of 80s</h2>
                  <p className='text-sm'>Sean Webster</p>
                  <p>2:13:45</p>
                </div>
                <div className='flex items-center pr-2'>
                  <HeartIcon className='h-5 w-5 text-[#facd66]' />
                </div>
              </div>

              <div className='flex justify-between w-auto p-2 my-4 rounded-lg bg-[#1a1e1f]'>
                <img src="/images/lead-image.png" alt="" className='h-16' />
                <div className='px-5'>
                  <h2 className=''>Golden age of 80s</h2>
                  <p className='text-sm'>Sean Webster</p>
                  <p>2:13:45</p>
                </div>
                <div className='flex items-center pr-2'>
                  <HeartIcon className='h-5 w-5 text-[#facd66]' />
                </div>
              </div> */}

            </div>
          </div>
        </div>

        <div className=''>
        <h2 className='pt-10 pb-2 text-xl'>New releases.</h2>
        <div className=''>
          {newSong && newSong.map(song => {
            return (
              <div key={song.track.id}>
                <Card image={song.track.album.images[1].url} title={song.track.album.name} Playing={Playing} />
              </div>
            )
          })}

          {song && song.map(song => {
            return (
              <div key={song.title} className="inline-block">
                <Card song={song} image={song.img} title={song.title} Playing={Playing} />
              </div>
            )
          })}


          <h2 className='pt-10 pb-2 text-xl'>Hot Albums.</h2>
          
          <Card image={"/images/Lead-image.png"} title={'Raves'} Playing={Playing}/>
          <Card image={"/images/song.png"} title={'Raves'} Playing={Playing} />
          <Card image={"/images/song-1.png"} title={'Raves'} Playing={Playing}/>
          <Card image={"/images/song-2.png"} title={'Raves'} Playing={Playing} />
          <Card image={"/images/song-3.png"} title={'Raves'} Playing={Playing}/>
          <Card image={"/images/song-4.png"} title={'Raves'} Playing={Playing} />
        </div>

       
        
        </div>

        <div className='h-28'>

        </div>
        
      </main>
      

      <div className='flex items-center h-32 px-5 md:px-16 py-4 w-full fixed bottom-0 backdrop-blur-sm bg-gray-600/10 z-[499]'>
          <PlayerControls currentSong={currentSong} />
      </div>

      
    </div>
  )
}
