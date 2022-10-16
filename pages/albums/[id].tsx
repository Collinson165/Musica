/* eslint-disable @next/next/no-img-element */
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import path from "path";
import fs from "fs/promises";
import { HeartIcon as HeartIconSolid, MusicalNoteIcon, PlayCircleIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { AppContext } from '../../components/context'
import { useContext } from "react";

interface playlist{
    title:string, 
    artist:string, 
    src:string, 
    img:string
}

interface collectionsInterface{
    id: string,
    img: string,
    title: string,
    artist: string,
    duration: string,
    plays: number,
    playlist: any
}

async function getData(){
    const filePath = path.join(process.cwd(), 'components','data', 'collections.json');
    const fileData = await fs.readFile(filePath);
    const data = JSON.parse(fileData.toString());
    return data;
}

export const getStaticProps:GetStaticProps = async (context) => {
    const albumID = context.params?.id;
    const data = await getData();
    const foundAlbum = data.collections.find((album: collectionsInterface) => albumID === album.id);
    if(!foundAlbum){
        return {
            props: {hasError: true},
        }
    }

    return {
        props: {
            specificAlbumData: foundAlbum
        }
    }
}


export const getStaticPaths:GetStaticPaths = async () => {
    const data = await getData();
    const pathsWithParams = data.collections.map((collection:collectionsInterface) => ({params: {id: collection.id}}))
    return {
        paths: pathsWithParams,
        fallback: true
    }
}

function Albums(props: {
    specificAlbumData:collectionsInterface,
    hasError:boolean
}){
    const {play} = useContext(AppContext)
    const router = useRouter();
    if(props.hasError){
        return <h1 className="flex justify-center">Error! Try Another Parameter</h1>
    }

    if(router.isFallback){
        return <h1 className="flex justify-center">Loading...</h1>
    }

    

    return (
        <div className={"px-5 md:pl-20 py-5"}>
            <div className="flex flex-col md:flex-row">
                <img src={props.specificAlbumData.img} alt="" className="md:h-56" />
                <div className="max-w-lg mx-5 flex flex-col items-start justify-end">
                    <h2 className="text-3xl font-bold pt-2">{props.specificAlbumData.title}</h2>
                    <div className="pb-5 pt-2">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, veniam maxime et repellat numquam quia eos. Enim ab nihil nulla similique quibusdam expedita quasi facere optio, sequi error, magnam quos dolor corrupti.</p>
                    <span className="text-xs px-1">{`${props.specificAlbumData.playlist.length} Songs`}</span>
                    <span className="text-xs px-1">{props.specificAlbumData.duration}</span>
                    </div>
                    
                    <div>
                        <button className="rounded-full py-1 px-3 bg-[#343339] mx-1">
                            <span className="flex items-center">
                            <PlayCircleIcon className="h-5 text-yellow-500"  />
                            Play All

                            </span>
                            
                        </button>
                        <button className="rounded-full py-1 px-3 bg-[#343339] mx-1">
                            <span className="flex items-center">
                            <MusicalNoteIcon className="h-5 text-yellow-500" />
                            Add to Collection

                            </span>
                            
                        </button>
                        <button  className="rounded-full p-2 bg-[#343339] mx-1">
                            <HeartIconSolid className="h-4 text-red-600" />
                        </button>
                </div>
                </div>
            </div>
            
            <div className="py-10">
                {props.specificAlbumData && props.specificAlbumData.playlist.map(song => {
                    return(
                        <div key={song.src}>
                            <div className="flex justify-start md:justify-between bg-[#25292c] p-2 my-2 rounded-xl">
                                <div className="flex items-center md:w-1/2">
                                    <img src={song.img} alt="" className="h-12 rounded-lg cursor-pointer"  onClick={() => play(song)}/>
                                    <HeartIcon className="hidden md:block h-6 px-2" />
                                </div>
                                <div className="px-2 md:flex justify-between md:w-1/2">
                                    <p className="font-bold md:font-normal">{song.title}</p>
                                    <p className="text-sm md:text-md">{song.artists}</p>
                                </div>
                                
                                
                            </div>
                        
                        </div>

                    )
                    
                })}
            </div>

        </div>
    )
}
    

 
export default Albums;